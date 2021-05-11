import * as github from '@actions/github'
import * as core from '@actions/core'
import {PullsGetResponseData} from '@octokit/types'
import Retry from './retry'
import {inspect} from 'util'

export interface Inputs {
  tag: string
}
