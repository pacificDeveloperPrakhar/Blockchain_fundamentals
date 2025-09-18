use anchor_lang::prelude::*;

declare_id!("9wqYAtp7CKVkfdZzj7CR4Yy4s6BZSLcDaycFU3pwg8Bb");

#[program]
pub mod my_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
