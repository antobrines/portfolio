import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import gsap from 'gsap';
import { TranslocoPipe } from '@jsverse/transloco';
import { SkillCardComponent } from './skill-card/skill-card.component';

interface Skill {
  name: string;
  iconClass: string;
  isTranslatable?: boolean;
}

interface SkillCategory {
  title: string;
  titleIcon: string;
  titleClass: string;
  isTitleTranslatable?: boolean;
  variant: 'neon' | 'purple';
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslocoPipe, SkillCardComponent],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements AfterViewInit {

  skillCategories: SkillCategory[] = [
    {
      title: 'skills.backend_title',
      isTitleTranslatable: true,
      titleIcon: 'fas fa-server',
      titleClass: 'text-neon',
      variant: 'neon',
      skills: [
        { name: 'Node', iconClass: 'devicon-nodejs-plain' },
        { name: 'Express', iconClass: 'devicon-express-original' },
        { name: 'PHP', iconClass: 'devicon-php-plain' },
        { name: 'Laravel', iconClass: 'devicon-laravel-plain' },
        { name: 'Symfony', iconClass: 'devicon-symfony-plain' },
        { name: 'Python', iconClass: 'devicon-python-plain' },
        { name: 'Flask', iconClass: 'devicon-flask-plain' },
        { name: 'Java', iconClass: 'devicon-java-plain' },
        { name: 'Spring', iconClass: 'devicon-spring-plain' },
        { name: 'Thymeleaf', iconClass: 'devicon-thymeleaf-plain' },
      ]
    },
    {
      title: 'skills.database_title',
      isTitleTranslatable: true,
      titleIcon: 'fas fa-database',
      titleClass: 'text-purple',
      variant: 'purple',
      skills: [
        { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain' },
        { name: 'MongoDB', iconClass: 'devicon-mongodb-plain' },
        { name: 'Redis', iconClass: 'devicon-redis-plain' },
        { name: 'Firebase', iconClass: 'devicon-firebase-plain' },
      ]
    },
    {
      title: 'skills.frontend_title',
      isTitleTranslatable: true,
      titleIcon: 'fas fa-code',
      titleClass: 'text-neon',
      variant: 'neon',
      skills: [
        { name: 'TypeScript', iconClass: 'devicon-typescript-plain' },
        { name: 'Angular', iconClass: 'devicon-angularjs-plain' },
        { name: 'Next.js', iconClass: 'devicon-nextjs-plain' },
      ]
    },
    {
      title: 'skills.tools_title',
      isTitleTranslatable: true,
      titleIcon: 'fas fa-code',
      titleClass: 'text-purple',
      variant: 'purple',
      skills: [
        { name: 'Git', iconClass: 'devicon-git-plain' },
        { name: 'Docker', iconClass: 'devicon-docker-plain' },
        { name: 'Jenkins', iconClass: 'devicon-jenkins-plain' },
        { name: 'AzureDevops', iconClass: 'devicon-azuredevops-plain' },
        { name: 'Traefik', iconClass: 'devicon-traefikproxy-original' },
      ]
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.utils.toArray(".skill-card").forEach((card: any, i) => {
        gsap.fromTo(
          card,
          {
            y: 50,
            autoAlpha: 0,
          },
          {
            scrollTrigger: {
              trigger: card.closest("section"),
              start: "top 80%",
            },
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            delay: i * 0.05,
            ease: "back.out(1.2)",
          }
        );
      });
    }
  }
}
