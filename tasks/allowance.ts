import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import { contractAddr } from "../hardhat.config";

task("allowance", "Check amount <owner> allowed <spender> to use")
.addParam("owner", "Tokens owner")
.addParam("spender", "Tokens spender")
.setAction(async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const result = await contract.allowance(taskArgs.owner, taskArgs.spender);
  console.log(result.toString());
});
module.exports = {};