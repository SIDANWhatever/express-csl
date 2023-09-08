declare interface UTxO {
  tx_hash: string;
  tx_index: number;
  block_height: number;
  block_time: number;
}
declare interface OutputAmount {
  unit: string;
  quantity: string;
}
declare interface TransactionUTxO {
  hash: string;
  block: string;
  block_height: number;
  block_time: number;
  slot: number;
  index: number;
  output_amount: OutputAmount[];
  fees: string;
  deposit: string;
  size: number;
  invalid_before: string;
  invalid_hereafter: string;
  utxo_count: number;
  withdrawal_count: number;
  mir_cert_count: number;
  delegation_count: number;
  stake_cert_count: number;
  pool_update_count: number;
  pool_retire_count: number;
  asset_mint_or_burn_count: number;
  redeemer_count: number;
  valid_contract: boolean;
}

declare interface BlockfrostOutput {
  [x: string]: unknown;
  address?: string | undefined;
  amount?: OutputAmount[] | undefined;
  output_index?: number | undefined;
  collateral?: boolean | undefined;
  data_hash?: string | undefined;
  inline_datum?: string | undefined;
}

declare interface TxHashUTxO {
  hash: string
  inputs: BlockfrostOutput[]
  outputs: BlockfrostOutput[]
}

declare interface AddressUTxO {
  address: string;
  tx_hash: string;
  output_index: number;
  amount: OutputAmount[];
  block: string;
  data_hash: string | null;
  inline_datum: string | null;
  reference_script_hash: string | null;
}

export { UTxO, TransactionUTxO, OutputAmount, BlockfrostOutput, TxHashUTxO, AddressUTxO }