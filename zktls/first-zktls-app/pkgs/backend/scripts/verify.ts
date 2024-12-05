const verify = async (
  contractAddress: string,
  networkName: string,
  args?: any[]
) => {
  if (networkName === "hardhat") {
    return;
  }

  console.log("Verifying contract...");
  try {
    // @ts-expect-error events
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
};
export default verify;
