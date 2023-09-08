/* eslint-disable import/no-extraneous-dependencies */
import axios, { AxiosInstance } from 'axios';
import { BlockFrostAPI } from '@blockfrost/blockfrost-js';
import { AddressUTxO, TxHashUTxO } from './type';

const apiKey = process.env.BLOCKFROST_API_KEY || ""
const network = process.env.NETWORK || "preprod"
const blockfrostUrl = `https://cardano-${network}.blockfrost.io/api/v0`

interface getResponse<T> {
  data: T
}

export class BlockfrostService {
  axios: AxiosInstance;

  API: BlockFrostAPI;

  constructor() {
    this.API = new BlockFrostAPI({
      projectId: apiKey,
    });
    this.axios = axios.create({
      baseURL: blockfrostUrl,
      timeout: 5000,
      headers: {
        project_id: apiKey,
        "Content-Type": 'application/cbor'
      },
    });
  }

  getUTxO = async (txHash: string): Promise<TxHashUTxO> => {
    const utxo: getResponse<TxHashUTxO> = await this.axios.get(
      `txs/${txHash}/utxos`
    )
    return utxo.data
  }

  getAddressUTXO = async (walletAddress: string, page = 1): Promise<AddressUTxO[]> => {
    const utxos: getResponse<AddressUTxO[]> = await this.axios.get(
      `addresses/${walletAddress}/utxos?page=${page}`,
    );
    return utxos.data;
  };

  submitTransaction = async (signedTx: string): Promise<string> => {
    const txHash = await this.API.txSubmit(signedTx)
    return txHash;
  };
}
