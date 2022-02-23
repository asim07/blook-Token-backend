const  { createMint , getMint ,getOrCreateAssociatedTokenAccount,getAccount,mintTo,transfer,burn} = require('@solana/spl-token');
const { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL ,PublicKey} =  require('@solana/web3.js');
const base58 = require('bs58');

const payer = Keypair.fromSecretKey(base58.decode("5cozvavrV7t9SyNnfbdsAVHJFHr9KUt6xgPzejMfLsXWqGY9DAH3Eh9qjVp847vfKw2MkiwYxnGzRKkw6yd8FcgJ"))
const mintAuthority = payer
const freezeAuthority = payer

//connection with solana
const connection = new Connection(
  clusterApiUrl('testnet'),
  'confirmed'
);

//token address
const mint = new PublicKey("23PfyriUFSzgvuFNu4N6ZVZuWxcpmP6xgsQisLx5M7T2");
const tokenAccount = new PublicKey("7afY39hBCH3tMbea7wrPjzWeYiLQRb2JuBSD9NqKeZe2");
const recieverAccount = new PublicKey("C18Ge5g6oeCZHJEJ1VL6AoKhZQpVV5CE8scVELTyqZxt")
//Create Token
const CreateToken = async ()=> {
    const mint = await createMint(
        connection,
        payer,
        mintAuthority.publicKey,
        freezeAuthority.publicKey,
        9 // We are using 9 to match the CLI decimal default exactly
      );
      console.log(mint.toBase58());      // CUA9XgyvtnhDWvjNEvGxZVFL34zH3etLWzSpj3QVhLHd
}

//get Token Supply
const TokenSupply = async () => {
    const mint = new PublicKey("23PfyriUFSzgvuFNu4N6ZVZuWxcpmP6xgsQisLx5M7T2");
    // console.log("Mint result : ",mint)
    const mintInfo = await getMint(
        connection,
        mint
      )      
      console.log(mintInfo.supply)
    
}

//create Associated account
const CreateAssociatedAccount = async (connection,payer,mint) => {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        payer.publicKey
      )
      console.log(tokenAccount.mint.toBase58());
      console.log(tokenAccount.owner.toBase58());
      console.log(tokenAccount.address.toBase58());
}
//Get Account Info
const GetAccountInfo = async (connection,tokenAccount) => {
  const tokenAccountInfo = await getAccount(
    connection,
    tokenAccount
  )
  
  console.log(tokenAccountInfo.amount);
}

//mint_Tokens
const mintTokens = async (connection, payer,mint,tokenAccount) => {
  await mintTo(
    connection,
    payer,
    mint,
    tokenAccount,
    payer.publicKey,
    100e9
  )
}

//send Tokens to Other address
const transferTokens = async (connection,payer,tokenAccount,recieverAccount) => {
  const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mint,recieverAccount);
  signature = await transfer(
    connection,
    payer,
    tokenAccount,
    toTokenAccount.address,
    payer.publicKey,
    50e9,
);
}

//mint and distribute to different people


const BurnTokens = async (connection,payer,tokenAccount,mint,amount = 1e9) => {
 result = await burn(connection,
  payer,
  tokenAccount,
  mint,
  payer.publicKey,
  amount)
  console.log("result : ",result);
}

// CreateAssociatedAccount(connection,payer,mint);
// console.log(tokenAccount.address);
// GetAccountInfo(connection,tokenAccount);
// mintTokens(connection, payer, mint , tokenAccount);
// transferTokens(connection,payer,tokenAccount,recieverAccount);
// BurnTokens(connection,payer,tokenAccount,mint,1e9);
