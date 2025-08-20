// app/api/hello/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {toBin,toNumber11bit,hexToBytes} from "@/utils/utils"
import fs from "fs"

// POST
export async function POST(req: NextRequest) {
const {seed}=await req.json()
const bytes=(hexToBytes(seed))
//1 step:now get the checksum
const hashed_entropy=new Uint8Array(crypto.createHash('sha256').update(bytes).digest())
// conver the hashed entropy to binary form as well
const hashed_entropy_bin=toBin(hashed_entropy)
// convert the entropy to binary string form
const entropy_bin=toBin(bytes)
const checksum=hashed_entropy_bin.substring(0,entropy_bin.length/32)
// get this checksum bits
// append them to the netropy binary
let result=entropy_bin+checksum
// now convert the result to 11 bit number array
const number11bit=toNumber11bit(result)
// now readng the bip39 all memonics and converting that to indexed array
const text = fs.readFileSync(
  "C:/Users/admin/Desktop/devs/hyper_deterministic_wallet/src/app/memonics_bip39/bip39_english.txt",
  "utf8"
);

const words = text.trim().split("\n").map(w => w.trim());
const memonics: string[] = [];
for (let i = 0; i < number11bit.length; i++) {
  memonics.push(words[number11bit[i]]);
}

return NextResponse.json({
  length:memonics.length,
  memonics:memonics.join(" ")
},{status:200})
}



// utiltity functions

