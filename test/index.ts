import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { Croken, Croken__factory } from "../typechain";

describe("Croken contract", function () {
  let Token: Croken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;
  let ownerBalance: BigNumber;

  before(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const crokenFactory = (await ethers.getContractFactory(
      "Croken", owner
      )) as Croken__factory;

    Token = await crokenFactory.deploy(ethers.utils.parseEther("0"));
  });

  describe("Deployment", function () {
    it("Should assign the total supply of tokens to the owner", async function () {
      ownerBalance = await Token.balanceOf(owner.address);
      expect(await Token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Minting/burning", function () {
    const baseAmount = ethers.utils.parseEther("138840");
    const newAmount = ethers.utils.parseEther("69420");

    it("Owner mints some tokens", async function () {
      await Token._mint(owner.address, baseAmount);
      expect (
        await Token.balanceOf(owner.address)
      ).to.be.equal(baseAmount);
    });

    it("Owner burns some tokens", async function () {
      await Token._burn(owner.address, newAmount);
      expect (
        await Token.balanceOf(owner.address)
      ).to.be.equal(newAmount);
    });

    it("Others can't mint/burn tokens", async function () {
      await expect (
        Token.connect(addr1)._mint(addr2.address, newAmount)
      ).to.be.revertedWith("You are not the owner!");
      await expect (
         Token.connect(addr2)._burn(owner.address, newAmount)
      ).to.be.revertedWith("You are not the owner!");
    });
  });

  describe("Transactions", function () {
    const balance1 = ethers.utils.parseEther("1337");
    const balance2 = ethers.utils.parseEther("322");

		it("Should transfer tokens between accounts & update balances", async function () {
        await Token.transfer(addr1.address, balance1);
        const addr1Balance = await Token.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(balance1);

        await Token.connect(addr1).transfer(addr2.address, balance2);
        const addr2Balance = await Token.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(balance2);

        await Token.transfer(addr3.address, balance1.add(balance2));
        const addr3Balance = await Token.balanceOf(addr3.address);
        expect(addr3Balance).to.equal(balance1.add(balance2));
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
        const initialOwnerBalance = await Token.balanceOf(owner.address);

        await expect (
          Token.connect(addr2).transfer(owner.address, initialOwnerBalance)
        ).to.be.revertedWith("Insufficient balance");

        expect(await Token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
});