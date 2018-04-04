pragma solidity 0.4.18;


import "./base/AddressChecker.sol";
import "./adapters/MultiEventsHistoryAdapter.sol";
import "./adapters/RolesLibraryAdapter.sol";


contract ShipmentFactoryInterface {
    function createShipment(address, address, string, string, uint8, uint256) public returns(address);
}


contract ShipmentRegistryInterface {
    function register(address) returns(bool);
    function relevant(address) returns(bool);
    function remove(address, bool) returns(bool);
}


contract BOLRegistryInterface {
    function register(address) returns(bool);
    function remove(address) returns(bool);
}


contract ShipmentProxyInterface {
    function setShipmentToPendingState(address, address) returns(bool);
    function migrateShipment(address, address) returns(bool);
}


contract ShipmentInterface {
    function status() returns(uint);
    function getTitleOwner() returns(address);
}


contract BOLInterface {
    function reserve(address, uint256, address, address, address, address[], uint256[]) returns(bool);
    function approve() returns(bool);
    function changeIntermediary(uint, address) returns(bool);
    function metaBOL() returns(address);
    function shipment() returns(address);
    function seller() returns(address);
    function buyer() returns(address);
    function escrow() returns(address);
}


contract UsersRegistryInterface {
    function getRole(address) returns(uint);
}


