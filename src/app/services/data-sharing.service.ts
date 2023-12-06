import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chat, User } from '../dataStructure';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  public idChat: BehaviorSubject<number> = new BehaviorSubject<number>(undefined!)

  public refreschChats: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}
