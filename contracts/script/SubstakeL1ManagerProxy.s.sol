// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {SubstakeL1ManagerProxy} from "../src/L1/proxy/SubstakeL1ManagerProxy.sol";

contract L1ManagerProxyScript is Script {
    address admin = 0x55d9a0d367866a102eD85EA76CE46B11E62b3E88;

    function run() public returns (SubstakeL1ManagerProxy) {
        vm.startBroadcast();
        SubstakeL1ManagerProxy l1ManagerProxy = new SubstakeL1ManagerProxy(admin);
        vm.stopBroadcast();
        return l1ManagerProxy;
    }
}
