import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  authForm= new FormGroup({
    email:new FormControl(""),
    password:new FormControl(""),

  })

  constructor(private authService:AuthService, private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.authService.register(this.authForm.value)
    .then(() =>{
        this.toaster.success("Welcome","Success",
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
