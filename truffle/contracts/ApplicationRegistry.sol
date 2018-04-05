pragma solidity 0.4.18;

import "./adapters/StorageAdapter.sol";
import "./base/AddressChecker.sol";
import './adapters/MultiEventsHistoryAdapter.sol';
import "./adapters/RolesLibraryAdapter.sol";


contract ApplicationsRegistry is RolesLibraryAdapter, AddressChecker, StorageAdapter, MultiEventsHistoryAdapter {

    address public controller;

    StorageInterface.UIntBoolMapping roles;  // Mapping with all roles

    StorageInterface.AddressBytes32Mapping firstname;
    StorageInterface.AddressBytes32Mapping lastname;
    StorageInterface.AddressBytes32Mapping details;
    StorageInterface.AddressUIntMapping role;
    StorageInterface.AddressAddressMapping wallet;
    // address signature
    // bool verified

    /// EVENTS ///

    event RoleDefined(address self, uint role);
    event RoleRemoved(address self, uint role);

    event ApplicationSet(address self, address application, bytes32 firstname, bytes32 lastname, bytes32 details, uint role, address wallet);
    event ApplicationRemoved(address self, address application);
    event ApplicationRoleSet(address self, uint role);


    /// MODIFIERS ///

    modifier onlyWithRole(address _application) {
        if (store.get(role, _application) != 0) {
            _;
        }
    }


    /// CONSTRUCTOR ///

    function ApplicationsRegistry(
        Storage _store,
        bytes32 _crate,
        address _controller,
        address _rolesLibrary
    ) StorageAdapter(_store, _crate) RolesLibraryAdapter(_rolesLibrary) {
        assert(_controller != address(0));
        controller = _controller;

        roles.init("roles");

        firstname.init("firstname");
        lastname.init("lastname");
        details.init("details");
        role.init("role");
        wallet.init("wallet");
    }


    /// SETTINGS ///

    function setupEventsHistory(address _eventsHistory) auth returns(bool) {
        if (getEventsHistory() != 0x0) {
            return false;
        }
        _setEventsHistory(_eventsHistory);
        return true;
    }

    function setController(address _controller)
        auth
        notNull(_controller)
    returns(bool) {
        if (controller == _controller) {
            _emitError("Attempt to change to the same value");
            return false;
        }
        _emitServiceChanged("Controller", controller, _controller);
        controller = _controller;
        return true;
    }



    /// MAIN FUNCTIONS ///

    function defineRole(uint _role) public auth returns(bool) {
        store.set(roles, _role, true);
        _emitRoleDefined(_role);
        return true;
    }

    function create(
        address _application, bytes32 _firstname, bytes32 _lastname,
        bytes32 _details, uint _role, address _wallet
    )
        public
        auth
    returns(bool) {
        require(store.get(role, _application) == 0);  // Application must not exist to be created
        return _set(_application, _firstname, _lastname, _details, _role, _wallet);
    }


    function update(
        address _application, bytes32 _firstname, bytes32 _lastname,
        bytes32 _details, uint _role, address _wallet
    )
        public
        auth
    returns(bool) {
        require(store.get(role, _application) != 0);  // Application must exist to be updated
        return _set(_application, _firstname, _lastname, _details, _role, _wallet);
    }


    function _set(
        address _application, bytes32 _firstname, bytes32 _lastname,
        bytes32 _details, uint _role, address _wallet
    )
        internal
    returns(bool) {
        require(
            _application != address(0) &&
            _firstname.length != 0 &&
            _lastname.length != 0 &&
            _role != 0 &&
            store.get(roles, _role) &&
            _wallet != address(0)
        );
        store.set(firstname, _application, _firstname);
        store.set(lastname, _application, _lastname);
        store.set(details, _application, _details);
        store.set(role, _application, _role);
        store.set(wallet, _application, _wallet);
        _emitApplicationSet(_application, _firstname, _lastname, _details, _role, _wallet);
        return true;
    }

    function remove(address _application) public auth returns(bool) {
        store.set(firstname, _application, "");
        store.set(lastname, _application, "");
        store.set(details, _application, "");
        store.set(role, _application, 0);
        store.set(wallet, _application, address(0));
        _emitApplicationRemoved(_application);
        return true;
    }



    /// GETTERS ///

    function roleExists(uint _role) public constant returns(bool) {
        return store.get(roles, _role);
    }

    function getApplication(address _application)
        public
        constant
        onlyWithRole(_application)
    returns(bytes32, bytes32, uint, address) {
        return (
            store.get(firstname, _application),
            store.get(lastname, _application),
            store.get(role, _application),
            store.get(wallet, _application)
        );
    }

    function getMe()
        public
        constant
    returns(bytes32, bytes32, uint, address) {
        return getApplication(msg.sender);
    }

    function getWallet(address _application) public constant onlyWithRole(_application) returns(address) {
        return store.get(wallet, _application);
    }

    function getApplicationRole(address _application) public constant returns(uint) {
        return store.get(role, _application);
    }

    function hasRole(address _application, uint _role) public constant returns(bool) {
        return store.get(role, _application) == _role;
    }


    /// MULTI EVENTS HISTORY ///

    function _emitRoleDefined(uint _role) internal {
        ApplicationsRegistry(getEventsHistory()).emitRoleDefined(_role);
    }

    function _emitRoleRemoved(uint _role) internal {
        ApplicationsRegistry(getEventsHistory()).emitRoleRemoved(_role);
    }

    function _emitApplicationSet(
        address _application,
        bytes32 _firstname,
        bytes32 _lastname,
        bytes32 _details,
        uint _role,
        address _wallet
    )
        internal {
            ApplicationsRegistry(getEventsHistory()).emitApplicationSet(
                _application,
                _firstname,
                _lastname,
                _details,
                _role,
                _wallet
            );
    }

    function _emitApplicationRemoved(address _application) internal {
        ApplicationsRegistry(getEventsHistory()).emitApplicationRemoved(_application);
    }

    function _emitApplicationRoleSet(uint _role) {
        ApplicationsRegistry(getEventsHistory()).emitApplicationRoleSet(_role);
    }

    function emitRoleDefined(uint _role) {
        RoleDefined(_self(), _role);
    }

    function emitRoleRemoved(uint _role) {
        RoleRemoved(_self(), _role);
    }

    function emitApplicationSet(
        address _application,
        bytes32 _firstname,
        bytes32 _lastname,
        bytes32 _details,
        uint _role,
        address _wallet
    ) {
        ApplicationSet(
            _self(),
            _application,
            _firstname,
            _lastname,
            _details,
            _role,
            _wallet);
    }

    function emitApplicationRemoved(address _application) {
        ApplicationRemoved(_self(), _application);
    }

    function emitApplicationRoleSet(uint _role) {
        ApplicationRoleSet(_self(), _role);
    }


    /// RESTRICTIONS & DISASTER RECOVERY ///

    function kill() auth {
        selfdestruct(msg.sender);
    }

    // FIXME: Add maintenance mode

}
