import express from "express";
import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
const app = express();


app.get("/", (req, res) => {
    res.send("Hello There")
})

app.get("/secret", async (_, res) => {
    const secret_name = "testenvs";

    const client = new SecretsManagerClient({
        region: "eu-north-1",
    });

    let response;

    try {
    response = await client.send(
        new GetSecretValueCommand({
            SecretId: secret_name,
        })
    );
    } catch (error) {
        throw error;
    }

    const secret = response.SecretString;

    return res.send("Your secret is : ". secret);
})


app.listen(9000, () => {
    console.log("Server running !");   
})

