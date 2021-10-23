import React, { Component, FormEventHandler } from "react";
import { AbiItem } from 'web3-utils';
import Contract from 'web3-eth-contract';
import Tweet from "./contracts/TweetContract.json"
import Twitter from "./contracts/Twitter.json"

import getWeb3 from "./getWeb3";

import "./App.css";
import { convertTypeAcquisitionFromJson } from "typescript";

type State = {
  newUser: NewUser,
}

type NewUser = {
  name: string,
  bio: string
}

type Props = {
  contract: Contract.Contract,
  accounts: [any] 
}

export default class App extends Component<Props, State> {
  state: State = {
      newUser: {
          name: "",
          bio: ""
      }
  }

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

    const { newUser } = this.state;

    const { accounts, contract } = this.props;

    if (contract && accounts) {
      await contract.methods.createUser(newUser.name, newUser.bio).send({
        from: accounts[0] 
      });
    }
  };

  render(): React.ReactNode {
    return (
      <form onSubmit={this.createUser}>
        <input type="text" value={this.state.newUser.name} onChange={this.onNameChange} />
        <br />
        <textarea name="bio" id="new-user-bio" cols={30} rows={10} 
          value={this.state.newUser.bio} onChange={this.onBioChange}>
        </textarea>
      </form>
    );
  }
}