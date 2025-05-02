import { Pipe, PipeTransform } from '@angular/core';
import { isDefined } from '../utils/is-defined.utils';

@Pipe({
    name: 'userAvatarSrc',
})
export class UserAvatarSrcPipe implements PipeTransform {
    private readonly avatarPath = 'assets/avatar/';

    transform(avatar?: string | null): string | undefined {
        return isDefined(avatar) ? `${this.avatarPath}${avatar}.png` : undefined;
    }
}
