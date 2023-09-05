import { db } from "../db";

export async function autherize(secret: Secret): Promise<AuthResponse> {
    const res = await db.collection("admin").doc("auth").get();
    const data = res.data();
    return {status: secret.secret === data?.secret ? "ok" : "failed"};
}

export class AuthResponse {
    status: "failed" | "ok" | undefined
}

export class Secret {
    secret: string | undefined;
}