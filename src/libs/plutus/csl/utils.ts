import csl from '@emurgo/cardano-serialization-lib-nodejs';

export const serializeString = (str: string): string => Buffer.from(str, 'utf8').toString('hex');
export const deserializeString = (hex: string): string => Buffer.from(hex, 'hex').toString('utf8');

export const bytesToHex = (bytes: ArrayBuffer) => Buffer.from(bytes).toString('hex');
export const hexToBytes = (hex: string) => Buffer.from(hex, 'hex');

export const addrBech32ToHex = (bech32: string): string => {
  const hexAddress = csl.Address.from_bech32(bech32).to_hex()
  const cslAddress = csl.Address.from_hex(hexAddress)
  const hex = csl.PlutusData.from_address(cslAddress).to_hex()
  return hex
}

export const addrBech32ToObj = <T>(bech32: string): T => {
  const hexAddress = csl.Address.from_bech32(bech32).to_hex()
  const cslAddress = csl.Address.from_hex(hexAddress)
  const json = JSON.parse(csl.PlutusData.from_address(cslAddress).to_json(1))
  return json
}

export const hexToObj = <T>(hex: string): T => JSON.parse(csl.PlutusData.from_hex(hex).to_json(1))
export const objToHex = <T>(obj: T): string => csl.PlutusData.from_json(JSON.stringify(obj), 1).to_hex()

export const parseInlineDatum = <T>(datumCbor: string): T => {
  const ParsedDatum = csl.PlutusData.from_hex(datumCbor);
  const datum: T = JSON.parse(ParsedDatum.to_json(1));
  return datum as T;
}

export const parsePlutusAddressToBech32 = (plutusHex: string, networkId = 0) => {
  const cslPlutusDataAddress = csl.PlutusData.from_hex(plutusHex)
  const plutusDataAddressObject = JSON.parse(cslPlutusDataAddress.to_json(csl.PlutusDatumSchema.DetailedSchema))
  const plutusDataPaymentKeyObject = plutusDataAddressObject.fields[0]
  const plutusDataStakeKeyObject = plutusDataAddressObject.fields[1]
  let bech32Addr = ""
  if (plutusDataStakeKeyObject.constructor === 0 && plutusDataStakeKeyObject.fields.length !== 0) {
    const cslPaymentKeyHash = csl.Ed25519KeyHash.from_hex(plutusDataPaymentKeyObject.fields[0].bytes)
    const cslStakeKeyHash = csl.Ed25519KeyHash.from_hex(plutusDataStakeKeyObject.fields[0].fields[0].fields[0].bytes)
    const cslBaseAddress = csl.BaseAddress.new(
      networkId,
      csl.StakeCredential.from_keyhash(cslPaymentKeyHash),
      csl.StakeCredential.from_keyhash(cslStakeKeyHash)
    )
    bech32Addr = cslBaseAddress.to_address().to_bech32()
  } else {
    const cslPaymentKeyHash = csl.Ed25519KeyHash.from_hex(plutusDataPaymentKeyObject.fields[0].bytes)
    const cslEnterpriseAddress = csl.EnterpriseAddress.new(
      networkId,
      csl.StakeCredential.from_keyhash(cslPaymentKeyHash)
    )
    bech32Addr = cslEnterpriseAddress.to_address().to_bech32()
  }
  console.log("Parsed address", bech32Addr);
  return bech32Addr
}
