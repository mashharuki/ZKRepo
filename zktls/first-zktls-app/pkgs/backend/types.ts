import { BaseContract } from 'ethers'
import { Semaphore } from './src/types'

export interface ReturnObjectSemaphoreDeployTask {
  semaphore: Semaphore
  pairingAddress: BaseContract['address']
  semaphoreVerifierAddress: BaseContract['address']
  poseidonAddress: BaseContract['address']
  incrementalBinaryTreeAddress: BaseContract['address']
}
