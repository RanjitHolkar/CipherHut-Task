import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/services/Encrypt-decrypt/encrypt-decrypt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any;
  constructor(
    private router:Router,
    private encryptDecryptService:EncryptDecryptService) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('currentUser');
    this.user = this.encryptDecryptService.decrypt(this.user);
  }

  logout(){
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('empUserTime');
    this.router.navigate(['/login'])
  }

}
