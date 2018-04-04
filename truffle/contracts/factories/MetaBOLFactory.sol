pragma solidity 0.4.18;

import "../base/Owned.sol";
import "../helpers/AuxHelper.sol";
import "../disposable/MetaBOLCalifornia.sol";
import "../disposable/MetaBOLUkraine.sol";
import "./BaseFactory.sol";


contract MetaBOLFactory is Owned, Aux, BaseFactory {
    function deployContract(bytes32 _type, address _controller) public onlyContractOwner returns(address) {
        address created;
        if (_type == toBytes32("California")) {
            created = new MetaBOLCalifornia(_controller);
        } else if (_type == toBytes32("Ukraine")) {
            created = new MetaBOLUkraine(_controller);
        } else {
            revert();
        }
        Contract(created);
        return created;
    }
}
