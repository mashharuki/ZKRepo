"use client";

import { Constants } from "@/shared/constants";
import { useAxiomCircuit } from '@axiom-crypto/react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { formatEther } from "viem";
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Button from "../ui/Button";

/**
 * ClaimAirdropClient Component
 * @param param0 
 * @returns 
 */
export default function ClaimAirdropClient({
  nftAbi,
}: {
  nftAbi: any[],
}) {
  const { address } = useAccount();
  const router = useRouter();
  const { builtQuery } = useAxiomCircuit();
  const [showExplorerLink, setShowExplorerLink] = useState(false);

  // Prepare hook for the sendQuery transaction
  const { config } = usePrepareContractWrite(builtQuery!);
  const { 
    data, 
    isLoading, 
    isSuccess, 
    isError, 
    write 
  } = useContractWrite(config);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setShowExplorerLink(true);
      }, 30000);
    }
  }, [isSuccess, setShowExplorerLink]);

  const proofGeneratedAction = useCallback(() => {
    router.push(`success/?address=${address}`);
  }, [router, address]);

  const proofValidationFailedAction = useCallback(() => {
    if (isError) {
      router.push(`fail/?address=${address}`);
    }
  }, [isError, router, address]);

  // Monitor contract for `ClaimAirdrop` or `ClaimAirdropError` events
  // `Transfer`のイベントが発火された画面遷移
  useContractEvent({
    address: Constants.NFT_ADDR as `0x${string}`,
    abi: nftAbi,
    eventName: 'Transfer',
    listener(log) {
      console.log("Mint NFT success");
      console.log(log);
      proofGeneratedAction();
    },
  });

  const renderButtonText = () => {
    if (isSuccess) {
      return "Waiting for callback...";
    }
    if (isLoading) {
      return "Confrm transaction in wallet...";
    }
    return "Mint Sample NFT!";
  }

  const renderClaimProofText = () => {
    return `Generating the proof for the claim costs ${formatEther(BigInt(builtQuery?.value ?? 0)).toString()}ETH`;
  }

  const renderExplorerLink = () => {
    if (!showExplorerLink) {
      return null;
    }
    return (
      <Link href={`https://explorer.axiom.xyz/v2/goerli/mock`} target="_blank">
        View status on Axiom Explorer
      </Link>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        disabled={isLoading || isSuccess }
        onClick={() => write?.()} // sendQuery → ZKproofが提出され検証が行われる。そしてコントラクト側で実際に結果を受け取りトークンを移転する。
      >
        {renderButtonText()}
      </Button>
      <div className="flex flex-col items-center text-sm gap-2">
        <div>
          {isSuccess ? "Proof generation may take up to 3 minutes" : renderClaimProofText()}
        </div>
        {renderExplorerLink()}
      </div>
    </div>
  )
}
