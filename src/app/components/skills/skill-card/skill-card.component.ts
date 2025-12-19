import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skill-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skill-card.component.html',
    styleUrl: './skill-card.component.css'
})
export class SkillCardComponent {
    @Input() name: string = '';
    @Input() iconClass: string = '';
    @Input() variant: 'neon' | 'purple' = 'neon';

    get borderClass(): string {
        return this.variant === 'neon'
            ? 'border-neon/10 hover:border-neon/50'
            : 'border-purple/10 hover:border-purple/50';
    }

    get shadowClass(): string {
        return this.variant === 'neon'
            ? 'hover:shadow-[0_5px_20px_rgba(0,243,255,0.15)]'
            : 'hover:shadow-[0_5px_20px_rgba(188,19,254,0.15)]';
    }

    get iconHoverClass(): string {
        return this.variant === 'neon'
            ? 'group-hover:text-neon'
            : 'group-hover:text-purple';
    }
}
