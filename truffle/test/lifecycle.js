var Claimable = artifacts.require("./Claimable.sol");


contract('Claimable', function(accounts) {
    it("Check existence", function() {
        return Claimable.deployed().then(function(instance) {
            instance.notarize.call("put transaction id here");
            return instance;
        }).then(function(instance) {
            return instance.checkDocument.call("put transaction id here");

        }).then(async function(result){
            console.log(result)
        });
    });



});