// SPDX-License-Identifier: MPL-2.0
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {GetSecret} from "../src/GetSecret.sol";

contract Deployer is Script {
    GetSecret public getSecret;
    address public proxyContract = 0x75982eBc73a9Fc60d4CBbb4be8CF301bfC032976;

    function run() external {
        // reads our .env file
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        getSecret = new GetSecret(proxyContract);
        vm.stopBroadcast();
    }
}