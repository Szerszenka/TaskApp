import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-todoapp';

  constructor(private router: Router){
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
