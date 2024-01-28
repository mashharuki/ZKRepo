// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/verifier/Verifier.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        if (deployerPrivateKey == 0) {
            console.log("PRIVATE_KEY env var not set");
            return;
        }

        vm.startBroadcast(deployerPrivateKey);

        // Deploy Verifier
        AllVerifiers verifierImpl = new AllVerifiers();

        vm.stopBroadcast();

        console.log("AllVerifiers implementation deployed at: %s", address(verifierImpl));
        console.log("Please add this address into .env");
        console.log("---- DONE ----");
    }
}