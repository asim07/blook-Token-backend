const solanaWeb3 = require("@solana/web3.js");

let secratekey = Uint8Array.from([
  230, 243, 15, 141, 184, 119, 136, 31, 192, 143, 155, 222, 14, 210, 163, 50,
  205, 200, 16, 106, 59, 221, 180, 3, 108, 194, 62, 255, 9, 161, 199, 87, 209,
  165, 58, 40, 184, 46, 227, 105, 197, 253, 47, 161, 64, 33, 69, 103, 96, 75,
  217, 252, 161, 125, 141, 113, 184, 152, 85, 159, 75, 147, 231, 115,
]);

let keypair = solanaWeb3.Keypair.fromSecretKey(secratekey);
// console.log(keypair);
let fromKeypair = secratekey.publicKey;
let toKeypair = "ECE3cn9feo365mBaZe5feseDWUjAACJu7ru9H27g29f2";
let transaction = new solanaWeb3.Transaction();

transaction.add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: fromKeypair,
      toPubkey: toKeypair,
      lamports: solanaWeb3.LAMPORTS_PER_SOL
    })
  );
  let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'));

 const trans = async() => {
    await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair]
      );
      console.log("it works");
    
  }
 trans();