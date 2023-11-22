import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  setUserId(userId: string): void {
    this.userIdSubject.next(userId);
  }

  getUserId(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }

}
