import * as core from '@actions/core'
import {Inputs, Installer} from './installer'
import {inspect} from 'util'

async function run(): Promise<void> {
  try {
    const inputs: Inputs = {
      tag: core.getInput('tag'),
      token: core.getInput('token', {required: true}),
      latest: core.getInput('tag') === 'latest'
    }

    core.info(`Setup kerraform/tfnotify ${inputs.tag} version`)

    const installer = new Installer(inputs)
    const installedDir = await installer.getTfnotify()
    core.info(`Installed kerraform/tfnotify in ${installedDir}`)

    core.debug(`Inputs: ${inspect(inputs)}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
