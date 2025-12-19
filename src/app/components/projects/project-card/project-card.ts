import { Component, Input, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import VanillaTilt from 'vanilla-tilt';

export interface Project {
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    links?: {
        demo?: string;
        github?: string;
        githubFront?: string;
        githubBack?: string;
    };
    variant: 'neon' | 'purple' | 'green';
}

@Component({
    selector: 'app-project-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './project-card.html',
    styleUrl: './project-card.css'
})
export class ProjectCard implements AfterViewInit {
    @Input() project!: Project;
    @ViewChild('card') cardRef!: ElementRef;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId) && this.cardRef) {
            VanillaTilt.init(this.cardRef.nativeElement, {
                max: 5,
                scale: 1.02,
                glare: true,
                "max-glare": 0.15,
                perspective: 1200,
            });
        }
    }

    get borderClass(): string {
        switch (this.project.variant) {
            case 'neon': return 'hover:border-neon/40 hover:shadow-[0_5px_30px_rgba(0,243,255,0.15)]';
            case 'purple': return 'hover:border-purple/40 hover:shadow-[0_5px_30px_rgba(188,19,254,0.15)]';
            case 'green': return 'hover:border-green-500/40 hover:shadow-[0_5px_30px_rgba(34,197,94,0.15)]';
            default: return '';
        }
    }

    get overlayClass(): string {
        switch (this.project.variant) {
            case 'neon': return 'bg-purple/40';
            case 'purple': return 'bg-neon/40';
            case 'green': return 'bg-green-500/30';
            default: return '';
        }
    }

    get textClass(): string {
        switch (this.project.variant) {
            case 'neon': return 'group-hover:text-neon';
            case 'purple': return 'group-hover:text-purple';
            case 'green': return 'group-hover:text-green-500'; // Tailwind green-500 is standard green
            default: return '';
        }
    }

    get tagClass(): string {
        switch (this.project.variant) {
            case 'neon': return 'text-neon/80';
            case 'purple': return 'text-purple/80';
            case 'green': return 'text-green-500/80';
            default: return '';
        }
    }
}
