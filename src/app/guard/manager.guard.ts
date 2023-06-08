import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CommonService } from '../shared/service/common.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(private _toast: ToastrService, private _route: Router, private _commonService: CommonService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
    switch (currentUser.roleType) {
      case 'SUPERADMIN':
        return true
      case 'ADMIN':
        return true
      case 'MANAGER':
        this._route.navigateByUrl('/branch/view-branch/' + currentUser.branchId)
        return false
      default:
        return false

    }
  }
  
}
