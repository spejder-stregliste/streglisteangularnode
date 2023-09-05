import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public users: BehaviorSubject<User[] | undefined>;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseurl: string) {
        this.users = new BehaviorSubject<User[] | undefined>([])
        this.updateAll().then(() => {/* We do nothing */});

        // use for local development
        /*this.users = new BehaviorSubject<User[] | undefined>([new User("jonas", 2), new User("Johan", 40), new User("jonas", 2), new User("Johan", 10), new User("jonas", 2), new User("Johan", 10), new User("jonas", 2), new User("Johan", 10), new User("jonas", 2), new User("Johan", 10)]);/**/
    }

    async updateAll(): Promise<boolean> {
        const res = await lastValueFrom(this.http.get<User[]>(this.baseurl + 'user'), { defaultValue: undefined });
        if (res) {
            this.users.next(res);
            return true;
        }
        this.users.next(undefined);
        return false;
    }

    async updateUser(user: User): Promise<{ status: boolean, lines?: number | undefined }> {
        user.lines = parseInt(user.lines?.toString() || "0");
        const res = await lastValueFrom(this.http.put<User>(this.baseurl + 'user', user), { defaultValue: undefined });
        if (res) {
            const updated = this.users.value?.map(u => {
                if (u.name === user.name) {
                    u.lines = user.lines
                }
                return u
            });
            this.users.next(updated);
            return { status: true, lines: res.lines };
        }
        this.users.next(undefined);
        return { status: false };
    }

    async addUser(user: User): Promise<boolean> {
        user.lines = parseInt(user.lines?.toString() || "0");
        const res = await lastValueFrom(this.http.post<User>(this.baseurl + 'user', user), { defaultValue: undefined });
        if (res) {
            return await this.updateAll();
        }
        return false;
    }
}

export class User {
    name: string | undefined;
    lines: number | undefined;
    editing: boolean = false;

    constructor(name: string, lines: number) {
        this.name = name;
        this.lines = lines;
    }
}
