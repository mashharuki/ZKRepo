import { task } from 'hardhat/config'
import { getContractAddress } from './utils'
import { Identity } from '@semaphore-protocol/identity'

task('register-dapp')
  .setDescription('Register dapp into reclaim')
  .addParam('dappName', 'name of the dapp you want to register')
  .setAction(async ({ dappName }, { ethers, upgrades, network }) => {
    const dappIdentity = new Identity(dappName)
    const { nullifier } = dappIdentity

    const reclaimFactory = await ethers.getContractFactory('Reclaim')
    const contractAddress = getContractAddress(network.name, 'Reclaim')
    const Reclaim = await reclaimFactory.attach(contractAddress)

    const createDappTranactionResponse = await Reclaim.createDapp(nullifier)

    const createDappTransactionReceipt =
      await createDappTranactionResponse.wait()

    const dappId = createDappTransactionReceipt.events![0]!.args![0]!

    console.log('External Nullifier:', nullifier)
    console.log('Dapp Id:', dappId)
  })
