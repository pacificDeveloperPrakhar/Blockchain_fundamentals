import {Keypair}from "@solana/web3.js"
import nacl from "tweetnacl"
const keyPair=Keypair.generate()
console.log(keyPair.publicKey)
console.log(keyPair.secretKey)
const message=new TextEncoder().encode("i will give 30 chocolate to smphy")
const signature=nacl.sign.detached(message,keyPair.secretKey)
const result = nacl.sign.detached.verify(
  message,
  signature,
  keyPair.publicKey.toBytes(),
);

console.log(result);