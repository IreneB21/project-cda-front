import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoginDto } from '../../../models/login.dto';
import { Router } from '@angular/router';
import { HeaderAuthentificationComponent } from '../header-authentification/header-authentification.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderAuthentificationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  
  constructor(private authService: AuthService, private router: Router) {}

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit() {
    const formValue = this.loginForm.value;
    const loginData: LoginDto = {
      password: formValue.password ?? '',
      email: formValue.email ?? ''
    }

    this.authService.login(loginData).subscribe({
      next: (data) => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.id);
        this.router.navigate(['/hello/neighbors/profile']); 
      },
      error: err => console.error('Erreur de connexion :', err)
    })
  }
}
