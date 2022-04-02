import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throttleTime } from 'rxjs';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detail-user-page',
  templateUrl: './detail-user-page.component.html',
  styleUrls: ['./detail-user-page.component.scss']
})
export class DetailUserPageComponent implements OnInit {
  user : User | undefined;
  items: Array<any> | undefined;
	see_pass: boolean  = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getAllUsers();
  }

  getUser() {
    this.user = this.authService.currentUserValue();
  }
  getAllUsers() {
    this.authService.getAllUser().subscribe({
      next: (result: Array<User>) => this.items = result
    });
  }
  onSubmit() {
    this.toastr.info("En desarrollo");
    this.authService.change(+(this.user?.id || 0), this.user)

  }

}
