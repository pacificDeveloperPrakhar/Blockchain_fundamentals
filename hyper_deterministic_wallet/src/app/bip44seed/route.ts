import {NextRequest,NextResponse} from "next/server"
import {derivePath} from "ed25519-hd-key"
export async function POST(req:NextRequest,res:NextResponse){
 const response=await req.json()
 const {seed}=response
const path = "m/44'/501'/1'/0'"

const keypair=new Uint8Array(derivePath(path,seed).key)

 console.log(keypair)
 return NextResponse.json({
    bip44:"aaaaaaaa"
 },{status:200})
}