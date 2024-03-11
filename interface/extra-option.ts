import { AbiItem } from 'web3-utils';

export interface NftOption {
  ipfsHost?: string;
  abi?: AbiItem | AbiItem[];
}

export interface TokenOption {
  abi?: AbiItem | AbiItem[];
}
