import { db } from "../db";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

export async function createJWS(): Promise<JwsResponse> {
    const secret = await fetchJwsSecret()
    if (secret === undefined) return { status: "failed" }

    const payload = { user: "admin" };
    const options: SignOptions = { expiresIn: 300, algorithm: "RS256" }; // expire in 5 minutes
    const token = jwt.sign(payload, secret, options);

    return { status: "ok", jwsToken: token }
}

export async function verifyJWS(token: string): Promise<JwsResponse> {
    const secret = await fetchJwsSecret()
    if (secret === undefined) return { status: "failed" }

    const options: VerifyOptions = { algorithms: ["RS256"] };
    try {
        jwt.verify(token, secret, options)
        return {status: "ok"}
    }
    catch {
        return {status: "failed"}
    }
}

export type JwsResponse = {
    status: "ok" | "failed"
    jwsToken?: string
}

async function fetchJwsSecret(): Promise<string | undefined> {
    const res = await db.collection("admin").doc("auth").get();
    const data = res.data();

    if (data?.jwsSecret === undefined || data?.jwsSecret === null || data?.jwsSecret === "") {
        return undefined
    }

    return data?.jwsSecret
}