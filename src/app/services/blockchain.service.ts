import { Injectable } from '@angular/core';
import { Blockchain } from 'GuptaCoin/src/blockchain';
import * as EC from 'elliptic';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public blockchainInstance = new Blockchain();
  public walletKeys: Array<walletKey> = [];

  constructor() { 
    this.blockchainInstance.difficulty = 1;
    this.blockchainInstance.minePendingTransactions('aabhas-address');

    this.generateWalletKeys();
  }

  getBlocks(){
    return this.blockchainInstance.chain;
  }

  private generateWalletKeys(){
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    });

    console.log(this.walletKeys);
  }
}

export interface walletKey{
  keyObj: any;
  publicKey: string;
  privateKey: string;
}

