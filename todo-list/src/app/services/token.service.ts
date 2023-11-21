import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-MVtoken';
const USER_KEY = 'auth-MVuser';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

constructor() { }
signOut(): void {
  window.sessionStorage.clear();
}

public saveToken(token: string): void {
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, token);
}

public getToken(): string | null {
  return window.sessionStorage.getItem(TOKEN_KEY);
}

public saveUser(user: any): void {
  window.sessionStorage.removeItem(USER_KEY);
  window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

public getUser(): any {
  const user = window.sessionStorage.getItem(USER_KEY);
  if (user) {
    return JSON.parse(user);
  }
}

public getUserId(): any {
  const user = this.getUser();
  return user.user[0].id;
}


}
