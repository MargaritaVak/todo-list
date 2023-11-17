import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'; 
import { hash } from 'bcryptjs'; 
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private usersSubject: BehaviorSubject<any[]>;

constructor(private http: HttpClient) { 
   const savedUsers = (typeof localStorage !== 'undefined') ? localStorage.getItem('users') : null;
   this.usersSubject = new BehaviorSubject<any[]>(savedUsers ? JSON.parse(savedUsers) : []);
}


registerUser(user: any): void{
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
}

postUser(user:any):Observable<any>
{
  return this.http.post<any>(`http://localhost:3000/users/`, user)
}
}

