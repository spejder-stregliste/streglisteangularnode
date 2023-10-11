import { db } from "../db";

export async function getUsers(): Promise<User[]> {
    const res = await db.collection("users").get();
    return res.docs.map(doc => {
        const data = doc.data();
        return { name: data.navn, lines: data.streger }
    })
}

export async function updateUser(user: User): Promise<User> {
    await db.collection("users").doc(user.name!).update({ "streger": user.lines });
    return user;
}

export async function creatUser(user: User): Promise<User> {
    await db.collection("users").doc(user.name!).set({"navn":user.name, "streger": user.lines});
    return user;
}

export class User {
    name?: string;
    lines?: number;
}