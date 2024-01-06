import MainLayout from '@/components/layout/MainLayout'
import ConnectWallet from '@/components/ui/ConnectWallet'
import LinkButton from '@/components/ui/LinkButton'
import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'


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

export default async function Home({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";
  console.log(searchParams);

  const renderButton = () => {
    if (connected) {
      return <LinkButton
        label="Check Eligibility"
        href={"/check?" + forwardSearchParams(searchParams)}
      />;
    }
    return <ConnectWallet connected={connected} />;
  }

  return (
    <>
      <Title>
        Axiom NFT Dapp
      </Title>
      <div className="text-center">
        Anyone who has Link Token can mint Sample NFT!!
      </div>
      {renderButton()}
    </>
  )
}
