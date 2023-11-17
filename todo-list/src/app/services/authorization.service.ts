import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private usersSubject: BehaviorSubject<any[]>;

constructor() { 
   const savedUsers = (typeof localStorage !== 'undefined') ? localStorage.getItem('users') : null;
   this.usersSubject = new BehaviorSubject<any[]>(savedUsers ? JSON.parse(savedUsers) : []);
}


registerUser(user: any): void{
 
    const users = this.usersSubject.getValue();
    users.push(user);
    this.usersSubject.next(users);
    localStorage.setItem('users', JSON.stringify(users));
}

getUsers(): Observable<any[]> {
  return this.usersSubject.asObservable();

}
}
