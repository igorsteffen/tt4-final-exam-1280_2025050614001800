import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getAll().subscribe({
      next: (data) => (this.contacts = data),
      error: (err) => console.error('Failed to load contacts:', err)
    });
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.delete(id).subscribe(() => this.loadContacts());
    }
  }

  editContact(id: number): void {
    this.router.navigate(['/contacts', id]);
  }

  createContact(): void {
    this.router.navigate(['/contacts/new']);
  }

}
