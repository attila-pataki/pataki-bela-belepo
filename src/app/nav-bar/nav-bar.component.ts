import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterModule, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent {
  constructor(
    private route: ActivatedRoute, private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.actPath = this.router.url
        console.log(this.router.url)
      }
    })
  }

  pathe: string = "../../images/plate.png";
  actPath: string = ""

  ngOnInit(): void {
    console.log(this.route.snapshot.params)
  }
};













