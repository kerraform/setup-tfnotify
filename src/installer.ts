import * as github from '@actions/github'
import * as core from '@actions/core'
import {components} from '@octokit/openapi-types'
import {inspect, promisify} from 'util'
import * as tc from '@actions/tool-cache'
import {v4 as uuidv4} from 'uuid'
import got from 'got'
import * as stream from 'stream'
import os from 'os'
import * as fs from 'fs'
const pipeline = promisify(stream.pipeline)

const cacheKey = 'tfnotify'

type Asset = components['schemas']['release-asset']
type Assets = Asset[]

export interface Inputs {
  tag: string
  token: string
  latest: boolean
}

export class Installer {
  private owner = 'mercari'
  private repo = 'tfnotify'

  constructor(private cfg: Inputs) {}

  private isTargetAsset(asset: Asset): boolean {
    const {name} = asset
    const osPlatform = os.platform()
    const osArch = os.arch() === 'x64' ? 'amd64' : os.arch()
    core.debug(
      `checking if ${name} matches platform ${osPlatform} and architecture ${osArch}`
    )
    return name.includes(osPlatform) && name.includes(osArch)
  }

  async getTfnotify(): Promise<string> {
    // check cache
    const toolPath = tc.find(cacheKey, this.cfg.tag)
    // If not found in cache, download
    if (toolPath) {
      core.info(`Found in cache @ ${toolPath}`)
      return toolPath
    }
    core.info(`Attempting to download ${this.cfg.tag}...`)

    const client = github.getOctokit(this.cfg.token)
    let assets: Assets
    if (this.cfg.latest) {
      const resp = await client.repos.getLatestRelease({
        owner: this.owner,
        repo: this.repo
      })

      assets = resp.data.assets
      this.cfg.tag = resp.data.tag_name
    } else {
      const resp = await client.repos.getReleaseByTag({
        owner: this.owner,
        repo: this.repo,
        tag: this.cfg.tag
      })
      assets = resp.data.assets
    }

    const asset = assets.find((a: Asset) => this.isTargetAsset(a))
    if (!asset) {
      core.debug(`Cound not find asset ${inspect(this.cfg)}`)
      core.debug(`Assets count:${assets.length} got from release`)
      core.setOutput('matched', false)
      throw new Error('Cound not find asset')
    }

    core.setOutput('asset-id', asset.id)
    core.setOutput('asset-name', asset.name)
    core.setOutput(`tag`, this.cfg.tag)

    const dest = `/tmp/${uuidv4()}`

    await pipeline(
      got.stream(asset.url, {
        method: 'GET',
        headers: {
          'User-Agent': 'GitHub Actions',
          Accept: 'application/octet-stream',
          Authorization: `token ${this.cfg.token}`
        }
      }),
      fs.createWriteStream(dest)
    )

    core.debug(`Download asset: ${asset.name}`)

    const assetExtractedFolder = await tc.extractTar(dest)
    core.debug(`Cached @ ${assetExtractedFolder} for tag ${this.cfg.tag}`)
    const installedDir = await tc.cacheDir(
      assetExtractedFolder,
      cacheKey,
      this.cfg.tag
    )
    core.addPath(installedDir)
    return installedDir
  }
}

export default {
  Installer
}
