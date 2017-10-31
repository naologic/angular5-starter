import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isArray, isPlainObject } from 'lodash';
import { UserInterface } from '../../interfaces/user.interface';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { JsonLocalStorage } from './token.decorator';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';

export interface HttpOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}

@Injectable()
export class HttpClientService extends HttpClient {
    @JsonLocalStorage
    private token: UserInterface.Token;
    @JsonLocalStorage
    private tokenInfo: UserInterface.TokenInfo;

    get getTokenInfo(): UserInterface.TokenInfo { return this.tokenInfo; }
    get hasToken(): boolean { return this.tokenInfo.hasToken; }
    get getToken(): UserInterface.Token { return this.token; }

    constructor(
        handler: HttpHandler,
        @Inject('APIConfig') private APIConfig
    ) {
        super(handler);
    }

    /**    --------------------------------
     *          Standard HTTP requests
     *     --------------------------------
     */
    public getJson<T>(uri: string): Observable<T> {
        return super.get<T>(this.getUrl(uri), <HttpOptions>this.getOptions());
    }

    public postJSON<T>(uri: string, data: Object): Observable<T> {
        return super.post<T>(this.getUrl(uri), data, <HttpOptions>this.getOptions());
    }

    public putJson<T>(uri: string, data: Object): Observable<T> {
        return super.put<T>(this.getUrl(uri), data, <HttpOptions>this.getOptions());
    }

    public patchJson<T>(uri: string, data: any): Observable<T> {
        return super.patch<T>(this.getUrl(uri), data, <HttpOptions>this.getOptions());
    }

    public headJson<T>(uri: string): Observable<T> {
        return super.head<T>(this.getUrl(uri), <HttpOptions>this.getOptions());
    }

    public deleteJson<T>(uri: string): Observable<T> {
        return super.delete<T>(this.getUrl(uri), <HttpOptions>this.getOptions());
    }

    public optionsJson<T>(uri: string): Observable<T> {
        return super.options<T>(this.getUrl(uri), <HttpOptions>this.getOptions());
    }

    /**    --------------------------------
     *          Custom HTTP requests
     *     --------------------------------
     */

    /**
     * Submit the token form and recover the auth
     *
     * @param {UserInterface.Login} data
     * @returns {Observable<UserInterface.User>}
     */
    public login(data: UserInterface.Login): Observable<UserInterface.Token> {
        // -->Set: headers
        let params = new HttpParams();
            params = params.append('username', data.username);
            params = params.append('password', data.password);

        let headers = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const options = {
            headers: headers,
            params: {},
            observe: 'body',
            reportProgress: true,
            responseType: 'json',
            withCredentials: true,
        };

        return super.post<UserInterface.Token>(
            this.APIConfig.AUTH_API,
            params,
            <HttpOptions>options
        )
        .map(token => {
            // -->Set: token
            this.token = token;

            // -->Is: ok?
            this.tokenInfo = {
                hasToken: true
            };

            // -->Return: token
            return token;
        });
    }

    /**
     * Prepare request url
     *
     * @param {string} uri
     * @returns {string}
     */
    private getUrl(uri: string): string {
        return this.APIConfig.API + uri;
    }

    /**
     * Get the HTTP options for the requests
     *
     * @returns {HttpOptions}
     */
    private getOptions(data?) {
        let headers = new HttpHeaders();
            headers = headers.append('Authorization', `Bearer ${this.token.access_token}`);

        const options = {
            headers: headers,
            observe: 'body',
            params: (data) ? new HttpParams({
                fromObject: data
            }) : new HttpParams(),
            reportProgress: true,
            responseType: 'json',
            withCredentials: true
        };

        return options;
    }
}
