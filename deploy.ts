import { ethers, Wallet } from "ethers";
import { readFileSync } from "fs-extra";
import "dotenv/config";

async function main() {
  const provider = new ethers.providers.JsonRpcBatchProvider(
    process.env.RPC_URL
  );
  // const encryptedJson = readFileSync("./.encryptedKey.json", "utf8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD!
  // );

  // wallet = await wallet.connect(provider)
    const wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY!,
      provider
    );
  const abi = readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const bin = readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(currentFavoriteNumber);
  const txResponse = await contract.store("7");
  const txReciept = await txResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(updatedFavoriteNumber.toString());
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
