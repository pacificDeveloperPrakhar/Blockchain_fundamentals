import crypto from "crypto"
import {NextResponse,NextRequest} from "next/server"
import {hexToBytes,toHex} from "@/utils/utils"
export const POST=async function(req:NextRequest,res:NextResponse)
{
    const response=await req.json()
    const {seed}=response
    // convert the hex to bytes
    const bytes:Uint8Array=hexToBytes(seed)
    // we have the uin8 array of the bip32 seed
    const bip32bytes:Uint8Array=new Uint8Array(crypto.createHmac("sha512","Bitcoin seed").update(bytes).digest())
    // ===============extracting the master private key and the master chain code===========================
    const IL = bip32bytes.slice(0, 32); // master private key
    const IR = bip32bytes.slice(32);    // master chain code
    return NextResponse.json({
        bip32seed:toHex(bip32bytes),
        IL:toHex(IL),
        IR:toHex(IR)
    },{
        status:200
    })
}