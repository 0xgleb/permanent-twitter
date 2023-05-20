type Network = "development";

module.exports = (artifacts: Truffle.Artifacts, web3: Web3) => {
  return async (
    deployer: Truffle.Deployer,
    network: Network,
    accounts: string[]
  ) => {
    const TweetContract = artifacts.require("TweetContract");
    const Twitter = artifacts.require("Twitter");

    await deployer.deploy(TweetContract);
    // await deployer.link(ConvertLib, MetaCoin);
    await deployer.deploy(Twitter);

    const twitter = await Twitter.deployed();
    console.log(
      `Metacoin deployed at ${twitter.address} in network: ${network}.`
    );
  };
};


// module.exports = function(deployer, network, accounts) {
//     deployer.deploy(TweetContract).then(() =>
//         deployer.deploy(Twitter, accounts[0])
//     );
// };