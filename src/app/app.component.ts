import { Component, Renderer2, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Farma';
  headerShow = false;
  navShow = false;

  constructor(
    private router: Router
  ) {
      this.router.events
        .subscribe( (event) => {
          if ( event instanceof NavigationStart ) {
            const currentUrlSlug = event.url.slice(1);

            if (currentUrlSlug === 'login' || currentUrlSlug === '' || currentUrlSlug === 'register' || currentUrlSlug === 'forgot-password') {
              this.headerShow = false;
              this.navShow = false;
            } else {
              this.headerShow = true;
              this.navShow = true;
            }
          }
        });
  }

  ngOnInit() {}
}
