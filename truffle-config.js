const path = require("path");

require("ts-node").register({
  files: true,
});

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        develop: {
            port: 8545
        },
        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port is 8545 (default: none)
            network_id: "*",       // Any network (default: none)
        }
  }
};
