import crypto from "crypto"

let base="prakhar"
let counter=0;
// first we change the nonce
while(true){
 const output=crypto.createHash("sha256").update(base+counter).digest("hex")
 if(output.startsWith("0000"))
 {
     console.log("input: ",base+counter)
     console.log("output: ",output)
     process.exit(0)
 }
 counter++;
}
// this is what called running Proof Of Work
