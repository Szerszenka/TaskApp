import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UserService } from './user.service';

@Component({
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {

  user: User = new User();

  constructor(private router: Router, private userService: UserService) {

  }

  createUser(): void {
    this.userService.createUser(this.user)
        .subscribe( 
          data => {

          },
          error => {
          console.log(error);
          alert("User with this username already exist. \nPlease try again using different username");
        },
        () => {
          this.router.navigate(['/login', {register: true}]);
      });
  };

}