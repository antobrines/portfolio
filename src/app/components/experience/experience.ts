import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import gsap from 'gsap';
import { TranslocoPipe } from '@jsverse/transloco';
import { ExperienceCard, Experience as ExperienceType } from './experience-card/experience-card';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslocoPipe, ExperienceCard],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience implements AfterViewInit {

  experiences: ExperienceType[] = [
    {
      year: '2023 – Présent',
      title: 'Développeur Full-Stack',
      company: 'Inetum · Lyon',
      description:
        "Développement et maintenance d’applications web à destination de clients grands comptes, dans des environnements à forts enjeux techniques et métiers. Forte implication sur la conception d’API robustes, la sécurité et l’intégration de systèmes complexes.",
      tasks: [
        "Analyse des besoins fonctionnels et techniques en collaboration avec les équipes métiers",
        "Conception et développement d’API REST sécurisées",
        "Développement d’interfaces web modernes et performantes",
        "Découpage technique des fonctionnalités et estimation des charges",
        "Mise en place de tests de charge et optimisation des performances",
        "Rédaction de documentation technique et fonctionnelle",
        "Participation aux revues de code et à l’amélioration continue"
      ],
      techIcons: [
        'devicon-symfony-original',
        'devicon-angular-plain colored',
        'devicon-azure-plain colored',
        'devicon-postgresql-plain colored'
      ],
      variant: 'purple'
    },
    {
      year: '2023 · 3 mois',
      title: 'Intervenant / Professeur',
      company: 'Ynov Campus · Lyon',
      description:
        "Intervention en tant que formateur auprès d’étudiants en informatique, avec un focus sur les bases de données relationnelles, la haute disponibilité et les bonnes pratiques d’administration.",
      tasks: [
        "Enseignement des fondamentaux des bases de données relationnelles",
        "Mise en place de stratégies de sauvegarde et de restauration",
        "Introduction aux architectures en cluster PostgreSQL",
        "Présentation des concepts NoSQL et comparaison avec les bases relationnelles",
        "Accompagnement des étudiants sur des cas pratiques et projets"
      ],
      techIcons: [
        'devicon-postgresql-plain colored',
        'devicon-mongodb-plain colored',
        'devicon-mysql-plain colored',
        'devicon-mariadb-plain colored'
      ],
      variant: 'neon'
    },
    {
      year: '2020 – 2023',
      title: 'Développeur Full-Stack · Alternance',
      company: 'IsiAPP · Lyon',
      description:
        "Participation active au développement de solutions web sur mesure pour des clients grands comptes, avec une montée en compétences progressive sur les architectures backend, la gestion des données et les intégrations applicatives.",
      tasks: [
        "Développement d’applications web full-stack",
        "Conception et consommation d’API REST",
        "Participation à la maintenance et à l’évolution de projets existants",
        "Rédaction de documentation technique",
        "Intervention sur des outils d’inventaire et de gestion de parc informatique (OCS Inventory)"
      ],
      techIcons: [
        'devicon-laravel-plain colored',
        'devicon-azure-plain colored',
        'devicon-mysql-plain colored'
      ],
      variant: 'purple'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        gsap.utils.toArray(".experience-block").forEach((block: any, i) => {
          gsap.fromTo(
            block,
            { x: i % 2 === 0 ? -30 : 30, autoAlpha: 0 },
            {
              scrollTrigger: {
                trigger: block,
                start: "top 95%",
              },
              x: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power2.out",
            }
          );
        });
      }, 100);
    }
  }
}
