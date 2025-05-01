import { Component, input } from '@angular/core';

type HeaderAppearance = 'primary' | 'normal';

@Component({
    selector: 'app-header',
    imports: [],
    template: `
        <header
            [class.primary]="appearance() === 'primary'"
            [class.secondary]="appearance() === 'normal'"
        >
            <img class="left-icon" src="assets/images/esc_ods.svg" alt="Icon" />
            @if (title(); as title) {
                <h1>{{ title }}</h1>
            }
        </header>
    `,
    styles: `
        .primary {
            background-color: var(--color-header-background-primary);
        }
        .secondary {
            background-color: var(--color-header-background-secondary);
        }

        header img.left-icon {
            max-width: 140px;
        }
    `,
})
export class HeaderComponent {
    readonly title = input<string | null>(null);
    readonly appearance = input<HeaderAppearance>('normal');
}
