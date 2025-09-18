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
            console.log(`raw data is ${accountInfo.data}`);
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

main();