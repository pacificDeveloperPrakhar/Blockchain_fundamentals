import {clusterApiUrl,Connection, Keypair, sendAndConfirmTransaction, SystemProgram, Transaction} from "@solana/web3.js"
import fs from "fs";
import { networkInterfaces } from "os";
// define the connection
const connection=new Connection(clusterApiUrl("devnet"));
//now create a new transaction
const transaction=new Transaction()
// get the signer public key
console.log(fs.readFileSync("../sender_id.json"))
const senderKeypair=Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync("../sender_id.json"))));
// now generate the keypair for the new account
const accountKeypair=Keypair.generate();
console.log(accountKeypair);
// now create the instruction to create the new account

async function main()
{
    // get the minimum execmption lamports to hold
    const lamports = await connection.getMinimumBalanceForRentExemption(100);
    // now use this lamports to create the account
    const instruction=SystemProgram.createAccount({
        lamports,
        fromPubkey:senderKeypair.publicKey,
        newAccountPubkey:accountKeypair.publicKey,
        space:100,
       //  usually this program id is suppose to be the public key of the program that is controlling but right now
       // we will control it using our custom program
        programId:senderKeypair.publicKey
       })
       
transaction.add(instruction);
const signature=await sendAndConfirmTransaction(connection,transaction,[senderKeypair,accountKeypair]);
console.log(signature)

}

main();

