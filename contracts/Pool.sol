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

    Image[] public images;

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
        images.push(theImage);
        imageMap[h] = theImage;
    }

    function getImage(string memory h) public view returns (Image memory) {
        return imageMap[h];
    }

    function changeOwner(string memory h, address newOwner) public {
        Image memory theImage = getImage(h);
        theImage.owner = newOwner;
    }

}