import { task } from "hardhat/config";
import { getContractAddress } from "./utils";
import verify from "../scripts/verify";

task("upgrade").setAction(async ({}, { ethers, upgrades, network }) => {
  const address = getContractAddress(network.name, "Reclaim");
  console.log("upgrading Reclaim contract at address: ", address);
  const ReclaimContractFactoryV2 = await ethers.getContractFactory("Reclaim");
  const Reclaim = await upgrades.upgradeProxy(
    address,
    ReclaimContractFactoryV2
  );
  const baseReclaim = await Reclaim.deployed();

  console.log("Reclaim contract v2 proxy upgraded");
  await verify(baseReclaim.address, network.name, []);
});
