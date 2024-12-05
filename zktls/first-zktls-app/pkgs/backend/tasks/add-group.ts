import { task, types } from "hardhat/config";
import { getContractAddress } from "./utils";

task("add-group", "Start a new epoch")
  .addParam("provider", "name of the provider", "", types.string)
  .setAction(async (taskArgs, { ethers, network }) => {
    const { provider } = taskArgs;
    console.log(`Creating Group for ${provider} provider`);
    // console.log(network.name);
    const reclaimFactory = await ethers.getContractFactory("Reclaim");
    const contractAddress = getContractAddress(network.name, "Reclaim");
    // console.log(contractAddress);
    // return;
    const Reclaim = await reclaimFactory.attach(contractAddress);

    console.log(`Calling....`);

    const tx = await Reclaim.createGroup(provider, 20);
    const txReceipt = await tx.wait();
    console.log(txReceipt);
    // get groupId from events
    let groupId = txReceipt.events![2]!.args![0]!.toString();

    console.log(`Group for ${provider} provider Created with id => ${groupId}`);
  });
