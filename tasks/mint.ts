import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

import { contractAddr } from "../hardhat.config";
task("mint", "Mint tokens")
.addParam("value", "Amount of tokens to mint")
.addParam("account", "Owner of minted tokens")
.setAction(async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  //const result = await contract._mint(taskArgs.account, hre.ethers.utils.parseEther(taskArgs.value));
  const balance = await contract.balanceOf(signer.address);
  console.log(balance.toString());
});
module.exports = {};