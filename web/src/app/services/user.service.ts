import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public users: BehaviorSubject<User[] | undefined>;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseurl: string) {
        if (environment.production) {
            this.users = new BehaviorSubject<User[] | undefined>([])
            this.updateAll().then(() => {/* We do nothing */ });
        }
        else {
            // use for local development
            this.users = new BehaviorSubject<User[] | undefined>([new User("Michael", 2), new User("Lars", 13), new User("Jonas", 2), new User("Johan", 40), new User("Leah", 15), new User("Nana", 10), new User("Kaj", 32), new User("Klinge", 5), new User("Oliver", 1), new User("Tove", 0)].sort(compare));
        }
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
            const u = this.users.value?.find(u => u.name === user.name)
            if (u) {
                u.lines = user.lines;
                return { status: true, lines: res.lines };
            }
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


function compare(a: User | undefined, b: User | undefined): number {
    return (a!.name! < b!.name! ? -1 : 1);
}
