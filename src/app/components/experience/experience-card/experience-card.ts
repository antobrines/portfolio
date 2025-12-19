import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Experience {
    year: string;
    title: string;
    company: string;
    description: string;
    tasks: string[];
    techIcons: string[];
    variant: 'neon' | 'purple';
}

@Component({
    selector: 'app-experience-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './experience-card.html',
    styleUrl: './experience-card.css'
})
export class ExperienceCard {
    @Input() experience!: Experience;

    get borderClass(): string {
        return this.experience.variant === 'neon'
            ? 'hover:border-neon/30'
            : 'hover:border-purple/30';
    }

    get glowClass(): string {
        return this.experience.variant === 'neon'
            ? 'bg-neon/5'
            : 'bg-purple/5';
    }

    get badgeClass(): string {
        return this.experience.variant === 'neon'
            ? 'bg-neon/10 text-neon'
            : 'bg-purple/10 text-purple';
    }

    get checkIconClass(): string {
        return this.experience.variant === 'neon'
            ? 'text-neon'
            : 'text-purple';
    }
}
