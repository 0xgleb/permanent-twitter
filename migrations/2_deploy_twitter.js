var TweetContract = artifacts.require("TweetContract");
var Twitter = artifacts.require("./Twitter.sol");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(TweetContract).then(() =>
        deployer.deploy(Twitter, accounts[0])
    );
};
