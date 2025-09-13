pub mod pda;
fn main() {
    println!("Hello, world!");
    use crate::pda::gen_pda_with_bump;
    use anyhow;
   match gen_pda_with_bump(b"this is the seed","11111111111111111111111111111111")
   {
    anyhow::Result::Ok(x)=>println!("{:?}",x),
    anyhow::Result::Err(err)=>todo!()
   };
}
