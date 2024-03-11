import Web3 from 'web3';
import { provider } from 'web3-core';
import { WebsocketProviderOptions } from 'web3-core-helpers';

export default class Web3Connection {
  rpc: string;
  wsOptions: WebsocketProviderOptions;

  constructor(rpc: string) {
    this.wsOptions = {
      timeout: 10000,
      clientConfig: {
        keepalive: true,
        keepaliveInterval: 3000,
      },
      reconnect: {
        auto: true,
        delay: 2000,
        maxAttempts: 5,
        onTimeout: true,
      },
      reconnectDelay: 1,
    };

    this.rpc = rpc;
  }

  getProvider(): provider {
    let prov: provider = this.rpc;

    if (this.rpc.startsWith('http')) {
      prov = new Web3.providers.HttpProvider(this.rpc);
    }
    if (this.rpc.startsWith('ws')) {
      prov = new Web3.providers.WebsocketProvider(this.rpc, this.wsOptions);
    }

    return prov;
  }

  createConnection() {
    return new Web3(this.getProvider());
  }
}
