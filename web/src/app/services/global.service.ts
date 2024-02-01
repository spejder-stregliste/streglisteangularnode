import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public status: BehaviorSubject<Status | undefined>;

    constructor(private http: HttpClient,
        @Inject('BASE_URL') private baseurl: string) {
        if (environment.production) {
            this.status = new BehaviorSubject<Status | undefined>({ status: "loading" });
            this.getStatus().then(() => {/* We do nothing */ });
        } else {
            // use for local development
            this.status = new BehaviorSubject<Status | undefined>({ status: "up" })
        }
    }

    async getStatus(): Promise<boolean> {
        const res = await lastValueFrom(this.http.get<Status>(this.baseurl + 'status'), { defaultValue: undefined });
        if (res) {
            this.status.next(res);
            return true;
        }
        return false;
    }

    async updateStatus(status: Status): Promise<boolean> {
        const res = await lastValueFrom(this.http.put<Status>(this.baseurl + 'status', status), { defaultValue: undefined });
        if (res) {
            this.status.next(res);
            return true;
        }
        return false;
    }
}

export class Status {
    status: "up" | "unavailable" | "loading" | undefined;
}