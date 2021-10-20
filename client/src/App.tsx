import React, { Component, FormEventHandler } from "react";
import { AbiItem } from 'web3-utils';
import Contract from 'web3-eth-contract';
import Tweet from "./contracts/TweetContract.json"
import Twitter from "./contracts/Twitter.json"

import getWeb3 from "./getWeb3";

import "./App.css";
import { convertTypeAcquisitionFromJson } from "typescript";

type State = {
  storageValue: number,
  web3: any | null,
  contract: Contract.Contract | null,
  accounts: [any] | null
  newUser: NewUser,
  users: User[]
}

type NewUser = {
  name: string,
  bio: string
}

type User = {
  address: string,
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
    newUser: {
      name: "",
      bio: ""
    }
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
      // // Stores a given value, 5 by default.
      const userCount: number = await contract.methods.userCount().call();

      let users: User[] = this.state.users;

      for(let i = 1; i <= userCount; i++) {
        const user: User = await contract.methods.users(i).call();
        users.push(user);
      }

      this.setState({ users });
    }
  };

  onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    let newUser: NewUser = this.state.newUser;
    newUser.name = (event.target as HTMLInputElement).value;
    this.setState({ newUser });
  }

  onBioChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    let newUser: NewUser = this.state.newUser;
    newUser.bio = (event.target as HTMLInputElement).value;
    this.setState({ newUser });
  };

  createUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { accounts, contract, newUser } = this.state;

    if (contract && accounts) {
      await contract.methods.createUser(newUser.name, newUser.bio).send({
        from: accounts[0] 
      });
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Permanent Twitter</h1>
        <form onSubmit={this.createUser}>
          <input type="text" value={this.state.newUser.name} onChange={this.onNameChange} />
          <br />
          <textarea name="bio" id="new-user-bio" cols={30} rows={10} 
            value={this.state.newUser.bio} onChange={this.onBioChange}>
          </textarea>
        </form>
        <ul>
          {this.state.users.map(user => 
            <li id={user.address}>{user.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
