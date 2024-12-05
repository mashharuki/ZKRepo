import { task } from 'hardhat/config'
import verify from '../scripts/verify'
import fs from 'fs'

task('verify-contracts').setAction(async ({}, { network }) => {
  const content = JSON.parse(
    fs.readFileSync('./resources/contract-network-config.json', 'utf-8')
  )
  const networkDetails = content['networks'][network.name]

  await verify(networkDetails['Reclaim'].address, network.name)
})
