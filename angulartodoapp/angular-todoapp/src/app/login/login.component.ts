import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { User } from '../models/user.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user: User = new User();
  userValidated: User;
  register: boolean;

  constructor(private router: Router, private loginService: LoginService, 
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.register = this.route.snapshot.params['register'];
  }

  login(user: User): void {
    this.loginService.loginUser(user)
        .subscribe( 
        data => {
          this.userValidated = data;
        },
        error => {
          console.log(error);
        },
        () => {
          if(!this.userValidated.id) {
            alert('Invalid username or password.');
          } else {
            localStorage.setItem('logged', user.username);
            this.router.navigate(['/tasks']);
          }
      });
  }; 

}
