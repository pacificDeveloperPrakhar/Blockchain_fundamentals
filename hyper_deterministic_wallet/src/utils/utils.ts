// to binary string conversion
export function toBin(uint8:Uint8Array){
    let bitsString=""
    for(let i=0;i<uint8.length;i++)
    {
     bitsString=bitsString+uint8[i].toString(2).padStart(8,"0")
    }
    console.log(bitsString.length)
    return bitsString
   }
   // from hex to bytes conversion
 export   function hexToBytes(hex:string) {
     if (hex.length % 2 !== 0) {
       throw new Error("Invalid hex string");
     }
     const bytes = new Uint8Array(hex.length / 2);
     for (let i = 0; i < hex.length; i += 2) {
       bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
     }
     return bytes;
   }
   //convert the binary to bytes
 export    function binToBytes(bin:string):Uint8Array{
     if(bin.length%11!==0)
       throw new Error("bits length should be multiple of 8 ")
     const bytes=new Uint8Array(bin.length/8)
     for(let i=0;i<bin.length;i+=8)
     {
       bytes[i/8]=parseInt(bin.substring(i,8+i),2)
     }
     return bytes
   }
   
   //convert the bin to 11 bits number
   // for that we do be using the 16bit array 
export    function toNumber11bit(bin:string):Uint16Array{
     const data=new Uint16Array(bin.length/11)
     for(let i=0;i<bin.length;i+=11)
     {
       data[i/11]=parseInt(bin.substring(i,11+i),2)
     }
     return data
   }

export function toHex(uint8: Uint8Array): string {
    return Array.from(uint8)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  }