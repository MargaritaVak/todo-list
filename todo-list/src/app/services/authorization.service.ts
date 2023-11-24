import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'; 
import { compare, hash, compareSync, hashSync } from 'bcryptjs'; 


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
    const hashedPassword = hashSync(user.password, 10);  
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
  return new Observable(observer => {
    const users = this.usersSubject.getValue();
    const foundUser = users.find(user => user.login === login);

    if (!foundUser) {
      observer.error('User not found');
      observer.complete();
      return;
    }

    const isPasswordValid = compareSync(password, foundUser.password);
    if (!isPasswordValid) {
      observer.error('Invalid password');
      observer.complete();
      return;
    }else{
      observer.next({ user: foundUser.id });
      observer.complete();
    }

  
  });
}


}

