// pages/api/hello.ts
import { NextResponse } from "next/server"
import type { NextApiRequest  } from 'next'
import { toHex } from "@/utils/utils"

type ResponseData = {
  message: string
}

export const GET= function (
  req: NextApiRequest,

) {
  // first create a unint 8 array of 256/8 32 bytes esch so 32 random values
  const bytes=new Uint8Array(32)
  for(let i=0;i<bytes.length;i++)
    {
      bytes[i]=Math.floor(Math.random()*1000)
    }
    console.log(bytes)
// now convert this back to hex and send it back
  return NextResponse.json({ seed:toHex(bytes) }, { status: 200 })
}

