import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { compareSync, hashSync } from 'bcryptjs';

interface AuthForm{
  id: string;
  name: string;
  login: string;
  password: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private usersSubject$: BehaviorSubject<AuthForm[]>;

  constructor() {
    const savedUsers =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('users')
        : null;
    this.usersSubject$ = new BehaviorSubject<AuthForm[]>(
      savedUsers ? JSON.parse(savedUsers) : []
    );
  }

  registerUser(user: { name: string; login: string; password: string}): Observable<{user: AuthForm}> {
    return new Observable((observer) => {
      const userId = uuidv4();
      const hashedPassword = hashSync(user.password, 10);
      const newUser = {
        id: userId,
        name: user.name,
        login: user.login,
        password: hashedPassword,
      };

      const users = this.usersSubject$.getValue();
      users.push(newUser);
      this.usersSubject$.next(users);
      localStorage.setItem('users', JSON.stringify(users));

      observer.next({ user: newUser });
      observer.complete();
    });
  }

  authorizeUser(login: string, password: string): Observable<{user: string}> {
    return new Observable((observer) => {
      const users = this.usersSubject$.getValue();
      const foundUser = users.find((user) => user.login === login);

      if (!foundUser) {
        observer.error('User not found');
        observer.complete();
        return;
      }

      const isPasswordValid = compareSync(password, foundUser.password);
      if (!isPasswordValid) {
        observer.error('Invalid password');
        observer.complete();
      } else {
        observer.next({ user: foundUser.id });
        observer.complete();
      }
    });
  }
}

