import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

import { contractAddr } from "../hardhat.config";
task("burn", "Burns tokens")
.addParam("value", "Amount of tokens to burn")
.addParam("account", "Owner of tokens trying to burn")
.setAction(async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  //const result = await contract.burn(taskArgs.account, hre.ethers.utils.parseEther(taskArgs.value));
});
module.exports = {};