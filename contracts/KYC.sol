//SPDX-License-Identifier: MIT

pragma solidity > 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KYC is Ownable {
    mapping (address => bool) isVerified;

    // caller is allowed to purchase tokens
    function setKYCCompleted(address _addr) public onlyOwner {
        isVerified[_addr] = true;
    }

    // caller is not allowed to purchase tokens
    function setKYCRevoked(address _addr) public onlyOwner {
        isVerified[_addr] = false;
    }

    // checking if KYC is already done
    function isKYCCompleted(address _addr) public view returns (bool){
        return isVerified[_addr];
    }
}