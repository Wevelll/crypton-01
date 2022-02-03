import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

import { contractAddr } from "../hardhat.config";
task("balanceof", "Prints account's balance")
.addParam("account", "Account which balance is requested")
.setAction(async (taskArgs, hre) => {
  const [account] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const balance = await contract.balanceOf(taskArgs.account);
  console.log(balance.toString());
});

module.exports = {};