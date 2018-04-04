pragma solidity 0.4.18;

import "../base/AddressChecker.sol";
import "../base/Owned.sol";


contract Shipment is Owned, AddressChecker {

    enum Status { OWNED, PENDING, MIGRATED }
    enum AreaType { FEET, METERS }

    address public titleOwner;

    string public name;
    string public physicalAdress;
    string public description;
    string public url;
    string public meta;
    uint256 public area;  // Area type x100, for precicion

    address public currentBOL;
    Status public status;
    AreaType public areaType;

    address public previousVersion;
    address public newVersion;


    /// MODIFIERS ///

    modifier onlyStatus(Status _status) {
        if (status == _status) {
            _;
        }
    }


    /// EVENTS ///

    event OwnerChanged(address shipment, address owner);
    event StatusChanged(address shipment, uint8 to);
    event Migrated(address to);


    function Shipment(
        address _previousVersion,
        address _titleOwner,
        string _name,
        string _physicalAdress,
        uint _areaType,
        uint256 _area
    ) {
        previousVersion = _previousVersion;
        titleOwner = _titleOwner;
        name = _name;
        physicalAdress = _physicalAdress;
        areaType = AreaType(_areaType);
        area = _area;
        status = Status.OWNED;
    }


    function setShipmentToPendingState(address _bol)
        public
        onlyContractOwner
        onlyStatus(Status.OWNED)
    returns(bool) {
        status = Status.PENDING;
        currentBOL = _bol;
        StatusChanged(address(this), uint8(status));
        return true;
    }


    function setUrl(string _url) public only(titleOwner) returns(bool) {
        url = _url;
        return true;
    }


    // FIXME
    function approveOwnershipTransfer(address _newOwner)
        public
        onlyStatus(Status.PENDING)
        only(currentBOL)
    returns(bool) {
        titleOwner = _newOwner;
        status = Status.OWNED;
        currentBOL = address(0);
        OwnerChanged(address(this), _newOwner);
        StatusChanged(address(this), uint8(status));
        return true;
    }


    // FIXME
    function rejectOwnershipTransfer()
        public
        onlyStatus(Status.PENDING)
        only(currentBOL)
    returns(bool) {
        status = Status.OWNED;
        currentBOL = address(0);
        StatusChanged(address(this), uint8(status));
    }


    function migrate(address _to) public onlyContractOwner returns(bool) {
        Shipment newShipment = Shipment(_to);
        if (newShipment.getPreviousVersion() != address(this)) {
            return false;
        }
        newVersion = _to;
        status = Status.MIGRATED;
        Migrated(_to);
        return true;
    }


    /// GETTERS ///

    function getTitleOwner() public constant returns(address) {
        return titleOwner;
    }

    function getPreviousVersion() public constant returns(address) {
        return previousVersion;
    }

    function getNewVersion() public constant returns(address) {
        return newVersion;
    }

}
