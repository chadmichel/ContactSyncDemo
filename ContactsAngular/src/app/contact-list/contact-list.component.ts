import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

import {ContactService} from '../contact.service';
import {Contact} from '../contact';
import {SyncStatus} from '../syncstatus';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  title = 'app';
  displayedColumns = ['Id', 'First', 'Last'];
  //dataSource = new MatTableDataSource();
  filteredSource = [];
  filterText = '';
  total = 0;
  local = 0;
  status : Observable<SyncStatus>;

  selection = new SelectionModel<Contact>(false, []);

  constructor(
    private contactService : ContactService,
    private route: ActivatedRoute,
    private router: Router
    ) {
  }

  ngOnInit() {    
    this.contactService.getContacts("").then(contacts => {
      this.filteredSource = contacts;
    });    
    this.contactService.getStatus().subscribe( 
      (data: SyncStatus) => {
        console.log(data);
        this.total = data.Total;
        this.local = data.Local;
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    //this.dataSource.filter = filterValue;
    this.contactService.getContacts(filterValue).then(contacts => {
      this.filteredSource = contacts;
    });
  }

  refresh() {
    this.filterText = "";
    this.applyFilter("");
  }

  selectRow(row) {
    this.router.navigateByUrl("ContactDetails/" + row.Id);
  }

}
