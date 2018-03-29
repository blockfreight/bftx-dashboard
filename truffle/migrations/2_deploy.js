var ProofOfExistence = artifacts.require("./ProofOfExistence.sol")
var Ownable = artifacts.require("./Ownable.sol")
var RBAC = artifacts.require("./RBAC.sol")
var Roles = artifacts.require("./Roles.sol")
var Whitelist = artifacts.require("./Whitelist.sol")
module.exports = function(deployer) {
    deployer.deploy(ProofOfExistence);
    deployer.deploy(Ownable);
    deployer.deploy(RBAC);
    deployer.deploy(Roles);
    deployer.deploy(ProofOfExistence);
}