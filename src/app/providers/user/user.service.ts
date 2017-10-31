import { Inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';


@Injectable()
export class UserService {

    get getToken() { return this.http.getToken; }
    get hasToken(): boolean { return this.http.hasToken; }
    get hasTokenFake(): boolean { return true; }
    get getTokenInfo() { return this.http.getTokenInfo; }

    constructor(
        private http: HttpClientService,
        @Inject('APIConfig') private APIConfig
    ) {}
}
