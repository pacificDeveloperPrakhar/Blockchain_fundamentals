import borsh from "@coral-xyz/borsh";
import { SystemProgram, TransactionInstruction ,Keypair, sendAndConfirmTransaction, Connection, clusterApiUrl, Transaction} from "@solana/web3.js";
import fs from "fs";
// now we will structre the data of our instruction buffer
const schemaEquip=borsh.struct([
    borsh.u8("variant"),
    borsh.u16("player_id"),
    borsh.u32("inventory_id")
])
const senderKeypair=Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync("../sender_id.json"))));
// now allot the buffer some space prior
const buffer=Buffer.alloc(1000);
schemaEquip.encode({
    variant:2,player_id:0x235,inventory_id:0xf23
},buffer);


// now slicing the buffer to store the real instruction buffer
const instructionData=buffer.subarray(0,schemaEquip.getSpan(buffer));
const account_keypair=Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync('./account_serialization.json'))))

// now create the connection object
const connection =new Connection(clusterApiUrl('devnet'));

// now create the instruction
const instruction=new TransactionInstruction({
    keys:[
    {
        pubkey:senderKeypair.publicKey,
        isSigner:true,
        isWritable:false
    },
    {
        pubkey:account_keypair.publicKey,
        isSigner:false,
        isWritable:true
    },
    {
        pubkey:SystemProgram.programId,
        isSigner:false,
        isWritable:false
    }
    ],
    data:instructionData,
    // we cannot send the transaction to the SystemProgram it is created keeping in mind the intention such as creating account and transfering
    //hence this will result in some error
    programId:SystemProgram.programId
})

// create the transaction
const transaction=new Transaction()
transaction.add(instruction);

async function main(){
    try {
        const transactionId = await sendAndConfirmTransaction(
          connection,
          transaction,
          [senderKeypair],
        );
        const explorerLink = getExplorerLink("transaction", transactionId, "devnet");
        console.log(`Transaction submitted: ${explorerLink}`);
      } catch (error) {
        console.log(error)
      }
}
 main()