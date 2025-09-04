import {NextRequest,NextResponse} from "next/server"
import {derivePath} from "ed25519-hd-key"
import {HDNodeWallet} from "ethers"
export async function POST(req:NextRequest,res:NextResponse){
   const {type,seed,derivePath}=await req.json();
   switch(type)
   {
      case 501:
         break;
      case 60:
      console.log(seed)
      const wallet=HDNodeWallet.fromSeed(Buffer.from(seed, "hex"));
      console.log(derivePath);
      const child = wallet.derivePath(derivePath);
      return NextResponse.json({
         privateKey:child.privateKey,
         publicKey:child.publicKey
      },
      {
         status:200
      }
   )
         break;
      case "bitcoin":
         break;
   }
}