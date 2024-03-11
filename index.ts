import Web3 from 'web3';
import Web3Connection from './connection';
import { TokenChecker, NftChecker } from './checker';
import { NftOption, TokenOption } from './interface/extra-option';

export class NftTokenChecker {
  web3: Web3;

  constructor(rpc: string) {
    this.web3 = new Web3Connection(rpc).createConnection();
  }

  tokenChecker(tokenAddress: string, extraOptions?: TokenOption) {
    return new TokenChecker(this.web3, tokenAddress, extraOptions);
  }

  nftChecker(nftAddress: string, extraOptions?: NftOption) {
    return new NftChecker(this.web3, nftAddress, extraOptions);
  }
}
