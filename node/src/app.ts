import { R2Storage } from "./lib/r2";
import dotenv from 'dotenv';



(async () => {
    dotenv.config();

    const client = new R2Storage(
        process.env.ACCOUNT_ID ?? "",
        process.env.ACCESS_KEY_ID ?? "",
        process.env.SECRET_ACCESS_KEY ?? ""
    );

    const upload = await client.uploadDirectory("reports", "test");
    console.log(upload);


})();