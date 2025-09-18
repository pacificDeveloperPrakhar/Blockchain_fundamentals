import * as borsh from "@coral-xyz/borsh";


const favouriteSchema=borsh.struct([
    borsh.str("favourite_color")
])


// now fetch the data first
import {PublicKey,Connection,clusterApiUrl} from "@solana/web3.js"

const connection=new Connection(clusterApiUrl("devnet"));
const pdaAddress=new PublicKey("9c6fNuQ9M3qeAaUtPH4bw6FBgfX3Rtvq4NNFUe6jm5xE");

async function main()
{
    try
    {

        const accountInfo=await connection.getAccountInfo(pdaAddress);
        if(accountInfo)
        {
            // exclude the discriminator from the buffer data
            const data=accountInfo.data.slice(8);
            // now deserialize the true data remaining
            const decoded=favouriteSchema.decode(data);
            console.log(`raw data is ${decoded.favourite_color}`);
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

main();