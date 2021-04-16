import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private email: string;

  constructor() { }

  getEmail() {
    return this.email;
  }

  setEmail(userEmail: string) {
    this.email = userEmail;
  }
}
