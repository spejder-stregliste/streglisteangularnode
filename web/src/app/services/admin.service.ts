import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    public autherized: BehaviorSubject<boolean>;

    constructor(private http: HttpClient,
        @Inject('BASE_URL') private baseurl: string) {
        if (environment.production) {
            this.autherized = new BehaviorSubject(false);
        } else {
            // use for local development
            this.autherized = new BehaviorSubject(true);
        }
    }

    async autherize(secret: Secret): Promise<boolean> {
        const res = await lastValueFrom(this.http.post<AuthResponse>(this.baseurl + 'auth', secret), { defaultValue: undefined });
        if (res) {
            if (res?.status === "ok") {
                this.autherized.next(true);
                return true
            }
            if (res?.status === "failed") {
                this.autherized.next(false);
                return true
            }
        }
        return false;
    }
}

export class AuthResponse {
    status: "failed" | "ok" | undefined
}

export class Secret {
    secret: string | undefined;
}