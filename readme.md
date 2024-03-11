# Token and NFT Checker

Token and NFT Checker library support for Ethereum Virtual Machine (EVM)


## Installation

Install my-project with npm

```bash
  npm i token-nft-owner-checker
```


    ## Usage/Examples


Typescript usage
```typescript
import { NftTokenChecker } from "token-nft-owner-checker";
import { NftChecker } from "token-nft-owner-checker/dist/cjs/checker";


const nftTokenChecker: NftTokenChecker = new NftTokenChecker("https://rcp.com");
const nftChecker: NftChecker = nftTokenChecker.nftChecker("0xd3c268d36f335c7fdda9b428ad5f8dce394ce1f4");

// get NFT Metadata by Token Id
nftChecker.tokenUri(3879).then((uri: string) => nftChecker.getNftMetadata(uri).then((meta: Object) => console.log(meta)));

// get NFT Owner by Token Id
nftChecker.ownerOf(3879).then((owner: string) => console.log(owner));


// Token Checker
const tokenChecker: TokenChecker = nftTokenChecker.tokenChecker("0x9f589e3eabe42ebc94a44727b3f3531c0c877809");
// get token balance by owner address
tokenChecker.getBalance("0x99......").then((balance: number) => console.log(number));
```



Javascript usage
```javascript
const { NftTokenChecker } = require("token-nft-owner-checker");

const nftTokenChecker = new NftTokenChecker("https://rpc.com");
const nftChecker = nftTokenChecker.nftChecker("0xd3c268d36f335c7fdda9b428ad5f8dce394ce1f4");

// get NFT Metadata by Token Id
nftChecker.tokenUri(3879).then((uri) => nftChecker.getNftMetadata(uri).then((meta) => console.log(meta)));

// get NFT Owner by Token Id
nftChecker.ownerOf(3879).then((owner) => console.log(owner));


// Token checker
const tokenChecker: TokenChecker = nftTokenChecker.tokenChecker("0x9f589e3eabe42ebc94a44727b3f3531c0c877809");
// get token balance by owner address
tokenChecker.getBalance("0x99......").then((balance) => console.log(number));
```
