// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Image is Ownable, ERC721URIStorage{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor () ERC721("Image", "IMG") {
    }

    event addImageEvent(address creator, uint256 id);

    function getAddress() public view returns (address) {
        return address(this);
    }

    function addImage(address creator, string memory tokenURI) public returns (uint256) {
        uint256 newImageId = _tokenIds.current();
        _mint(creator, newImageId);
        _setTokenURI(newImageId, tokenURI);
        _tokenIds.increment();
        emit addImageEvent(creator, newImageId);
        return newImageId;
    }

    function exists(uint256 id) public view returns (bool){
        return _exists(id);
    }


}