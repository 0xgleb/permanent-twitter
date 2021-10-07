var PermanentTweet = artifacts.require("./PermanentTweet.sol");
var PermanentTwitter = artifacts.require("./PermanentTwitter.sol");

module.exports = function(deployer, network, accounts) {
    console.log(accounts);

    deployer.deploy(PermanentTweet).then(() =>
        deployer.deploy(PermanentTwitter, accounts[0])
    );
};
