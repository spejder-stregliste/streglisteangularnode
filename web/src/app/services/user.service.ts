import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public users: WritableSignal<User[]>;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseurl: string) {
        if (environment.production || environment.useApi) {
            this.users = signal([])
            this.updateAll().then(() => {/* We do nothing */ });
        }
        else {
            // use for local development
            this.users = signal([new User("Michael", 2), new User("Lars", 13), new User("Jonas", 2), new User("Johan", 40), new User("Leah", 15), new User("Nana", 10), new User("Kaj", 32), new User("Klinge", 5), new User("Oliver", 1), new User("Tove", 0)].sort(compare));
        }
    }

    async updateAll(): Promise<boolean> {
        const res = await lastValueFrom(this.http.get<User[]>(this.baseurl + 'user'), { defaultValue: undefined });
        if (res) {
            this.users.set(res);
            return true;
        }
        this.users.set([]);
        return false;
    }

    async updateUser(user: User): Promise<{ status: boolean, lines: number | undefined }> {
        user.lines = parseInt(user.lines?.toString() || "0");
        const res = await lastValueFrom(this.http.put<User>(this.baseurl + 'user', user), { defaultValue: undefined });
        let lines = undefined
        if (res) {
            
            this.users.update(users => {
                const u = users.find(u => u.name === user.name)
                if (u) {
                    lines = user.lines
                    u.lines = user.lines;
                }
                return users
            })
            return { status: true, lines };
        }
        this.users.set([]);
        return { status: false, lines };
    }

    async addUser(user: User): Promise<boolean> {
        user.lines = parseInt(user.lines?.toString() || "0");
        const res = await lastValueFrom(this.http.post<User>(this.baseurl + 'user', user), { defaultValue: undefined });
        if (res) {
            return await this.updateAll();
        }
        return false;
    }

    async deleteUser(user: User): Promise<boolean> {
        const res = await lastValueFrom(this.http.delete<User>(this.baseurl + `user/${user.name}`), { defaultValue: undefined });
        if (res) {
            return await this.updateAll();
        }
        return false
    }

    increment(user: User) {
        this.users.update(users => {
            const u = users.find(u => u.name === user.name)
            if (u) {
                u.lines = (user.lines ?? 0) + 1;
            }
            return users
        })
    }

    decrement(user: User) {
        this.users.update(users => {
            const u = users.find(u => u.name === user.name)
            if (u) {
                u.lines = (user.lines ?? 0) - 1;
            }
            return users
        })
    }
}

export class User {
    name: string | undefined;
    lines: number | undefined;

    constructor(name: string, lines: number) {
        this.name = name;
        this.lines = lines;
    }
}


function compare(a: User | undefined, b: User | undefined): number {
    return (a!.name! < b!.name! ? -1 : 1);
}
