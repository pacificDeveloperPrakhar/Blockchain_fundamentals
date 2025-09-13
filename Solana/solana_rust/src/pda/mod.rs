use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;
use anyhow;
pub fn get_pda() -> Result<(), Box<dyn std::error::Error>> {
    let program_address = Pubkey::from_str("11111111111111111111111111111111")?;
    let seeds: &[&[u8]] = &[b"helloWorld goriboebov"];
    let (pda, bump) = Pubkey::find_program_address(seeds, &program_address);

    println!("PDA: {}", pda);
    println!("Bump: {}", bump);

    Ok(())
}

// get the pda with canonical bump
pub fn get_pda_with_bump()->Result<(),Box<dyn std::error::Error>>
{
    let seed:&[u8]=b"this is the seed";
    let programId=Pubkey::from_str("11111111111111111111111111111111")?;
    let bump=253;
    if let Ok(x) = Pubkey::create_program_address(&[seed, &[bump]], &programId) {
        println!("Derived PDA: {}", x);
    } else {
        println!("Failed to create PDA");
    }
return Ok(());
}

#[derive(Debug)]
pub struct Pda_result{
  pub address:Pubkey,
  pub bump:u8
}
//custom pda generation with the create_program_address
pub fn gen_pda_with_bump(seed:&[u8],program_address:&str)->anyhow::Result<Pda_result>
{
    let programId=match Pubkey::from_str(program_address)
    {
        Ok(x)=>x,
        Err(err)=>return anyhow::Result::Err(err.into())
    };
    
    // now use this program and the bump to genrate the pda along with the bump
    for i in 0..=255
    {
        let bump:u8=255-i;
        if let Ok(x)=Pubkey::create_program_address(&[&seed,&[bump]],&programId)
        {
            return anyhow::Result::Ok(Pda_result{
             address:x,
             bump:255-i
            })
        };
        println!("failed to generate the pda at {}",255-i);
    }
    return anyhow::Result::Err(anyhow::anyhow!("unable to generate the pda"))
}