import {FormControl, FormGroup, Validators} from '@angular/forms';

export namespace UserInterface {
    export interface User {
        name: string;
    }
    export interface Login {
        username: string;
        password: string;
    }
    export interface Token {
        '.expires': string;
        '.issued': string;
        access_token: string;
        expires_in: number;
        refresh_token: string;
        token_type: 'bearer';
    }
    export interface TokenInfo {
        hasToken: boolean;
    }
    export function newLoginForm(): FormGroup {
        return new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)])
        });
    }
}