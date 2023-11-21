import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'; 
import { compare, hash, compareSync } from 'bcryptjs'; 
import jwt from 'jsonwebtoken';


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
    const token = jwt.sign({ id: userId }, this.tokenKey); 
    observer.next({ user: newUser, token });
    observer.next(newUser);
    observer.complete();
    localStorage.setItem('token', token); 
  });
}


authorizeUser(login: any, password: any): Promise<string | null> { 
  return new Promise<string | null>((resolve, reject) => { 
    const users = this.usersSubject.getValue(); 
    const user = users.find(u => u.login === login);
    if (user) { 
      const isPasswordValid = compareSync(String(password), String(user.password));
      if (isPasswordValid) {
        const token = jwt.sign({ id: user.id, login: user.login }, this.tokenKey);
        resolve(token); 
      } else {
        resolve(null); 
      }
    } else { 
      resolve(null); 
    } 
  }); 
}


}

