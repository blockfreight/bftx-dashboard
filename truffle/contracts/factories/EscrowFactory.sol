pragma solidity 0.4.18;

import "./BaseFactory.sol";
import "../base/Owned.sol";
import "../disposable/EscrowEther.sol";
import "../disposable/EscrowOracle.sol";
import "../helpers/AuxHelper.sol";


contract EscrowFactory is Owned, Aux, BaseFactory  {
    function deployContract(bytes32 _type, address _metaBOL, address _baseBOL, address _arg1) public onlyContractOwner returns(address) {
        address created;
        if (_type == toBytes32("Ether")) {
            created = new EscrowEther(_metaBOL, _baseBOL);
        }
        else if (_type == toBytes32("Oracle")) {
            created = new EscrowOracle(_metaBOL, _baseBOL, _arg1);
        }
        else {
            revert();
        }
        Contract(created);
        return created;
    }
}
