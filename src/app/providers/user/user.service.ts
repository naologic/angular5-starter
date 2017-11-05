import { Inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
    get hasTokenFake(): boolean { return true; }
    get currentUser(): firebase.User { return this.afAuth.auth.currentUser; }
    get isLoggedIn(): boolean { return !!this.currentUser; }

    constructor(
        private http: HttpClientService,
        private afAuth: AngularFireAuth,
        @Inject('APIConfig') private APIConfig
    ) {}


    /**
     * Login with Email
     */
    public loginWithEmail(email: string, pass: string): void {
        this.afAuth.auth.signInWithEmailAndPassword(email, pass);
    }

    /**
     * Login with Token
     */
    public loginWithToken(token: string): void {
        this.afAuth.auth.signInWithCustomToken(token);
    }

    /**
     * Login with provider
     *
     * @param {number} provider
     */
    public loginWith(provider: number): void {
        let p;
        switch (provider) {
            case 0:
                p = new firebase.auth.GoogleAuthProvider();
                break;
            case 1:
                p = new firebase.auth.FacebookAuthProvider();
                break;
            case 2:
                p = new firebase.auth.GithubAuthProvider();
                break;
            case 3:
                p = new firebase.auth.TwitterAuthProvider();
                break;
        }
        this.afAuth.auth.signInWithPopup(p);
    }

    /**
     * Create a new user
     *
     * @param {string} email
     * @param {string} password
     */
    public createUser(email: string, password: string): void {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    /**
     * Get provider types for this email
     *
     * @param {string} email
     */
    public getProviders(email: string): void {
        this.afAuth.auth.fetchProvidersForEmail(email);
    }

    /**
     * Reset my password
     *
     * @param {string} email
     */
    public passwordReset(email: string): void {
        this.afAuth.auth.sendPasswordResetEmail(email, {
            url: '/back/to/my/url?'
        });
    }

    /**
     * Verify the password reset
     *
     * @param {string} code
     */
    public verifyPasswordReset(code: string): void {
        this.afAuth.auth.verifyPasswordResetCode(code);
    }

    /**
     * Logout
     */
    public logout(): void {
        this.afAuth.auth.signOut();
    }
}
