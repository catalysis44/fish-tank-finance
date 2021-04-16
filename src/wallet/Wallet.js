import React from 'react'
import Web3Modal from "@wandevs/web3modal";
import { WanWalletConnector } from '@web3-react-wan/wanwallet-connector'

import Web3 from "web3";

const INITIAL_STATE = {
  address: "",
  web3: null,
  provider: null,
  connected: false,
  networkId: 1, // TODO: CHANGE TO 888 AFTER JUPITER FORK
  chainType: "wan"
};

const differ = (a, b) => {
  if (a.address !== b.address) {
    return 1;
  }

  if (a.networkId !== b.networkId) {
    return 1;
  }

  if (a.connected !== b.connected) {
    return 1;
  }

  return 0;
}

export const WalletContext = React.createContext({}, differ);

function initWeb3(provider) {
  const web3 = new Web3(provider);
  return web3;
}


class Wallet extends React.Component {
  constructor(props) {
    super(props);
    const intiState = {
      ...INITIAL_STATE,
      resetApp: this.resetApp,
      connect: this.onConnect
    };

    this.setWallet = props.setWallet;
    this.setWallet(intiState);

    if (typeof window === 'undefined') {
      return;
    }

    // console.debug('new web3modal');
    this.web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      disableInjectedProvider: false,
      providerOptions: this.getProviderOptions()
    });
  }

  componentDidMount() {
    // console.debug('web3Modal.cachedProvider', this.web3Modal.cachedProvider);
    if (this.web3Modal.cachedProvider) {
      if (this.web3Modal.cachedProvider === 'wanmask' && !window.wanchain) {
        this.web3Modal.clearCachedProvider();
        return;
      }
      this.onConnect();
    }
  }

  onConnect = async () => {
    let provider;
    
    try {
      if (window.injectWeb3) {
        provider = await this.web3Modal.connectTo('wanwallet');
      } else {
        provider = await this.web3Modal.connect();
      }
    } catch (error) {
      console.error(error);
    }

    await this.subscribeProvider(provider);

    const web3 = initWeb3(provider);

    const accounts = await web3.eth.getAccounts();

    const address = accounts[0];

    const networkId = await web3.eth.net.getId();

    await this.setWallet({
      web3,
      provider,
      connected: true,
      address,
      networkId,
      chainType: this.web3Modal.cachedProvider === 'wanmask' || this.web3Modal.cachedProvider === 'wanwallet' ? 'wan' : 'eth',
      resetApp: this.resetApp,
      connect: this.onConnect
    });
  };

  subscribeProvider = async (provider) => {
    if (!provider || !provider.on) {
      return;
    }
    provider.on("close", () => this.resetApp());
    provider.on("accountsChanged", async (accounts) => {
      await this.setWallet({ ...this.props.wallet, address: accounts[0] });
    });
    provider.on("chainChanged", async (event) => {
      // console.debug('event', event);
      const { web3 } = this.props.wallet;
      if (web3) {
        const networkId = await web3.eth.net.getId();
        await this.setWallet({ ...this.props.wallet, networkId });
      } else {
        await this.setWallet({ ...this.props.wallet, networkId: event });
      }
    });

    provider.on("networkChanged", async (networkId) => {
      await this.setWallet({ ...this.props.wallet, networkId });
    });
  };

  getProviderOptions = () => {
    const providerOptions = {
      wanmask: {
        package: {},
        opts: {
          config: {}
        }
      },
      wanwallet: {
        package: new WanWalletConnector({
          chainId: 888,
          url: 'https://rpc.zookeeper.finance',
          pollingInterval: 15000,
          requestTimeoutMs: 300000
        })
      }
    };
    return providerOptions;
  };

  resetApp = async () => {
    const { web3 } = this.props.wallet;
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await this.web3Modal.clearCachedProvider();
    this.setWallet({ ...INITIAL_STATE, 
      resetApp: this.resetApp,
      connect: this.onConnect
    });
  };

  render() {
    return (<></>)
  }
}

export default Wallet;