import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    public autherized: WritableSignal<boolean>;

    constructor(private http: HttpClient,
        @Inject('BASE_URL') private baseurl: string) {
        if (environment.production || environment.useApi) {
            this.autherized = signal(false);
        } else {
            // use for local development
            this.autherized = signal(true);
        }
    }

    async autherize(secret: Secret): Promise<boolean> {
        const res = await lastValueFrom(this.http.post<AuthResponse>(this.baseurl + 'auth', secret), { defaultValue: undefined });
        switch (res?.status) {
            case "ok": {
                this.autherized.set(true);
                return true
            }
            case "failed": {
                this.autherized.set(false);
                return true
            }
            default: {
                return false;
            }
        }
    }
}

export class AuthResponse {
    status: "failed" | "ok" | undefined
}

export class Secret {
    secret: string | undefined;
}