import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

import { contractAddr } from "../hardhat.config";
task("transferFrom", "Transfer <value> allowed tokens <from> account <to> another")
.addParam("from", "Account sending tokens from")
.addParam("to", "Account sending tokens to")
.addParam("value", "Amount of tokens to transfer")
.setAction(async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const result = await contract.transferFrom(taskArgs.from, taskArgs.to, hre.ethers.utils.parseEther(taskArgs.value));
  console.log(result.data.toString());
});
module.exports = {};