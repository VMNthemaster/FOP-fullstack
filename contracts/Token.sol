//SPDX-License-Identifier: MIT

pragma solidity >0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

contract Token is ERC1155, IERC1155Receiver {
    address payable public contractAddress;

    struct PropertyDetails {
        uint256 id;
        string name;
        address[] recipientAddress;
        uint256[] recipientAmount;
        uint256 tokenAvailable;
    }

    PropertyDetails[] propertyDetails;

    constructor() ERC1155("") {
        contractAddress = payable(address(this));
    }

    function getAllTokens() external view returns (PropertyDetails[] memory) {
        return propertyDetails;
    }

    function getSingleToken(
        uint256 _id
    ) external view returns (bool isPresent, PropertyDetails memory pd) {
        for (uint i = 0; i < propertyDetails.length; i++) {
            if (propertyDetails[i].id == _id) {
                return (true, propertyDetails[i]);
            }
        }
        return (false, propertyDetails[0]); // sending a random token detail just to stay consistent with return type
    }

    function getTokenDetails(
        uint256 _id
    ) internal view returns (bool, uint256) {
        uint256 indexOfToken = 0;
        bool isPresent = false;

        for (uint i = 0; i < propertyDetails.length; i++) {
            if (propertyDetails[i].id == _id) {
                indexOfToken = i;
                isPresent = true;
                break;
            }
        }
        return (isPresent, indexOfToken);
    }

    function getSellerDetails(
        PropertyDetails memory _pd,
        address _seller
    ) internal pure returns (bool, uint256, uint256) {
        bool isSellerPresent = false;
        uint256 amount = 0;
        uint256 indexOfSeller = 0;

        PropertyDetails memory pd = _pd;

        for (uint256 i = 0; i < pd.recipientAddress.length; i++) {
            if (pd.recipientAddress[i] == _seller) {
                isSellerPresent = true;
                amount = pd.recipientAmount[i];
                indexOfSeller = i;
                break;
            }
        }

        return (isSellerPresent, indexOfSeller, amount);
    }

    function getBuyerDetails(
        PropertyDetails memory _pd,
        address _buyer
    ) internal pure returns (bool, uint256) {
        bool isBuyerPresent = false;
        uint256 indexOfBuyer = 0;

        PropertyDetails memory pd = _pd;

        for (uint256 i = 0; i < pd.recipientAddress.length; i++) {
            if (pd.recipientAddress[i] == _buyer) {
                isBuyerPresent = true;
                indexOfBuyer = i;
                break;
            }
        }

        return (isBuyerPresent, indexOfBuyer);
    }

    function transferTokens(uint256 _id) external {
        (bool isPresent, uint256 indexOfToken) = getTokenDetails(_id);
        require(isPresent, "Token Not Found");
        PropertyDetails storage pd = propertyDetails[indexOfToken];

        for (uint i = 0; i < pd.recipientAddress.length; i++) {
            _safeTransferFrom(
                address(contractAddress),
                pd.recipientAddress[i],
                _id,
                pd.recipientAmount[i],
                ""
            );
        }
    }

    function resellToken(
        uint256 _id,
        address _to,
        address _from,
        uint256 _amount
    ) external {
        (bool isPresent, uint256 indexOfToken) = getTokenDetails(_id);
        require(isPresent, "Token Not Found");
        PropertyDetails storage pd = propertyDetails[indexOfToken];

        (
            bool isSellerPresent,
            uint256 indexOfSeller,
            uint256 amount
        ) = getSellerDetails(pd, _from);

        require(isSellerPresent == true, "Seller Does not hold this token");
        require(
            _amount <= amount,
            "Seller does not own required amount of tokens"
        );

        (bool isBuyerPresent, uint256 indexOfBuyer) = getBuyerDetails(pd, _to);

        if (isBuyerPresent == true) {
            pd.recipientAmount[indexOfBuyer] += _amount;
            pd.recipientAmount[indexOfSeller] -= _amount;
        } else {
            pd.recipientAddress.push(_to);
            pd.recipientAmount.push(_amount);
            pd.recipientAmount[indexOfSeller] -= _amount;
        }

        _safeTransferFrom(_from, _to, _id, _amount, "");
    }

    function mintNewToken(
        string memory _name,
        address[] memory _recipientAddress,
        uint256[] memory _recipientAmount
    ) external returns (PropertyDetails memory) {
        PropertyDetails memory pd;
        pd.id = propertyDetails.length;
        pd.name = _name;
        pd.recipientAddress = _recipientAddress;
        pd.recipientAmount = _recipientAmount;
        pd.tokenAvailable = 100;
        propertyDetails.push(pd);

        _mint(address(contractAddress), propertyDetails.length, 100, "");

        return pd;
        /* If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received}
        and return the acceptance magic value. */
    }

    function allotToken(
        uint256 _id,
        address _recipientAddress,
        uint256 _recipientAmount
    ) external {
        // this does not actually buy the token but only allot it to the owner. Transfer function does it at once to everyone
        (bool isPresent, uint256 indexOfToken) = getTokenDetails(_id);
        require(isPresent, "Token Not Found");
        PropertyDetails storage pd = propertyDetails[indexOfToken];

        require(
            _recipientAmount <= pd.tokenAvailable,
            "Requested number of tokens unavailable"
        );
        pd.recipientAddress.push(_recipientAddress);
        pd.recipientAmount.push(_recipientAmount);
        pd.tokenAvailable -= _recipientAmount;
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }
}
