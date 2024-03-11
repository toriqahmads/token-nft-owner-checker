import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import Contract from 'web3-eth-contract';
import erc20Abi from '../abis/erc20.json';
import { formatUnits } from '@ethersproject/units';
import { BigNumber } from '@ethersproject/bignumber';
import { TokenOption } from '../interface/extra-option';

export class TokenChecker {
  abi: AbiItem | AbiItem[];
  web3: Web3;
  tokenContract: Contract;
  tokenContractAddress: string;

  constructor(web3: Web3, tokenContractAddress: string, extraOptions?: TokenOption) {
    this.abi = erc20Abi as AbiItem[];
    this.web3 = web3;
    this.tokenContractAddress = tokenContractAddress;

    if (extraOptions && extraOptions.abi) {
      this.abi = extraOptions.abi;
    }

    this.tokenContract = new this.web3.eth.Contract(this.abi, tokenContractAddress);
  }

  async getBalance(address: string): Promise<number> {
    try {
      const balance = await this.tokenContract.methods.balanceOf(address).call();
      return Promise.resolve(balance);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async decimal(): Promise<number> {
    try {
      const decimal = await this.tokenContract.methods.decimal().call();
      return Promise.resolve(decimal);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async methodCaller(methodName: string, args: any[]) {
    try {
      const result = await this.tokenContract.methods[methodName](...args).call();
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async formatUnits(balance: string | number, decimal: number): Promise<string> {
    try {
      if (!decimal) decimal = await this.decimal();
      const decimalToken = BigNumber.from(decimal ? decimal : 18);
      const format = formatUnits(BigNumber.from(balance), decimalToken);
      return Promise.resolve(format);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
