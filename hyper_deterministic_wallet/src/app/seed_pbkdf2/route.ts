import crypto from "crypto"
import {NextRequest,NextResponse} from "next/server"
import {toHex} from "@/utils/utils"


export const POST=async function(req:NextRequest,res:NextResponse){
  const {memonics,passphrase}=await req.json()
  
  const bytes=new Uint8Array(crypto.pbkdf2Sync(
    Buffer.from(memonics,"utf-8"),
    Buffer.from(memonics+passphrase,"utf-8"),
    2048,
    64,
    "sha512"
  ))

  const seed=toHex(bytes)

return NextResponse.json({
    seed:seed
},{status:200})
}