pragma solidity ^0.4.18;

import "../base/Owned.sol";
import "../disposable/BaseBOL.sol";
import "./BaseFactory.sol";


contract BaseBOLFactory is Owned, BaseFactory {
    function deployContract(address _metaBOL) public onlyContractOwner returns(address) {
        address created;
        created = new BaseBOL(_metaBOL);
        Contract(created);
        return created;
    }
}
