import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public users: Observable<User[]>;

    constructor(private http: HttpClient,
        @Inject('BASE_URL') private baseurl: string) {
        this.users = this.http.get<User[]>(this.baseurl + 'user');

        /* use for local development */
        /*this.users = new Observable(s => {
            s.next([new User("jonas", 2), new User("Johan", 40), new User("jonas", 2), new User("Johan", 10), new User("jonas", 2), new User("Johan", 10), new User("jonas", 2), new User("Johan", 10), new User("jonas", 2), new User("Johan", 10)]);
        });/**/
    }

    async updateAll(): Promise<User[] | undefined> {
        return this.http.get<User[]>(this.baseurl + 'user').toPromise();
    }

    async updateUser(user: User): Promise<User | undefined> {
        user.lines = parseInt(user.lines?.toString() || "0");
        return this.http.put<User>(this.baseurl + 'user', user).toPromise();
    }

    async addUser(user: User): Promise<User | undefined> {
        user.lines = parseInt(user.lines?.toString() || "0");
        return this.http.post<User>(this.baseurl + 'user', user).toPromise();
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
