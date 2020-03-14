import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered? : boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDa1Ngr9x-VeREq49a_IPBFYwmp68o7_50', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError), 
        tap(responseData => {
            this.handleAuth(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn
                )
        }))
    }

    logIn(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDa1Ngr9x-VeREq49a_IPBFYwmp68o7_50',
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError),
        tap(responseData => {
            this.handleAuth(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn
            )
        }))
    }

    logOut() {
        this.user.next(null)
        this.router.navigate(['/auth'])
    }

    private handleAuth(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

        const user = new User(
            email,
            userId,
            token,
            expirationDate
        )

        this.user.next(user)
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknow error occured'

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage= 'This email does not exist'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct'
        }
        return throwError(errorMessage)
    }
}