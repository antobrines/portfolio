import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { Project, ProjectCard } from './project-card/project-card';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslocoPipe, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {

  projects: Project[] = [
    {
      title: 'Manhwas tracker',
      description: "Suivi des manhwas en temps réel.",
      imageUrl: '/assets/projects/manhwa.png',
      tags: ['Node.js', 'Express', 'Angular', 'Dokploy', 'MongoDB'],
      variant: 'green',
      links: {
        demo: 'https://manhwa.abrines.fr'
      }
    },
  ];

}
