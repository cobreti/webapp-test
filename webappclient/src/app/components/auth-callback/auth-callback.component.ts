import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="auth-callback-container">
      <div class="loading-spinner"></div>
      <p>Processing authentication...</p>
    </div>
  `,
  styles: [`
    .auth-callback-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      padding: 2rem;
    }

    .loading-spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border-left-color: #0078d4;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `]
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Process the authentication callback
    // this.authService.handleCallback().subscribe(success => {
    //   if (success) {
    //     console.log('User successfully authenticated');
    //     // this.router.navigate(['/']);
    //   } else {
    //     console.error('Authentication callback failed');
    //     // this.router.navigate(['/login']);
    //   }
    // });
  }
}
