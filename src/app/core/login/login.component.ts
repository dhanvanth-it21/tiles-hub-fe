import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddFormComponent } from '../../shared/components/add-form/add-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, AddFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  createLoginForm!: FormGroup;

  swalAlert: {submitForm: boolean, closeForm: boolean} = {
    submitForm: false,
    closeForm: false
  }


  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  formConfig = [
    { key: 'email', label: 'Email Id', type: 'text', required: true },
    { key: 'password', label: 'Password', type: 'password', required: true },
  ];


  formUseOrder: { heading: string, submit: string, discard: string } =
    {
      heading: "Login",
      submit: "Login",
      discard: "Cancel"
    }

  ngOnInit() {
    this.createLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.createLoginForm.valid) {
      this.authService.login(this.createLoginForm.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data));
          this.router.navigate([""]);
        },
        error: (e) => {
          console.error(e);
        }
      })

    }


  }
  cancelLogin() {
    console.log("Cancel login triggered")
    this.createLoginForm.reset();
    this.router.navigate(["/login"]);
  }



}
