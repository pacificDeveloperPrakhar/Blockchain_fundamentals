// using_EcDSA.js
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";

// set sha512 once before using keys
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

// now you can generate keys
const privateKey = ed.utils.randomPrivateKey(); // 32 bytes
const publicKey = await ed.getPublicKey(privateKey);

console.log({
  privateKey: Buffer.from(privateKey).toString("hex"),
  publicKey: Buffer.from(publicKey).toString("hex"),
});
