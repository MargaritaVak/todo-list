import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { compareSync, hashSync } from 'bcryptjs';
import { EditUser } from '../interfaces/edit-user';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private usersSubject$: BehaviorSubject<EditUser[]>;

  constructor() {
    const savedUsers =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('users')
        : null;
    this.usersSubject$ = new BehaviorSubject<EditUser[]>(
      savedUsers ? JSON.parse(savedUsers) : []
    );
  }

  registerUser(user: {
    name: string;
    login: string;
    password: string;
  }): Observable<{ user: EditUser }> {
    return new Observable((observer) => {
      const dataUsers = this.usersSubject$.getValue();
      const userExists = dataUsers.find(
        (existingUser) => existingUser.login === user.login
      );
      if (userExists) {
        observer.error('Пользователь с похожим логином уже существует');
        observer.complete();
        return;
      } else {
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
      }
    });
  }

  authorizeUser(login: string, password: string): Observable<{ user: string }> {
    return new Observable((observer) => {
      const users = this.usersSubject$.getValue();
      const foundUser = users.find((user) => user.login === login);

      if (!foundUser) {
        observer.error('Пользователь не найден');
        observer.complete();
        return;
      }

      const isPasswordValid = compareSync(password, foundUser.password);
      if (!isPasswordValid) {
        observer.error('Неверный пароль');
        observer.complete();
      } else {
        observer.next({ user: foundUser.id });
        observer.complete();
      }
    });
  }
}

