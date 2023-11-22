import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'; 
import { compare, hash, compareSync } from 'bcryptjs'; 


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private usersSubject: BehaviorSubject<any[]>;
  private tokenKey = 'auth-userMV-key'

constructor() { 
   const savedUsers = (typeof localStorage !== 'undefined') ? localStorage.getItem('users') : null;
   this.usersSubject = new BehaviorSubject<any[]>(savedUsers ? JSON.parse(savedUsers) : []);
}

registerUser(user: any): Observable<any> { 
  return new Observable(observer => {
    const userId = uuidv4(); 
    const hashedPassword = hash(user.password, 10);  
    const newUser = { 
      id: userId, 
      name: user.name, 
      login: user.login, 
      password: hashedPassword 
    }; 

    const users = this.usersSubject.getValue(); 
    users.push(newUser); 
    this.usersSubject.next(users); 
    localStorage.setItem('users', JSON.stringify(users));
   
    observer.next({ user: newUser});
    observer.next(newUser);
    observer.complete();
  });
}


authorizeUser(login: any, password: any): Observable<any> {
  return new Observable<any>((observer) => {
    const users = this.usersSubject.getValue();
    const user = users.find(u => u.login === login);
    if (user) {
      const isPasswordValid = compareSync(String(password), String(user.password));
      if (isPasswordValid) {
        observer.next(user.id);
        observer.complete();
      } else {
        observer.next(null);
        observer.complete();
      }
    } else {
      observer.next(null);
      observer.complete();
    }
  });
}


}

