import { db } from "../db";

export async function getStatus(): Promise<Status> {
    const res = await db.collection("status").doc("singleton").get();
    const data = res.data();
    return { status: data?.status }
}

export async function updateStatus(status: Status): Promise<Status> {
    await db.collection("status").doc("singleton").update({ "status": status.status });
    return status;
}

export class Status {
    status?: "up" | "unavailable";
}