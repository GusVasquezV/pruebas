import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../models/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  private user: UserInterface = {
    email: '',
    password: ''
  };

  ngOnInit() {
  }

  onLogin(){
    return this.authService
    .loginUser(this.user.email, this.user.password)
    .subscribe(
      data => {
        this.authService.setUser(data.user)
        let token = data.access_token;
        this.authService.setToken(token);
        this.router.navigate(['user/profile']);
      },
      error => console.log(error)
    );
  }

}
