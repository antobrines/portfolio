import { Component, AfterViewInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';
import { Experience } from './components/experience/experience';
import { Contact } from './components/contact/contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Hero,
    About,
    Projects,
    Skills,
    Experience,
    Contact,
    TranslocoPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  private translocoService: TranslocoService = inject(TranslocoService);
  public isLoading = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    gsap.registerPlugin(ScrollTrigger);
  }

  public ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initLoader();
    }
  }

  public switchLang(lang: 'fr' | 'en') {
    this.translocoService.setActiveLang(lang);
  }

  private initLoader() {
    document.body.classList.add('loading');

    gsap.to("#loader-bar", {
      width: "100%",
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        setTimeout(() => {
          const loaderTL = gsap.timeline({
            onComplete: () => {
              this.isLoading = false;
              document.body.classList.remove("loading");
            },
          });

          loaderTL
            .to("#loader > div", {
              y: -20,
              opacity: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.in(1.7)",
            })
            .to(
              "#loader",
              { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
              "-=0.3"
            );
        }, 500);
      }
    });
  }
}
