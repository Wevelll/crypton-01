import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

import { contractAddr } from "../hardhat.config";

task("approve", "Let <spender> use <value> of tokens")
.addParam("spender", "Spender of tokens")
.addParam("value", "Amount of tokens to allow")
.setAction(async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const result = await contract.approve(taskArgs.spender, hre.ethers.utils.parseEther(taskArgs.value));
  console.log(result.toString());
});

module.exports = {};