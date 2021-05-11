import * as core from '@actions/core'
import {Inputs} from './download'
import {inspect} from 'util'

async function run(): Promise<void> {
  try {
    const inputs: Inputs = {
      tag: 'hoho'
    }

    core.debug(`Inputs: ${inspect(inputs)}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
