import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm= new FormGroup({
    email:new FormControl(""),
    password:new FormControl(""),

  })

  constructor(private authService:AuthService, private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.authForm.value)
    .then(() =>{
        this.toaster.success("Welcome to your account","Success",
        {positionClass:'toast-bottom-left'
      })
      this.router.navigate(['/clients'])
    }
    )
    .catch(err => {
      this.toaster.error(err.message,"Error",{
        positionClass:'toast-bottom-left'
      })
    })
  }

}
