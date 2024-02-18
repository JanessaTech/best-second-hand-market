const { expect } = require("chai");
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('', function () {
    async function deployMyTodoFixture() {
        const CoreMarket1155 = await ethers.getContractFactory("CoreMarket1155");
        const coreMarket1155 = await CoreMarket1155.deploy();
        return coreMarket1155;
    }
})