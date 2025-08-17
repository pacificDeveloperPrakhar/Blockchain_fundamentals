import crypto from "crypto"

let base="harkirat => Raman | Rs 100"
let counter=0;
// first we change the nonce
while(true){
 const output=crypto.createHash("sha256").update(base+counter).digest("hex")
 if(output.startsWith("00000"))
 {
     console.log("input: ",base+counter)
     console.log("output: ",output)
     console.log("nonce for the input is: ",counter)
     process.exit(0)
 }
 counter++;
}
// this is what called running Proof Of Work
