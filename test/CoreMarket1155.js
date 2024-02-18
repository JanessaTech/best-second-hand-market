const { expect } = require("chai");
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('CoreMarket1155', function () {
    async function deployMyTodoFixture() {
        const initialOwner = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
        const address1 = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
        const address2 = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'
        const address3 = '0x90F79bf6EB2c4f870365E785982E1f101E93b906'
        const address4 = '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65'
        const uris = ['ipfs://aaaa', 'ipfs://bbbb', 'ipfs://cccc', 'ipfs://dddd', 'ipfs://eeee', 'ipfs://ffff']
        const SYMBOL = 'CH'
        const CoreMarket1155 = await ethers.getContractFactory("CoreMarket1155");
        const coreMarket1155 = await CoreMarket1155.deploy(initialOwner, SYMBOL);
        return {coreMarket1155, SYMBOL, uris, address1, address2, address3, address4};
    }

    describe("init", function () {
        it("Should return the correct symbol", async function () {
            const {coreMarket1155, SYMBOL} = await loadFixture(deployMyTodoFixture)
            const symbol = await coreMarket1155.symbol()
            expect(symbol).to.equal(SYMBOL)
        })
    })

    describe("mint", function () {
        it("Should fail to mint using invalid to address", async function () {
            const {coreMarket1155} = await loadFixture(deployMyTodoFixture)
            await expect(coreMarket1155.mint(ethers.ZeroAddress, 'ipfs://aaaa')).to.be.reverted;
        })
        it("Should mint successfully with correct result", async function () {
            const {coreMarket1155, address1, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            const newToken = Number(await coreMarket1155.getNextToken()) - 1
            const uri = await coreMarket1155.getUri(newToken)
            const owner = await coreMarket1155.ownerOfToken(newToken)
            const tokenIds = await coreMarket1155.tokensOfAddress(address1)
            const balance = await coreMarket1155.balanceOf(address1, newToken)
            
            expect(newToken).to.equal(0)
            expect(uri).to.equal(uris[0])
            expect(owner).to.equal(address1)
            expect(tokenIds).to.eql([0n])
            expect(balance).to.equal(1)
        })
        it("Should mint more than one nft successfully with correct result", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await coreMarket1155.mint(address2, uris[3])
            await coreMarket1155.mint(address2, uris[4])
            await coreMarket1155.mint(address2, uris[5])
            const tokenIds1 = await coreMarket1155.tokensOfAddress(address1)
            const tokenIds2 = await coreMarket1155.tokensOfAddress(address2)

            expect(tokenIds1).to.eql([0n, 1n, 2n])
            expect(tokenIds2).to.eql([3n, 4n, 5n])
        })
    })

    describe("buy", function () {
        it("Should fail to buy when from is invalid address", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await expect(coreMarket1155.buy(ethers.ZeroAddress, address2, [0])).to.be.reverted
        })
        it("Should fail to buy when from is invalid address", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await expect(coreMarket1155.buy(address2, ethers.ZeroAddress, [0])).to.be.reverted
        })
        it ("Should fail to buy when ids contains ids which don't belong to from", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await expect(coreMarket1155.buy(address1, address2, [3])).to.be.revertedWith('The id 3 is not belonging to from')
        })
        it ("Should fail to buy when ids contains duplicated id", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await expect(coreMarket1155.buy(address1, address2, [1, 1])).to.be.revertedWith('The list of ids is not in asc')
        })
        it ("Should fail to buy when ids is not asc in order", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await expect(coreMarket1155.buy(address1, address2, [2, 0, 1])).to.be.revertedWith('The list of ids is not in asc')
        })
        it ("Should buy success with correct result", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await coreMarket1155.buy(address1, address2, [0, 1])
            const owner0 = await coreMarket1155.ownerOfToken(0)
            const owner1 = await coreMarket1155.ownerOfToken(1)
            const owner2 = await coreMarket1155.ownerOfToken(2)
            const tokenIds1 = await coreMarket1155.tokensOfAddress(address1)
            const tokenIds2 = await coreMarket1155.tokensOfAddress(address2)
            const balance10 = await coreMarket1155.balanceOf(address1, 0)
            const balance11 = await coreMarket1155.balanceOf(address1, 1)
            const balance12 = await coreMarket1155.balanceOf(address1, 2)
            const balance20 = await coreMarket1155.balanceOf(address2, 0)
            const balance21 = await coreMarket1155.balanceOf(address2, 1)
            const balance22 = await coreMarket1155.balanceOf(address2, 2)

            expect(owner0).to.equal(address2)
            expect(owner1).to.equal(address2)
            expect(owner2).to.equal(address1)
            expect(tokenIds1).to.eql([2n])
            expect(tokenIds2).to.eql([0n, 1n])
            expect(balance10).to.equal(0)
            expect(balance11).to.equal(0)
            expect(balance12).to.equal(1)
            expect(balance20).to.equal(1)
            expect(balance21).to.equal(1)
            expect(balance22).to.equal(0)
        })
    })

    describe("doSafeBuy", function () {
        it("Should fail to doSafeBuy when from is invalid address", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await expect(coreMarket1155.doSafeBuy(ethers.ZeroAddress, address2, [0])).to.be.reverted
        })
        it("Should fail to doSafeBuy when from is invalid address", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await expect(coreMarket1155.doSafeBuy(address2, ethers.ZeroAddress, [0])).to.be.reverted
        })
        it ("Should fail to doSafeBuy when ids contains ids which don't belong to from", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await expect(coreMarket1155.doSafeBuy(address1, address2, [3])).to.be.revertedWith('The id 3 is not belonging to from')
        })
        it ("Should fail to doSafeBuy when ids contains duplicated id", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await expect(coreMarket1155.doSafeBuy(address1, address2, [1, 1])).to.be.revertedWith('The list of ids is not in asc')
        })
        it ("Should fail to doSafeBuy when ids is not asc in order", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await expect(coreMarket1155.doSafeBuy(address1, address2, [2, 0, 1])).to.be.revertedWith('The list of ids is not in asc')
        })
        it ("Should doSafeBuy success with correct result", async function () {
            const {coreMarket1155, address1, address2, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await coreMarket1155.doSafeBuy(address1, address2, [0, 1])
            const owner0 = await coreMarket1155.ownerOfToken(0)
            const owner1 = await coreMarket1155.ownerOfToken(1)
            const owner2 = await coreMarket1155.ownerOfToken(2)
            const tokenIds1 = await coreMarket1155.tokensOfAddress(address1)
            const tokenIds2 = await coreMarket1155.tokensOfAddress(address2)
            const balance10 = await coreMarket1155.balanceOf(address1, 0)
            const balance11 = await coreMarket1155.balanceOf(address1, 1)
            const balance12 = await coreMarket1155.balanceOf(address1, 2)
            const balance20 = await coreMarket1155.balanceOf(address2, 0)
            const balance21 = await coreMarket1155.balanceOf(address2, 1)
            const balance22 = await coreMarket1155.balanceOf(address2, 2)

            expect(owner0).to.equal(address2)
            expect(owner1).to.equal(address2)
            expect(owner2).to.equal(address1)
            expect(tokenIds1).to.eql([2n])
            expect(tokenIds2).to.eql([0n, 1n])
            expect(balance10).to.equal(0)
            expect(balance11).to.equal(0)
            expect(balance12).to.equal(1)
            expect(balance20).to.equal(1)
            expect(balance21).to.equal(1)
            expect(balance22).to.equal(0)
        })
    })

    describe("buyBatch", function () {
        it("Should fail to buyBatch when the size of froms is not the same as the size of idss", async function () {
            const {coreMarket1155, address1, address2, address3, address4, address5, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await coreMarket1155.mint(address2, uris[3])
            await coreMarket1155.mint(address2, uris[4])
            await coreMarket1155.mint(address2, uris[5])
            await expect(coreMarket1155.buyBatch([address1, address2], address3, [[1, 2]])).to.be.revertedWith('The size of from must be equal to the size of ids')
        })
        it("Should fail to buyBatch when idss contains id which doesn't belong to the corresponding from address", async function () {
            const {coreMarket1155, address1, address2, address3, address4, address5, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await coreMarket1155.mint(address2, uris[3])
            await coreMarket1155.mint(address2, uris[4])
            await coreMarket1155.mint(address2, uris[5])
            await expect(coreMarket1155.buyBatch([address1, address2], address3, [[1, 2, 6], [4, 5]])).to.be.revertedWith('The id 6 is not belonging to from')
        })
        it("Should fail to buyBatch when idss contains an array which has duplicated id", async function () {
            const {coreMarket1155, address1, address2, address3, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await coreMarket1155.mint(address2, uris[3])
            await coreMarket1155.mint(address2, uris[4])
            await coreMarket1155.mint(address2, uris[5])
            await expect(coreMarket1155.buyBatch([address1, address2], address3, [[1, 2, 2], [4, 5]])).to.be.revertedWith('The list of ids is not in asc')
        })
        it("Should fail to buyBatch when idss contains an array which is not asc in order", async function () {
            const {coreMarket1155, address1, address2, address3, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await coreMarket1155.mint(address2, uris[3])
            await coreMarket1155.mint(address2, uris[4])
            await coreMarket1155.mint(address2, uris[5])
            await expect(coreMarket1155.buyBatch([address1, address2], address3, [[2, 1], [4, 5]])).to.be.revertedWith('The list of ids is not in asc')
        })
        it("Should buyBatch successfully with correct result ", async function () {
            const {coreMarket1155, address1, address2, address3, uris} = await loadFixture(deployMyTodoFixture)
            await coreMarket1155.mint(address1, uris[0])
            await coreMarket1155.mint(address1, uris[1])
            await coreMarket1155.mint(address1, uris[2])
            await coreMarket1155.mint(address2, uris[3])
            await coreMarket1155.mint(address2, uris[4])
            await coreMarket1155.mint(address2, uris[5])
            await coreMarket1155.buyBatch([address1, address2], address3, [[1, 2], [4, 5]])

            const tokenIds1 = await coreMarket1155.tokensOfAddress(address1)
            const tokenIds2 = await coreMarket1155.tokensOfAddress(address2)
            const tokenIds3 = await coreMarket1155.tokensOfAddress(address3)
            const owner0 = await coreMarket1155.ownerOfToken(0)
            const owner1 = await coreMarket1155.ownerOfToken(1)
            const owner2 = await coreMarket1155.ownerOfToken(2)
            const owner3 = await coreMarket1155.ownerOfToken(3)
            const owner4 = await coreMarket1155.ownerOfToken(4)
            const owner5 = await coreMarket1155.ownerOfToken(5)
            const balance10 = await coreMarket1155.balanceOf(address1, 0)
            const balance11 = await coreMarket1155.balanceOf(address1, 1)
            const balance12 = await coreMarket1155.balanceOf(address1, 2)
            const balance13 = await coreMarket1155.balanceOf(address1, 3)
            const balance14 = await coreMarket1155.balanceOf(address1, 4)
            const balance15 = await coreMarket1155.balanceOf(address1, 5)
            const balance20 = await coreMarket1155.balanceOf(address2, 0)
            const balance21 = await coreMarket1155.balanceOf(address2, 1)
            const balance22 = await coreMarket1155.balanceOf(address2, 2)
            const balance23 = await coreMarket1155.balanceOf(address2, 3)
            const balance24 = await coreMarket1155.balanceOf(address2, 4)
            const balance25 = await coreMarket1155.balanceOf(address2, 5)
            const balance30 = await coreMarket1155.balanceOf(address3, 0)
            const balance31 = await coreMarket1155.balanceOf(address3, 1)
            const balance32 = await coreMarket1155.balanceOf(address3, 2)
            const balance33 = await coreMarket1155.balanceOf(address3, 3)
            const balance34 = await coreMarket1155.balanceOf(address3, 4)
            const balance35 = await coreMarket1155.balanceOf(address3, 5)

            expect(tokenIds1).to.eql([0n])
            expect(tokenIds2).to.eql([3n])
            expect(tokenIds3).to.eql([1n, 2n, 4n, 5n])
            expect(owner0).to.equal(address1)
            expect(owner1).to.equal(address3)
            expect(owner2).to.equal(address3)
            expect(owner3).to.equal(address2)
            expect(owner4).to.equal(address3)
            expect(owner5).to.equal(address3)
            expect(balance10).to.equal(1)
            expect(balance11).to.equal(0)
            expect(balance12).to.equal(0)
            expect(balance13).to.equal(0)
            expect(balance14).to.equal(0)
            expect(balance15).to.equal(0)
            expect(balance20).to.equal(0)
            expect(balance21).to.equal(0)
            expect(balance22).to.equal(0)
            expect(balance23).to.equal(1)
            expect(balance24).to.equal(0)
            expect(balance25).to.equal(0)
            expect(balance30).to.equal(0)
            expect(balance31).to.equal(1)
            expect(balance32).to.equal(1)
            expect(balance33).to.equal(0)
            expect(balance34).to.equal(1)
            expect(balance35).to.equal(1)
        })
    })
})