// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Image {
    address owner;
    string imageHash;
    uint256 price;
    bool forSale;
    bool exists;
}

contract Pool {

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
        Image memory theImage = imageMap[h];
        if (theImage.exists)
            return;
        theImage.imageHash = h;
        theImage.owner = owner;
        theImage.price = price;
        theImage.forSale = forSale;
        theImage.exists = true;
        imageMap[h] = theImage;
        imageHashes.push(h);
    }

    function getImage(string memory h) public view returns (Image memory) {
        return imageMap[h];
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

    function changeOwner(string memory h, address newOwner) public {
        if (contractOwner != msg.sender && imageMap[h].owner != msg.sender)
            return;
        imageMap[h].owner = newOwner;
    }

    function changeState(string memory h, bool forSale) public {
        if (contractOwner != msg.sender && imageMap[h].owner != msg.sender)
            return;
        imageMap[h].forSale = forSale;
    }

    function changePrice(string memory h, uint256 price) public {
        if (contractOwner != msg.sender && imageMap[h].owner != msg.sender)
            return;
        imageMap[h].price = price;
    }

    function changeImage(string memory h, address owner, uint256 price, bool forSale) public {
        Image storage image = imageMap[h];
        if (contractOwner != msg.sender && image.owner != msg.sender)
            return;
        image.owner = owner;
        image.price = price;
        image.forSale = forSale;
    }

}