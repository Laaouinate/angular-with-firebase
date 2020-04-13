import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private toaster:ToastrService,private router: Router,private authService:AuthService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userAuthenticated().pipe(map(user =>{
      if(user){
        return true
      }else{
        this.toaster.warning("You are not logged in please Sign in","warning",{
          positionClass:'toast-bottom-left'
        })
        this.router.navigateByUrl('/login')
        return false;
      }
    }));
  }
  
}
