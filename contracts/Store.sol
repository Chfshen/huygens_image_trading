// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Product {
    uint256 id;
    uint256 price;
    uint256 index;
    bool forSale;
}

contract Store {

    mapping (uint256 => Product) productMap;

    address contractOwner;

    uint256[] public productIds;

    constructor () {
        contractOwner = msg.sender;
    }

    function getAddress() public view returns (address) {
        return address(this);
    }

    function addProduct(uint256 id, uint256 price) public {
        Product memory product = productMap[id];
        if (product.forSale)
            return;
        product.price = price;
        product.id = id;
        product.forSale = true;
        product.index = productIds.length;
        productMap[id] = product;
        productIds.push(id);
    }

    function getProduct(uint256 id) public view returns (Product memory) {
        return productMap[id];
    }

    function getPrice(uint256 id) public view returns (uint256) {
        return productMap[id].price;
    }

    function getAllProducts() public view returns (Product[] memory) {
        uint256 length = productIds.length;
        Product[] memory ret = new Product[](length);
        for (uint256 i = 0; i < productIds.length; i++) {
            Product memory product = productMap[productIds[i]];
            ret[i] = product;
        }
        return ret;
    }

    function changePrice(uint256 id, uint256 price) public {
        if (contractOwner != msg.sender || !productMap[id].forSale)
            return;
        productMap[id].price = price;
    }

    function removeProduct(uint256 id) public {
        if (contractOwner != msg.sender || !productMap[id].forSale)
            return;
        uint256 index = productMap[id].index;
        productMap[id].forSale = false;
        if (index != productIds.length - 1) {
            productIds[index] = productIds[productIds.length - 1];
            productMap[productIds[index]].index = index;
        }
        productIds.pop();
    }

}