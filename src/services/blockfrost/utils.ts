import { AddressUTxO, BlockfrostOutput } from './type';
import { parseInlineDatum } from '../../libs/plutus/csl/utils';

export const locateUTxOWithAddress = <T extends BlockfrostOutput | AddressUTxO>(output: T[], targetAddress: string): T | undefined => output.find((o) => o.address === targetAddress)
export const locateUTxOWithPolicyId = <T extends BlockfrostOutput | AddressUTxO>(output: T[], targetPolicyId: string): T | undefined => output.find(
  (o) => o.amount?.findIndex((a) => a.unit?.startsWith(targetPolicyId)) !== -1,
);
export const locateUTxOWithAddressAndPolicyId = <T extends BlockfrostOutput | AddressUTxO>(output: T[], targetAddress: string, targetPolicyId: string): T | undefined => {
  const utxoAtAddress = locateUTxOWithPolicyId(output, targetPolicyId);
  if (utxoAtAddress) {
    return locateUTxOWithAddress([utxoAtAddress], targetAddress);
  }
  return undefined
}

export const blockfrostParseInlineDatum = <T>(utxo: BlockfrostOutput): T => {
  const datumCbor: string = utxo.inline_datum || '';
  return parseInlineDatum<T>(datumCbor);
}

export const getOutputLovelace = (output: BlockfrostOutput): string => output.amount?.find((a) => a.unit === 'lovelace')?.quantity || "0";
