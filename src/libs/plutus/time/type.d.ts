declare type ConStr<N, T> = { constructor: N; fields: T }
declare type ConStr0<T> = { constructor: 0; fields: T }
declare type ConStr1<T> = { constructor: 1; fields: T }
declare type ConStr2<T> = { constructor: 2; fields: T }
declare type BuiltinByteString = { bytes: string }
declare type Integer = { int: number }
declare type ValidatorHash = BuiltinByteString
declare type PaymentPubKeyHash = BuiltinByteString
declare type PubKeyHash = PaymentPubKeyHash
declare type POSIXTime = Integer
declare type MaybeStakingHash = ConStr1<[]> | ConStr0<[ConStr0<[ConStr0<[BuiltinByteString]>]>]>
declare type PubKeyAddress = ConStr0<[ConStr0<[PubKeyHash]>, MaybeStakingHash]>
declare type ScriptAddress = ConStr0<[ConStr1<[ValidatorHash]>, MaybeStakingHash]>
declare type AssetClass = { constructor: 0; fields: [{ bytes: string }, { bytes: string }] }
declare type AssocMapItem<K, V> = { k: K; v: V }
declare type AssocMap<K, V> = { map: AssocMapItem<K, V>[] }
declare type Tuple<K, V> = ConStr0<[K, V]>
declare type PlutusData =
  | BuiltinByteString
  | Integer
  | MaybeStakingHash
  | PubKeyAddress
  | ScriptAddress
  | AssetClass
  | PaymentPubKeyHash
  | PubKeyHash
  | POSIXTime

export {
  ConStr,
  ConStr0,
  ConStr1,
  ConStr2,
  BuiltinByteString,
  Integer,
  ValidatorHash,
  PaymentPubKeyHash,
  PubKeyHash,
  POSIXTime,
  MaybeStakingHash,
  PubKeyAddress,
  ScriptAddress,
  AssetClass,
  AssocMapItem,
  AssocMap,
  Tuple,
  PlutusData
}
