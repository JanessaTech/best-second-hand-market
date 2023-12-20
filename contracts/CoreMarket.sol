// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract CoreMarket is ERC1155, Ownable, ERC1155Pausable, ERC1155Burnable {
    mapping(uint => string) private uris;
    uint private tokenId = 0;
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address account, uint256 amount, string memory _uri) public
    {
        _mint(account, tokenId, amount, "");
        uris[tokenId] = _uri;
        tokenId++;
    }

    function mintBatch(address to, uint256[] memory amounts, string[] memory _uris) public
    {
        require(amounts.length == _uris.length, "the size of amounts must be the same as the size of _uris");
        uint[] memory ids = new uint[](amounts.length);
        for(uint i = 0; i < amounts.length; i++) {
            ids[i] = tokenId;
            uris[tokenId] = _uris[i];
            tokenId++;
        }
        _mintBatch(to, ids, amounts, "");
    }

    function getNextToken() public view returns(uint) {
        return tokenId;
    }

    function getUri(uint _id) public view returns(string memory) {
        return uris[_id];
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Pausable)
    {
        super._update(from, to, ids, values);
    }
}