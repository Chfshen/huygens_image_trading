// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Pool {

    struct Image {
        address owner;
        string imageHash;
        uint256 price;
        bool forSale;
    }

    mapping (string => Image) imageMap;

    address contractOwner;

    string[] public imageHashes;

    constructor () {
        contractOwner = msg.sender;
    }

    function getAddress() public view returns (address) {
        return address(this);
    }

    function addImage(address owner, string memory h, uint256 price, bool forSale) public {
        Image memory theImage;
        theImage.imageHash = h;
        theImage.owner = owner;
        theImage.price = price;
        theImage.forSale = forSale;
        imageMap[h] = theImage;
        imageHashes.push(h);
    }

    function getImage(string memory h) public view returns (Image memory) {
        return imageMap[h];
    }

    function changeOwner(string memory h, address newOwner) public {
        imageMap[h].owner = newOwner;
    }

    function getAllImages() public view returns (Image[] memory) {
        uint256 length = imageHashes.length;
        Image[] memory ret = new Image[](length);
        for (uint256 i = 0; i < imageHashes.length; i++) {
            Image memory image = imageMap[imageHashes[i]];
            ret[i] = image;
        }
        return ret;
    }

}