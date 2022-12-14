import { ethers } from "ethers";
import { writeFileSync } from "fs-extra";
import "dotenv/config";


async function main () {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!)
    const encryptedJsonKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD!, process.env.PRIVATE_KEY!)
    writeFileSync("./.encryptedKey.json", encryptedJsonKey)
}


main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  }); 