contract ShipmentController is RolesLibraryAdapter, MultiEventsHistoryAdapter {

    address public shipmentProxy;
    address public shipmentFactory;
    address public shipmentRegistry;
    address public bolRegistry;
    address public usersRegistry;
    address public token;
    address public feeCalc;

    address public companyWallet;
    address public networkGrowthPoolWallet;


    /// EVENTS ///

    event BOLReserved(address self, address bol, address shipment, address seller, address buyer, address escrow);

    /// CONSTRUCTOR ///

    function ShipmentController(
        address _rolesLibrary,
        address _shipmentProxy,
        address _shipmentFactory,
        address _shipmentRegistry,
        address _bolRegistry,
        address _usersRegistry,
        address _tokenAddress,
        address _feeCalc
    ) RolesLibraryAdapter(_rolesLibrary) {
        shipmentProxy = _shipmentProxy;
        shipmentFactory = _shipmentFactory;
        shipmentRegistry = _shipmentRegistry;
        bolRegistry = _bolRegistry;
        usersRegistry = _usersRegistry;
        token = _tokenAddress;
        feeCalc = _feeCalc;
    }


    /// SETTINGS ///

    function setupEventsHistory(address _eventsHistory) public auth returns(bool) {
        if (getEventsHistory() != 0x0) {
            return false;
        }
        _setEventsHistory(_eventsHistory);
        return true;
    }

    function setShipmentProxy(address _shipmentProxy)
        auth
        notNull(_shipmentProxy)
    returns(bool) {
        _emitServiceChanged("ShipmentProxy", shipmentProxy, _shipmentProxy);
        shipmentProxy = _shipmentProxy;
        return true;
    }

    function setShipmentFactory(address _shipmentFactory)
        auth
        notNull(_shipmentFactory)
    returns(bool) {
        _emitServiceChanged("ShipmentFactory", shipmentFactory, _shipmentFactory);
        shipmentFactory = _shipmentFactory;
        return true;
    }

    function setShipmentRegistry(address _shipmentRegistry)
        auth
        notNull(_shipmentRegistry)
    returns(bool) {
        _emitServiceChanged("ShipmentRegistry", shipmentRegistry, _shipmentRegistry);
        shipmentRegistry = _shipmentRegistry;
        return true;
    }

    function setBOLRegistry(address _bolRegistry)
        auth
        notNull(_bolRegistry)
    returns(bool) {
        _emitServiceChanged("BOLRegistry", bolRegistry, _bolRegistry);
        bolRegistry = _bolRegistry;
        return true;
    }

    function setUsersRegistry(address _usersRegistry)
        auth
        notNull(_usersRegistry)
    returns(bool) {
        _emitServiceChanged("UsersRegistry", usersRegistry, _usersRegistry);
        usersRegistry = _usersRegistry;
        return true;
    }

    function setToken(address _token)
        auth
        notNull(_token)
    returns(bool) {
        _emitServiceChanged("Token", token, _token);
        token = _token;
        return true;
    }

    function setFeeCalc(address _feeCalc)
        auth
        notNull(_feeCalc)
    returns(bool) {
        _emitServiceChanged("FeeCalc", feeCalc, _feeCalc);
        feeCalc = _feeCalc;
        return true;
    }

    function setFeeWallets(
        address _companyWallet,
        address _networkGrowthPoolWallet
    )
        auth
    returns(bool) {
        require(_companyWallet != address(0) && _networkGrowthPoolWallet != address(0));
        companyWallet = _companyWallet;
        networkGrowthPoolWallet = _networkGrowthPoolWallet;
        // TODO: Separate setters for wallets, emit wallet changed.
        return true;
    }


    event D(address d);

    /// PROPERTY OPERATIONS ///

    // CREATE / REGISTER //

    function createAndRegisterShipment(
        address _previousVersion, address _owner, string _name, string _physicalAddress, uint8 _areaType, uint256 _area
    )
        public
        auth
    returns(bool) {
        address shipment = _createShipment(_previousVersion, _owner, _name, _physicalAddress, _areaType, _area);
        if (_previousVersion != address(0)) {
            // TODO: Test it properly
            assert(_migrateShipment(_previousVersion, shipment));
        }
        return _registerShipment(shipment);
    }

    function _createShipment(
        address _previousVersion, address _owner, string _name, string _physicalAddress, uint8 _areaType, uint256 _area
    )
        internal
    returns(address) {
        // Create shipment contract
        // TODO: Check that the owner is registered.
        return ShipmentFactoryInterface(shipmentFactory).createShipment(
            _previousVersion, _owner, _name, _physicalAddress, _areaType, _area
        );
    }

    function registerShipment(address _shipment) public auth returns(bool) {
        return _registerShipment(_shipment);
    }

    function _registerShipment(address _shipment) internal notNull(_shipment) returns(bool) {
        // Add shipment contract to the shipment registry
        ShipmentRegistryInterface ShipmentRegistry = ShipmentRegistryInterface(shipmentRegistry);
        assert(ShipmentRegistry.register(_shipment));
        return true;
    }


    // REMOVE / MIGRATE //

    function removeShipment(address _shipment) public auth returns(bool) {
        return _removeShipment(_shipment, false);
    }

    function _migrateShipment(address _previousVersion, address _to) internal returns(bool) {
        ShipmentProxyInterface ShipmentProxy = ShipmentProxyInterface(shipmentProxy);
        assert(ShipmentProxy.migrateShipment(_previousVersion, _to));
        return _removeShipment(_previousVersion, true);
    }

    function _removeShipment(address _shipment, bool _migrated) internal returns(bool) {
        ShipmentRegistryInterface ShipmentRegistry = ShipmentRegistryInterface(shipmentRegistry);
        return ShipmentRegistry.remove(_shipment, _migrated);
    }


    /// DEED OPERATIONS ///

    /**
     * Reserve pre-deployed bol for the following Shipment and parties.
     */
    function reserveBOL(
        address _bol,
        address _shipment,
        uint256 _price,
        address _seller,
        address _buyer,
        address _escrow,
        address[] _intermediaries,
        uint256[] _payments
    )
        public
        auth
        notNull(_bol)
        returns(bool)
    {

        // FIXME: Check roles
        BOLInterface BOL = BOLInterface(_bol);
        if (!_validateReservation(_shipment, BOL, _seller)) {
            _emitError("Reservation failed");
            return false;
        }

        bool success = BOL.reserve(_shipment, _price, _seller, _buyer, _escrow, _intermediaries, _payments);
        if (success) {
            _emitBOLReserved(_bol, _shipment, _seller, _buyer, _escrow);
            ShipmentProxyInterface ShipmentProxy = ShipmentProxyInterface(shipmentProxy);
            assert(ShipmentProxy.setShipmentToPendingState(_shipment, _bol));
            assert(_registerBOL(_bol));
            return true;
        }
        return false;
    }

    function _validateReservation(address _shipment, BOLInterface _bol, address _seller) internal returns(bool) {
        if (_bol.metaBOL() == address(0)) {
            return false;
        }
        // Ensure the Shipment is relevant
        ShipmentRegistryInterface ShipmentRegistry = ShipmentRegistryInterface(shipmentRegistry);
        if (!ShipmentRegistry.relevant(_shipment)) {
            return false;
        }
        // Ensure Shipment has initial status
        ShipmentInterface Shipment = ShipmentInterface(_shipment);
        if (Shipment.status() != 0) {
            return false;
        }
        address seller = Shipment.getTitleOwner();
        if (_seller != seller) {
            return false;
        }
        return true;
    }

    /**
     * Save BOL address at the BOL Registry.
     */
    function registerBOL(address _bol) public auth returns(bool) {
        return _registerBOL(_bol);
    }

    function _registerBOL(address _bol) internal notNull(_bol) returns(bool) {
        BOLRegistryInterface BOLRegistry = BOLRegistryInterface(bolRegistry);
        return BOLRegistry.register(_bol);
    }

    /**
     * Remove BOL address from the BOL Registry.
     */
    function removeBOL(address _bol) public auth returns(bool) {
        BOLRegistryInterface BOLRegistry = BOLRegistryInterface(bolRegistry);
        return BOLRegistry.remove(_bol);
    }

    function changeBOLIntermediary(address _bol, uint _intermediariesIndex, address _newActor)
        public
        auth
        notNull(_bol)
        notNull(_newActor)
    returns(bool) {
        BOLInterface BOL = BOLInterface(_bol);
        return BOL.changeIntermediary(_intermediariesIndex, _newActor);
    }




    /// MULTI EVENTS HISTORY ///


    function _emitBOLReserved(address _bol, address _shipment, address _seller, address _buyer, address _escrow) internal {
        ShipmentController(getEventsHistory()).emitBOLReserved(_bol, _shipment, _seller, _buyer, _escrow);
    }


    function emitBOLReserved(address _bol, address _shipment, address _seller, address _buyer, address _escrow) {
        BOLReserved(_self(), _bol, _shipment, _seller, _buyer, _escrow);
    }

    /// RESTRICTIONS & DISASTER RECOVERY ///

    function kill() public auth {
        selfdestruct(msg.sender);
    }

    // TODO: Add maintenance mode

}
