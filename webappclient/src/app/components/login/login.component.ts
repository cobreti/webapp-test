import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <h2>Sign in</h2>
      <button *ngIf="!isLoggedIn" (click)="login()" class="login-button">
        Sign in with Microsoft
      </button>
      <div *ngIf="isLoggedIn" class="user-info">
        <p>Welcome, {{ userName }}</p>
        <button (click)="logout()" class="logout-button">Sign out</button>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      margin: 2rem auto;
    }

    h2 {
      margin-bottom: 1rem;
      color: #333;
    }

    .login-button, .logout-button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      background-color: #0078d4;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .login-button:hover, .logout-button:hover {
      background-color: #005a9e;
    }

    .logout-button {
      background-color: #d83b01;
      margin-top: 1rem;
    }

    .logout-button:hover {
      background-color: #a52b01;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `]
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  userName = '';
  private authService = inject(AuthService);

  ngOnInit(): void {
  }

  login(): void {
  }

  logout(): void {
  }
}
