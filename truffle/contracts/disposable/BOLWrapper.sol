pragma solidity 0.4.18;

import "../base/Owned.sol";

contract BOLInterface {
    function selledId() public constant returns(address);
    function buyerId() public constant returns(address);
    function brokerId() public constant returns(address);
    function agentId() public constant returns(address);
    function shipmentId() public constant returns(address);
    function price() public constant returns(uint);
}


contract BOLWrapper is Owned {

    address public shipment;
    uint256 public price;
    address public seller;
    address public buyer;

    // PROPERTY //

    function escrow() public constant returns(address) {
        return address(0);
    }
    function status() public constant returns(uint8) {
        return 1;
    }
    function moves(uint8) public constant returns(uint8) {
        return 1;
    }
    function intermediaries(uint256) public constant returns(address) {
        return address(0);
    }
    function metaBOL() public constant returns(address) {
        return address(0);
    }

    function BOLWrapper(address _shipment, address _seller, address _buyer) public {
        shipment = _shipment;
        seller = _seller;
        buyer = _buyer;
    }

    function setPrice(uint256 _price) public onlyContractOwner {
        price = _price;
    }

}