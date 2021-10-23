import React, { Component, FormEventHandler } from "react";
import { AbiItem } from 'web3-utils';
import Contract from 'web3-eth-contract';
import Tweet from "./contracts/TweetContract.json"
import Twitter from "./contracts/Twitter.json"

import getWeb3 from "./getWeb3";

import "./App.css";
import { convertTypeAcquisitionFromJson } from "typescript";

import CreateUser from './CreateUser'

type State = {
  storageValue: number,
  web3: any | null,
  contract: Contract.Contract | null,
  accounts: [any] | null
  users: User[],
  error: string | null
}

type User = {
  userAddress: string,
  name: string,
  bio: string
}

class App extends Component {
  state : State = { 
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    users: [],
    error: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = (Twitter.networks as any)[networkId];
      const instance = new web3.eth.Contract(
        (Twitter.abi as AbiItem[]),
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    if(accounts && contract) {
      try {
        // // Stores a given value, 5 by default.
        const userCount: number = await contract.methods.userCount().call();

        let users: User[] = this.state.users;

        for(let i = this.state.users.length + 1; i <= userCount; i++) {
          const user: User = await contract.methods.users(i).call();
          users.push(user);
        }

        this.setState({ users });
      } catch(error) {
        console.log(error);
        this.setState({ 
          error: "Calling the contract failed. Are you on the right network? Check the console to see the error" 
        });
      }
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    if(this.state.error) {
      return <h1>Error: {this.state.error}</h1>;
    }

    if(!this.state.contract) {
      return <h1>Couldn't load the contract!</h1>
    }

    if(!this.state.accounts) {
      return <h1>Couldn't load accounts!</h1>
    }

    return (
      <div className="App">
        <h1>Permanent Twitter</h1>
        <CreateUser contract={this.state.contract} accounts={this.state.accounts} />
        <ul>
          {this.state.users.map(user => 
            <li key={user.userAddress}>{user.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
