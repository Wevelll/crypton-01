import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

import { contractAddr } from "../hardhat.config";
task("transfer", "Transfer tokens to account")
.addParam("to", "Token receiver")
.addParam("value", "Amount of tokens")
.setAction(async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const result = await contract.transfer(taskArgs.to, hre.ethers.utils.parseEther(taskArgs.value));
  const newBalance = await contract.balanceOf(taskArgs.to);
  console.log(newBalance.toString());
});
module.exports = {};