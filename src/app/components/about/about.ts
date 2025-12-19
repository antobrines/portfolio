import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import VanillaTilt from 'vanilla-tilt';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements AfterViewInit {
  @ViewChild('tiltCard') tiltCard!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.tiltCard) {
      VanillaTilt.init(this.tiltCard.nativeElement, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        scale: 1.01,
        perspective: 1200,
      });
    }
  }
}
