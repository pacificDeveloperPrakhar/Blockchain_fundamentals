import {Keypair} from "@solana/web3.js"
import fs from "fs";
const keypair=Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync("./sender_id.json"))));
console.log(keypair.publicKey.toBase58());
