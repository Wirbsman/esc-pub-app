import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';

import { FooterComponent } from '../../../../components/footer/footer.component';
import { HeaderComponent } from '../../../../components/header/header.component';
import { AVATAR_OPTIONS } from '../../../../shared/constants/user-avatar.constants';
import { UserAvatarSrcPipe } from '../../../../shared/pipes/user-avatar-src.pipe';
import { UserEditorService } from './user-editor.service';

@Component({
    selector: 'app-user-editor',
    imports: [
        // frameworks
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatSelect,
        MatOption,
        MatSlideToggle,
        // app
        HeaderComponent,
        FooterComponent,
        UserAvatarSrcPipe,
    ],
    templateUrl: 'user-editor.component.html',
    styleUrl: 'user-editor.component.css',
    providers: [UserEditorService],
})
export default class UserEditorComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);

    private readonly service = inject(UserEditorService);

    protected readonly form = this.service.form;

    protected readonly OPTIONS = AVATAR_OPTIONS;
    protected readonly isAdmin = this.service.isAdmin.asReadonly();

    protected get userId(): string | null {
        return this.service.userId;
    }

    async save() {
        if (await this.service.save()) {
            this.leaveEditor();
        }
    }

    cancel() {
        this.leaveEditor();
    }

    async delete() {
        if (await this.service.delete()) {
            this.leaveEditor();
        }
    }

    private leaveEditor() {
        void this.router.navigate(['../'], { relativeTo: this.route });
    }
}
