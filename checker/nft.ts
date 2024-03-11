import Web3 from 'web3';
import axios from 'axios';
import { AbiItem } from 'web3-utils';
import Contract from 'web3-eth-contract';
import erc721Abi from '../abis/erc721.json';
import { NftOption } from '../interface/extra-option';

export class NftChecker {
  web3: Web3;
  ipfsHost: string;
  abi: AbiItem | AbiItem[];
  nftContract: Contract;
  nftContractAddress: string;

  constructor(web3: Web3, nftContractAddress: string, extraOptions?: NftOption) {
    this.abi = erc721Abi as AbiItem[];;
    this.ipfsHost = 'https://ipfs.io';
    this.web3 = web3;
    this.nftContractAddress = nftContractAddress;
    if (extraOptions) {
      if (extraOptions.abi)
        this.abi = extraOptions.abi;
      if (extraOptions.ipfsHost)
        this.ipfsHost = extraOptions.ipfsHost;
    }
    this.nftContract = new this.web3.eth.Contract(this.abi, nftContractAddress);
  }

  async balanceOf(owner: string): Promise<number> {
    try {
      const balance = await this.nftContract.methods.balanceOf(owner).call();
      return Promise.resolve(balance);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async ownerOf(tokenId: number): Promise<string> {
    try {
      const owner = await this.nftContract.methods.ownerOf(tokenId).call();
      return Promise.resolve(owner);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async tokenOfOwnerByIndex(owner: string, index: number): Promise<string> {
    try {
      const tokenId = await this.nftContract.methods.tokenOfOwnerByIndex(owner, index).call();
      return Promise.resolve(tokenId);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async tokenUri(tokenId: number): Promise<string> {
    try {
      const uri = await this.nftContract.methods.tokenURI(tokenId).call();
      return Promise.resolve(uri);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async methodCaller(methodName: string, args: any[]) {
    try {
      const result = await this.nftContract.methods[methodName](...args).call();
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getNftMetadata(tokenUri: string) {
    try {
      tokenUri = this.parseTokenUri(tokenUri);
      const metadata = await axios.get(`${this.ipfsHost}/ipfs/${tokenUri}`);
      return Promise.resolve(metadata.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  parseTokenUri(tokenUri: string) {
    if (tokenUri.includes('//')) tokenUri = tokenUri.split('//')[1];
    return tokenUri;
  }
}
