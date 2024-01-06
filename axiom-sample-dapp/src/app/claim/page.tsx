import BuildQuery from "@/components/claim/BuildQuery";
import Title from "@/components/ui/Title";
import nftJson from '@/lib/abi/NFT.json';
import { CircuitInputs } from "@/lib/circuit/circuit";
import { bytes32 } from "@/lib/utils";
import { Constants } from "@/shared/constants";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

/**
 * Claim Component
 * @param param0 
 * @returns 
 */
export default async function Claim({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";
  const blockNumber = 10330000;

  const inputs: CircuitInputs = {
    blockNumber: Number(blockNumber),
    tokenAddress: Constants.TOKEN_ADDR,
    userAddress: connected
  }

  return (
    <>
      <Title>
        Claim airdrop
      </Title>
      <div className="text-center">
        Please wait while we generate a compute proof in wasm for the Axiom Query. Once complete, you can click the buttom below to claim your Sample NFT airdrop.
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BuildQuery
          inputs={inputs}
          callbackAddress={Constants.NFT_ADDR}
          callbackExtraData={bytes32(connected)}
          refundee={connected}
          nftAbi={nftJson.abi}
        />
      </div>
    </>
  )
}
