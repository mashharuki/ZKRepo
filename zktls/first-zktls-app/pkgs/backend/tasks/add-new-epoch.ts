import { task, types } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { getContractAddress } from "./utils";
import { generateMockWitnessesList } from "../test/utils";
import fs from "fs";
import { Reclaim } from "../src/types";

task("add-new-epoch", "Start a new epoch")
  .addParam("address", "address of a witness", undefined, types.string)
  .addParam("host", "Hostof a witness", undefined, types.string)
  .setAction(async (taskArgs, { ethers, network }) => {
    const { address, host } = taskArgs;
    if (!address) {
      console.log("here");
      return;
    }

    const witness: Reclaim.WitnessStruct = { addr: address, host };
    const signerAddress = await ethers.provider.getSigner().getAddress();
    console.log(
      `adding witness on "${network.name}" from address "${signerAddress}"`
    );

    const contractAddress = getContractAddress(network.name, "Reclaim");
    const factory = await ethers.getContractFactory("Reclaim");
    const contract = factory.attach(contractAddress);

    const tx = await contract.addNewEpoch([witness], 1);
    await tx.wait();
    // console.log(tx);
    // return; //
    const currentEpoch = await contract.fetchEpoch(0);

    console.log(`current epoch: ${currentEpoch.id}`);
    console.log(
      `epoch witnesses: ${currentEpoch.witnesses.map((w) => w.addr).join(", ")}`
    );
    console.log(`epoch start: ${new Date(currentEpoch.timestampStart * 1000)}`);
  });
