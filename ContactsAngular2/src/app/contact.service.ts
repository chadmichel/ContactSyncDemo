import { Injectable } from '@angular/core';
import { ResolvedReflectiveFactory } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Observer} from 'rxjs';

import { Contact } from './contact';
import { SyncStatus } from './syncstatus';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  status : Observable<SyncStatus>;
  total: Number;
  local: Number;

  getStatus(): Observable<SyncStatus> {

    if (this.status == null) {
    
      this.status = Observable.create((observer:Observer<SyncStatus>)=>{
        setInterval(()=>{
          var tmp = {
            Total: 0,
            Local: CONTACTS.length
          } as SyncStatus;
         observer.next(tmp)
        },2000);
      });
    }

    return this.status;
  }

  getContacts(filter: string): Promise<Contact[]> {

    var result = [];

    for(var i = 0; i < CONTACTS.length; i++) {
      var item = CONTACTS[i];
      if (item.First.toLowerCase().indexOf(filter) >= 0 || item.Last.toLowerCase().indexOf(filter) >= 0) {
        result.push(item);
      }
      if (result.length > 50)
        break;
    }

    return Promise.resolve(result);
  }

  getContact(id: Number): Promise<Contact> {

    for(var i = 0; i < CONTACTS.length; i++) {
      var item = CONTACTS[i];
      if (item.Id == id)
        return Promise.resolve<Contact>(item);
    }

    return Promise.resolve(null);
  }

}


const CONTACTS: Contact[] =