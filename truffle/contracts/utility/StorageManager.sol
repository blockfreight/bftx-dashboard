pragma solidity 0.4.18;

import "../base/Owned.sol";


contract StorageManager is Owned {

    mapping(address => mapping(bytes32 => bool)) internal approvedContracts;


    /// EVENTS ///

    event AccessGiven(address actor, bytes32 role);
    event AccessBlocked(address actor, bytes32 role);


    /// MAIN FUNCTIONS ///

    function giveAccess(address _actor, bytes32 _role) public onlyContractOwner returns(bool) {
        approvedContracts[_actor][_role] = true;
        AccessGiven(_actor, _role);
        return true;
    }

    function blockAccess(address _actor, bytes32 _role) public onlyContractOwner returns(bool) {
        approvedContracts[_actor][_role] = false;
        AccessBlocked(_actor, _role);
        return true;
    }

    function isAllowed(address _actor, bytes32 _role) public constant returns(bool) {
        return approvedContracts[_actor][_role];
    }

    /// RESTRICTIONS & DISASTER RECOVERY ///

    function kill() public onlyContractOwner {
        selfdestruct(msg.sender);
    }

    // FIXME: Add maintenance mode

}
