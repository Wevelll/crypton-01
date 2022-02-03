import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

import { contractAddr } from "../hardhat.config";
task("totalsupply", "Prints total supply of tokens")
.setAction(async (taskArgs, hre) => {
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const supply = await contract.totalSupply();
  console.log(supply.toString());
});
module.exports = {};