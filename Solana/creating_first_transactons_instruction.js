import {Transaction,sendAndConfirmRawTransaction,SystemProgram,Keypair, sendAndConfirmTransaction, clusterApiUrl, Connection} from "@solana/web3.js"
import fs from "fs";
// const transaction = new Transaction();

// const sendSolInstruction = SystemProgram.transfer({
//   fromPubkey: sender,
//   toPubkey: recipient,
//   lamports: LAMPORTS_PER_SOL * amount,
// });

// transaction.add(sendSolInstruction);

// const signature = sendAndConfirmTransaction(connection, transaction, [
//     senderKeypair,
//   ]);

// read the file's content to get the private key
// const senderKeypair = Keypair.generate(); // creates a new wallet
// console.log(senderKeypair.publicKey.toBase58()); // your wallet address
// extracting the private key from the file called id.json
const privateKey=Uint8Array.from(JSON.parse(fs.readFileSync("./sender_id.json")));
// now exctracting the key pair from the secreet key
const myKeyPair=Keypair.fromSecretKey(privateKey);
const publicKey_of_sender=myKeyPair.publicKey;


const receiverKeyPair=Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync("./receiver_id.json"))));

const publicKey_of_receiver=receiverKeyPair.publicKey;


// now create the transaction using the constructor
const transaction=new Transaction()
// remember that the public key needs to be passed as the object not string or literal
const sendSolInstruction=SystemProgram.transfer({
    fromPubkey:publicKey_of_sender,
    toPubkey:publicKey_of_receiver,
    lamports:600
})

transaction.add(sendSolInstruction)

// signer's array will be the array of people that will be used as the signer to sign the transaction
// getting the  api url of the cluster
console.log("url of mainnet",clusterApiUrl("mainnet-beta"));
console.log("url of testnet",clusterApiUrl("testnet"));
console.log("url of devnet",clusterApiUrl("devnet"));
const connection=new Connection(clusterApiUrl("devnet"))
const signature=sendAndConfirmTransaction(connection,transaction,[
   myKeyPair
])

// now when we have signed the signature 
async function main()
{
    console.log(await signature)
}
main();