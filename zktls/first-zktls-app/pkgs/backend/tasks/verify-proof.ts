import { task } from 'hardhat/config'
import { getContractAddress } from './utils'
import { Reclaim } from "../src/types";

task('verify-proof')
  .setDescription('Verify proof into reclaim')
//   .addParam('', 'name of the dapp you want to register')
  .setAction(async ({ }, { ethers, network }) => {
        const signerAddress = await ethers.provider.getSigner().getAddress();
        console.log(
            `verifying proof on "${network.name}" from address "${signerAddress}"`
        );

        const reclaimFactory = await ethers.getContractFactory('Reclaim')
        const contractAddress = getContractAddress(network.name, 'Reclaim')
        const reclaim = await reclaimFactory.attach(contractAddress)

        // Verify Proof
        const data2Verify = {
          identifier: '0x9b92efaa7f1c6fc7e0ff86f2ff0dbe569788ad36f2ec3d730a5715c21e25fdda',
          claimData: {
            provider: 'http',
            parameters: '{"headers":{"accept":"application/json, text/plain, */*"},"method":"GET","responseMatches":[{"type":"contains","value":"{\\"ethereum\\":{\\"usd\\":3804.24}}"}],"responseRedactions":[],"url":"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"}',
            owner: '0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb',
            timestampS: 1717383161,
            context: '{"providerHash":"0xe11e1f569bd47f02aca3306a5b544e12b37bcbceb0e8df890e07f723901f709f"}',
            identifier: '0x9b92efaa7f1c6fc7e0ff86f2ff0dbe569788ad36f2ec3d730a5715c21e25fdda',
            epoch: 1
          },
          signatures: [
            '0x3fcc9f4cf27950a9b88cd2bfdc44a3735709e35390ec79962a12a459f16253be2cd75686d42c09993650d1e96d7f8d898b628686c896c7598f296ec9d3c490b31b'
          ],
          witnesses: [
            {
              id: '0x244897572368eadf65bfbc5aec98d8e5443a9072',
              url: 'https://reclaim-node.questbook.app'
            }
          ]
        };

        const claimInfo = {
            "provider": data2Verify.claimData.provider,
            "parameters": data2Verify.claimData.parameters,
            "context": data2Verify.claimData.context,
        };

        const identifier = data2Verify.claimData.identifier;

        const signedClaim = {
            "claim": {
                "identifier": data2Verify.claimData.identifier,
                "owner": data2Verify.claimData.owner,
                "epoch": data2Verify.claimData.epoch,
                "timestampS": data2Verify.claimData.timestampS
            },
            "signatures": data2Verify.signatures,
        }


        const proof: Reclaim.ProofStruct = {
            claimInfo: claimInfo,
            signedClaim: signedClaim
        }
        console.log(proof);
        const verifyResponse = await reclaim.verifyProof(proof);

        await verifyResponse.wait()
        console.log(verifyResponse);
    }
)

