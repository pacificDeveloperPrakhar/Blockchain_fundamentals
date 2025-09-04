"use client"
import Image from "next/image";
import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import Keys from "@/components/ui/childKeys"
import { generateKey } from "crypto";
import { derivePath } from "ed25519-hd-key";
interface field_state{
  isLoading:boolean,
  value:string
}
interface field_state_memonics{
  isLoading:boolean,
  value:string,
  length:number
}

// this interface will be used to structure the field of the accounts data of a particular
// coin
interface field_state_accounts
{
  publicKey:string,
  privateKey:string
}

export default function Home() {
  const [seed,setSeed]=useState<field_state>({
    isLoading:false,
    value:""
  })

  // for each type of coin there do be a seperate array of accounts
  const [etherium_keys,set_etherium_keys]=useState<field_state_accounts[]|[]>([]);

//  ===============fetching the keys===================================================================
  async function fetchKeys(type: number, keysLength: number, seed: string,account_type:number) {
    try {
      const account_no = keysLength;
      // Construct BIP-44 derivation path dynamically
      const derivePath = `m/44'/${type}'/${account_no}'/${account_type}/0`;
  
      const response = await axios.post("/bip44seed", {
        type,
        seed,
        derivePath,
      });
  
      // The backend should return the new key pair
      return response.data; // { privateKey, publicKey }
    } catch (err) {
      console.error("Error fetching keys:", err);
      return null;
    }
  }

  const [final_seed,setFinalSeed]=useState<field_state>({
    isLoading:false,
    value:""
  })
  const [memonics,setMemonics]=useState<field_state_memonics>({
    isLoading:false,
    value:"",
    length:0
  })
  const [passphrase,setPassphrase]=useState("")
  const [bip32seed,setbip32Seed]=useState<field_state>({
    isLoading:false,
    value:""
  })
  // state for the child enration of the key value pair or the blockchain crypto
  const [childkp,setChildkp]=useState({
    isLoading:false,
    publicKey:"",
    privateKey:""
  })
  async function set256bit_seed(){
    setSeed({
      isLoading:false,
      value:(await axios.get("/random_256")).data.seed
    })
  }
 async function get_memonics_and_set(value:string){
   const response=await axios.post("/memonics_bip39",{
    seed:value
   })
   const memonics=response.data.memonics
   const length=response.data.length
   setMemonics({
    isLoading:false,
    length,
    value:memonics
   })
 }
 async function get_memonic_seed(memonics:string,passphrase:string){
   const response=await axios.post("/seed_pbkdf2",{memonics,passphrase})
   console.log(response)
   setFinalSeed({
    isLoading:false,
    value:response.data.seed
   })
 }
 

 async function set_bip32seed(){
     const response=await axios.post("/bip32seed",{seed:final_seed.value})
   
   setbip32Seed({
    isLoading:false,
    value:response.data.bip32seed
   })
 }

//  we will now be genrating the key value pair for the child derivation path
async function genKeyValuePair(){
  const response=axios.post("/bip44seed",{seed:bip32seed.value})
  setChildkp({
    ...childkp,
    isLoading:false
  })
}
 return (
  <div className="overflow-x-hidden bg-gradient-to-br from-purple-500 to-orange-500 p-6">
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Seed Generator</h1>
        <Button
          onClick={async () => {
            set256bit_seed();
            setSeed({ ...seed, isLoading: true });
          }}
          className="rounded-xl px-4 py-2 bg-gradient-to-r from-purple-500 to-orange-500 text-white"
        >
          Generate
        </Button>
      </div>

      {/* Seed Input */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-700">Seed</label>
        <Input
          type="text"
          placeholder="Enter or generate a 256-bit seed"
          onChange={(e) => setSeed({ ...seed, value: e.target.value })}
          value={seed.value}
          className="w-full"
        />
        {seed.isLoading && <p className="text-sm text-purple-600">Loading...</p>}
      </div>

      {/* Mnemonics */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">Generate Mnemonics</h2>
          <Button
            onClick={() => {
              get_memonics_and_set(seed.value);
              setMemonics({ ...memonics, isLoading: true });
            }}
            className="rounded-xl px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Generate
          </Button>
        </div>
        <Input
          type="text"
          placeholder="Input or generate mnemonic words"
          value={memonics.value}
          onChange={(e) => setMemonics({ ...memonics, value: e.target.value })}
          className="w-full"
        />
        {memonics.isLoading && (
          <p className="text-sm text-orange-500">Generating mnemonics...</p>
        )}
      </div>

      {/* Passphrase */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-700">Passphrase</label>
        <Input
          placeholder="Enter passphrase (optional)"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Final Seed */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => {
            setFinalSeed({
              ...seed,
              isLoading: true,
            });
            get_memonic_seed(memonics.value, passphrase);
          }}
          className="rounded-xl px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white"
        >
          Generate Final Seed
        </Button>
        {!final_seed.isLoading && final_seed.value && (
          <h3 className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-md">
            {final_seed.value}
          </h3>
        )}
      </div>

      {/* BIP32 Section */}
      <div className="pt-6">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">
          BIP32 Seed Generation 
        </h1>
        <div className="flex justify-between">
          <Button type="button" onClick={()=>{
            set_bip32seed()
            setbip32Seed({
              ...bip32seed,
              isLoading:true
            })
            
          }}>generate</Button>
          <h1>{bip32seed.value}</h1>
        </div>
        {/* now we will be genrating the bip44 child key vlaue pairs */}
        <Button onClick={()=>{
          genKeyValuePair()
          setChildkp({
            ...childkp,
            isLoading:true
          })
        }}>Generate</Button>
      </div>

    {/* ========================================================================================================= */}
    {/* etherium child keys generation */}

   <Keys keys={etherium_keys} setKeys={set_etherium_keys} fetchKeys={fetchKeys} type={60} account_type={0} seed={final_seed.value} coin_type="Etherium"/>
   <Keys keys={etherium_keys} setKeys={set_etherium_keys} fetchKeys={fetchKeys} type={501} account_type={0} seed={final_seed.value} coin_type="Solana"/>
    </div>
  </div>
);

}

