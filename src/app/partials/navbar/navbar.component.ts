import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser =null
  constructor(private toaster:ToastrService,private router:Router ,private authservice:AuthService) { }

  ngOnInit(): void {
    this.authservice.userAuthenticated().subscribe(user => this.currentUser= user)
  }

  logout(){
    this.authservice.logout()
    .then(() =>{
      this.toaster.info('user signout','info',{
        positionClass:'toast-bottom-left'
      })
      this.router.navigateByUrl('/login');
    })
    .catch(err => this.toaster.warning(err.message,'info',{
      positionClass:'toast-bottom-left'
    }))
  }

}
