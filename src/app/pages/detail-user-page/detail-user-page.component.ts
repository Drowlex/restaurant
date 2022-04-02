import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detail-user-page',
  templateUrl: './detail-user-page.component.html',
  styleUrls: ['./detail-user-page.component.scss']
})
export class DetailUserPageComponent implements OnInit {
  user: User | undefined;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = this.authService.currentUserValue();
  }

}
