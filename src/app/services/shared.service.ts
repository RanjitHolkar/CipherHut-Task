import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
public toasterMessage = new Subject();
public empDetails = new BehaviorSubject('');
public spinner = new Subject();
  constructor() { }
}
