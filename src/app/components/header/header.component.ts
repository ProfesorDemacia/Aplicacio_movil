import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public title: string;
  profile: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.getUserProfile();
  }

  goToProfile() {
    this.router.navigate(['/profile'])
  }

  getUserProfile() {
    this.authService.getUserProfile().subscribe((respuesta:any) => {
      this.profile = respuesta;
    })
  }

}
