pragma solidity 0.4.18;

import "../base/Owned.sol";
import "../helpers/SafeMath.sol";

contract BOLInterface {
    function shipment() returns(address);
    function seller() returns(address);
    function buyer() returns(address);
    function price() returns(uint256);
}

contract ControllerInterface {
    function feeCalc() public constant returns(address);
    function token() public constant returns(address);
    function usersRegistry() public constant returns(address);

    function registerBOL(address _bol) public returns(bool);
    function registerShipment(address _shipment) public returns(bool);

    function companyWallet() public constant returns(address);
    function networkGrowthPoolWallet() public constant returns(address);
}

contract FeeCalcInterface {
    function getFee(uint256) public constant returns(uint256);
    function getCompanyFee(uint256) public constant returns(uint256);
    function getNetworkGrowthFee(uint256) public constant returns(uint256);
}

contract ERC20Interface {
    function allowance(address owner, address spender) public constant returns (uint256);
    function transferFrom(address from, address to, uint256 value) public returns (bool);
    function approve(address spender, uint256 value) public returns (bool);
    function balanceOf(address who) public constant returns (uint256);
    function transfer(address to, uint256 value) public returns (bool);
    function totalSupply() public constant returns(uint256);
    function decimals() public constant returns(uint8);
}

contract UsersRegistryInterface {
    function create(
        address _user, bytes32 _firstname, bytes32 _lastname,
        bytes32 _details, uint _role, address _wallet
    )
        public
    returns(bool);
}

contract AgentBOLRegistrator is Owned {

    using SafeMath for uint256;

    BOLInterface public bol;
    ControllerInterface public controller;
    FeeCalcInterface public feeCalc;

    function AgentBOLRegistrator(address _bol, address _controller, address _feeCalc) public {
        bol = BOLInterface(_bol);
        controller = ControllerInterface(_controller);
        feeCalc = FeeCalcInterface(_feeCalc);
    }

    function setController(address _controller) public onlyContractOwner {
        controller = ControllerInterface(_controller);
    }

    function setBOL(address _bol) public onlyContractOwner {
        bol = BOLInterface(_bol);
    }

    function doRegistration(bytes32 sellerfHash, bytes32 sellerlHash, bytes32 buyerfHash, bytes32 buyerlHash) public onlyContractOwner {
        // Registration Users
        UsersRegistryInterface(controller.usersRegistry()).create(bol.seller(), sellerfHash, sellerlHash, "", 128, bol.seller());
        UsersRegistryInterface(controller.usersRegistry()).create(bol.buyer(), buyerfHash, buyerlHash, "", 128, bol.buyer());

        // Registration shipment
        controller.registerShipment(bol.shipment());

        // Registration bol
        controller.registerBOL(address(bol));

        // Transfer fee to company wallet
        address companyWallet = controller.companyWallet();
        assert(companyWallet != address(0));
        uint256 companyFee = feeCalc.getCompanyFee(bol.price());
        assert(ERC20Interface(controller.token()).transfer(companyWallet, companyFee));

        // Transfer fee to network wallet
        address networkGrowthPoolWallet = controller.networkGrowthPoolWallet();
        assert(networkGrowthPoolWallet != address(0));
        uint256 networkGrowthFee = feeCalc.getNetworkGrowthFee(bol.price());
        assert(ERC20Interface(controller.token()).transfer(networkGrowthPoolWallet, networkGrowthFee));
    }

}