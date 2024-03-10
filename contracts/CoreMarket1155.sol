// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CoreMarket1155 is ERC1155, Ownable, ERC1155Pausable, ERC1155Burnable {
    mapping(uint => string) private uris;
    uint private tokenId = 0;
    string private _symbol;
    mapping(uint tokenId => address) private _owners;
    mapping(address => uint[]) private tokenIdsOfAddress;
    uint[] private allTokenIds;

    event mint_tracer(address indexed to, string uri);
    event mintBatch_tracer(address indexed to, string[] uris);
    event buy_tracer(address indexed from, address indexed to, uint[] ids);
    event doSafeBuy_tracer(address indexed from, address indexed to, uint[] ids);
    event buyBatch_tracer(address[] indexed froms, address indexed to, uint[][] idss);
    event doSafeBuyBatch_tracer(address[] indexed froms, address indexed to, uint[][] idss);

    constructor(address initialOwner, string memory symbol_) ERC1155("") Ownable(initialOwner) {
        _symbol = symbol_;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function ownerOfToken(uint _tokenId) public view returns (address) {
        return _owners[_tokenId];
    }

    function tokensOfAddress(address _address) public view returns(uint[] memory) {
        return tokenIdsOfAddress[_address];
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, string memory _uri) public returns(uint)
    {
        _mint(to, tokenId, 1, "");
        uris[tokenId] = _uri;
        _owners[tokenId] = to;
        allTokenIds.push(tokenId);
        tokenIdsOfAddress[to].push(tokenId);
        tokenId++;
        emit mint_tracer(to, _uri);
        return tokenId;
    }

    function mintBatch(address to, string[] memory _uris) public returns(uint[] memory)
    {
        uint[] memory tokenIds = new uint[](_uris.length);
        uint[] memory amounts = new uint[](_uris.length);
        for(uint i = 0; i < _uris.length; i++) {
            tokenIds[i] = tokenId;
            amounts[i] = 1;
            uris[tokenId] = _uris[i];
            _owners[tokenId] = to;
            allTokenIds.push(tokenId);
            tokenIdsOfAddress[to].push(tokenId);
            tokenId++;
        }
        _mintBatch(to, tokenIds, amounts, "");
        emit mintBatch_tracer(to, _uris);
        return tokenIds;
    }

    function getAllTokenIds() public view returns(uint[] memory) {
        return allTokenIds;
    }

    function getNextToken() public view returns(uint) {
        return tokenId;
    }

    function getUri(uint _id) public view returns(string memory) {
        return uris[_id];
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint[] memory ids, uint[] memory values)
        internal
        override(ERC1155, ERC1155Pausable)
    {
        super._update(from, to, ids, values);
    }

    function doIdsCheck(address from , uint[] memory ids) view internal {
        for (uint i = 0; i < ids.length; i++) {
            if (i > 0 && ids[i] <= ids[i - 1]) {
                require(false, 'The list of ids is not in asc');
            }
            address owner = ownerOfToken(ids[i]);
            if (owner != from) {
                require(false, string.concat('The id ', Strings.toString(ids[i]), ' is not belonging to from'));
            }
        }
    }

    function buy(address from, address to, uint[] memory ids) public {
        if (to == address(0)) {
            revert ERC1155InvalidReceiver(address(0));
        }
        if (from == address(0)) {
            revert ERC1155InvalidSender(address(0));
        }
        doIdsCheck(from, ids);
        uint[] memory values = new uint[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            values[i] = 1;
            _owners[ids[i]] = to;
            tokenIdsOfAddress[to].push(ids[i]);
            uint256[] storage _tokenIds = tokenIdsOfAddress[from];
            removeId(_tokenIds, ids[i]);
        }
        _update(from, to, ids, values);
        emit buy_tracer(from ,to, ids);
    }

    function removeId(uint[] storage _tokenIds, uint id) internal {
        bool found = false;
        for (uint i = 0; i < _tokenIds.length; i++) {
            if (found) {
                _tokenIds[i - 1] = _tokenIds[i];
            } else {
                if (_tokenIds[i] == id) {
                    found = true;
                }
            }
        }
        _tokenIds.pop();
    }

    function doSafeBuy(address from, address to, uint[] memory ids) public {
       if (to == address(0)) {
            revert ERC1155InvalidReceiver(address(0));
        }
        if (from == address(0)) {
            revert ERC1155InvalidSender(address(0));
        }
        doIdsCheck(from, ids);
        uint[] memory values = new uint[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            values[i] = 1;
            _owners[ids[i]] = to;
            tokenIdsOfAddress[to].push(ids[i]);
            uint256[] storage _tokenIds = tokenIdsOfAddress[from];
            removeId(_tokenIds, ids[i]);
        } 
        _updateWithAcceptanceCheck(from, to, ids, values, "");
        emit doSafeBuy_tracer(from, to, ids);
    }

    function buyBatch(address[] memory froms, address to, uint[][] memory idss) public {
        require(froms.length == idss.length, 'The size of from must be equal to the size of ids');
        for (uint i = 0; i < froms.length; i++) {
            address from = froms[i];
            uint[] memory ids = idss[i];
            doIdsCheck(from, ids);
            buy(from, to, ids);
        }
        emit buyBatch_tracer(froms, to, idss);
    }

    function doSafeBuyBatch(address[] memory froms, address to, uint[][] memory idss) public {
        require(froms.length == idss.length, 'The size of from must be equal to the size of ids');
        for (uint i = 0; i < froms.length; i++) {
            address from = froms[i];
            uint[] memory ids = idss[i];
            doIdsCheck(from, ids);
            doSafeBuy(from, to, ids);
        } 
        emit doSafeBuyBatch_tracer(froms, to, idss);
    }
}