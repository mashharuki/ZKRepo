import LinkButton from "@/components/ui/LinkButton";
import Title from "@/components/ui/Title";

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
 * Check Component
 * @param param0 
 * @returns 
 */
export default async function Check({ 
  searchParams 
}: PageProps) {

  const connected = searchParams?.connected as string ?? "";
  const blockNumber = searchParams?.blockNumber as string ?? "";

  const renderEligible = () => {
    return (
      <>
        <div className="text-center">
          {"Congratulations! You're eligible for the Sample NFT airdrop."}
        </div>
        <LinkButton
          label="Build Axiom proof params"
          href={"/claim?" + new URLSearchParams({
            connected,
            blockNumber: blockNumber
          })}
        />
      </>
    )
  }

  return (
    <>
      <Title>
        Check eligibility
      </Title>
      {renderEligible()}
    </>
  )
}
