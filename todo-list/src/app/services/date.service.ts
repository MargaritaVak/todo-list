import { Injectable } from '@angular/core';
import { read } from 'fs';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private userIdSubject: BehaviorSubject<string | null>;

  constructor(){
  const savedUserId = (typeof sessionStorage !== 'undefined') ?sessionStorage.getItem('user_id') : null;
  this.userIdSubject = new BehaviorSubject<string | null>(savedUserId ? JSON.parse(savedUserId) : null);
  }
  

  setUserId(userId: {user: string}): void {
    const userIdString = JSON.stringify(userId);
    this.userIdSubject.next(userIdString);
    sessionStorage.setItem('user_id', userIdString);
  }

  getUserId(): Observable<string | null> {
    const userIdFromSession = this.userIdSubject.getValue();
    if(userIdFromSession){
      return this.userIdSubject.asObservable();
    } else {
      const userSaved = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('user_id') : null;
      if(userSaved){
        const parsedSavadUserId = JSON.parse(userSaved);
        return new Observable<string | null>((observer) => {
          observer.next(parsedSavadUserId);
          observer.complete;
        });
      } else{
        return this.userIdSubject.asObservable()
      }
      
    }
  }

}
