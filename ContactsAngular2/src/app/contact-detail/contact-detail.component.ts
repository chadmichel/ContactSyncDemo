import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

import {ContactService} from '../contact.service';
import {Contact} from '../contact';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact = {} as Contact;

  constructor(
    private contactService : ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contactService.getContact(params.id).then((contact) => {
        this.contact = contact;
      });
    });
  }

  back() {
    this.location.back();
  }

}
