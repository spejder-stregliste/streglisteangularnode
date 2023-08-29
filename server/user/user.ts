import { Firestore } from "@google-cloud/firestore";

export async function getUsers(): Promise<User[]> {
    const db = new Firestore({ projectId: "sukkeregern-stregliste-277311" });
    const res = await db.collection("users").get();
    return res.docs.map(doc => {
        const data = doc.data();
        return { Name: data.navn, Lines: data.streger }
    })
}

export async function updateUser(user: User): Promise<User> {
    const db = new Firestore({ projectId: "sukkeregern-stregliste-277311" });
    await db.collection("users").doc(user.Name!).update({ "streger": user.Lines });
    return user;
}

export async function creatUser(user: User): Promise<User> {
    const db = new Firestore({ projectId: "sukkeregern-stregliste-277311" });
    await db.collection("users").doc(user.Name!).set(user);
    return user;
}

export class User {
    Name?: string;
    Lines?: number;
}