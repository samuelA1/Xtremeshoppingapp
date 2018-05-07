import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../_service/data.service';
import { RestApiService } from '../_service/rest-api.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  btnDisabled = false;

  constructor(private router: Router, private dataService: DataService, private restService: RestApiService) { }

  ngOnInit() {
  }

  validate() {
    if(this.user.email) {
      if(this.user.password) {
        return true;
      } else {
        this.dataService.error('Password is not entered');
      }
    } else {
      this.dataService.error('Email is not entered.')
    }
  }

  async login() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const user = await this.restService.login(this.user);
        if(user['success']) {
          localStorage.setItem('token', user['token']);
          this.router.navigate(['/']);
        } else {
          this.dataService.error(user['message']);
        }
      }
    } catch (error) {
      this.dataService.error(error['message']);
    }
  }

}
