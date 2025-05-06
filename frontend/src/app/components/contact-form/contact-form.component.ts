import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {

  contact: Contact = {
    fullName: '',
    email: '',
    phone: '',
    isFavorite: false
  };

  isEditMode = false;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.contactService.getById(+id).subscribe({
        next: (data) => (this.contact = data),
        error: (err) => console.error('Failed to load contact:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.contact.id) {
      this.contactService.update(this.contact.id, this.contact).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    } else {
      this.contactService.create(this.contact).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/contacts']);
  }

}
