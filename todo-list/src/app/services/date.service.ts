import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private userIdSubject$: BehaviorSubject<string | null>;
  public isLoggedIn = signal(false)

  constructor(private router: Router){
  const savedUserId = (typeof sessionStorage !== 'undefined') ?sessionStorage.getItem('user_id') : null;
  this.userIdSubject$ = new BehaviorSubject<string | null>(savedUserId ? JSON.parse(savedUserId) : null);
  }
  

  setUserId(userId: string): void {
    const userIdString = JSON.stringify(userId);
    this.userIdSubject$.next(userId);
    sessionStorage.setItem('user_id', userIdString);
  }

  getUserId(): Observable<string | null> {
    const userIdFromSession = this.userIdSubject$.getValue();
    if(userIdFromSession){
      return this.userIdSubject$.asObservable();
    } else {
      const userSaved = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('user_id') : null;
      if(userSaved !== null && userSaved){
        const parsedSavadUserId = JSON.parse(userSaved);
        return new Observable<string | null>((observer) => {
          observer.next(parsedSavadUserId);
          observer.complete;
        });
      } else{
        return this.userIdSubject$.asObservable()
      }
      
    }
  }
  
  isUserLoggedIn(): boolean {
    const userIdFromSession = this.userIdSubject$.getValue();
    
    if (userIdFromSession) {
      return true;
    } else {
      const userSaved = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('user_id') : null;
      return !!userSaved;
    }
  }

  clearUserId(): void {
    this.userIdSubject$.next(null);
    sessionStorage.removeItem('user_id');
    this.isLoggedIn.set(false)
    this.router.navigate(['/auth']);
  }

  canActivate(): boolean {    
    return this.isUserLoggedIn();  
  }

  canActivateAuth(): boolean {   
    if(!this.isUserLoggedIn()) {
      return !this.isUserLoggedIn();
    } else{
      this.router.navigate(['/'])
      return true;
    }
   
  }



  

}
