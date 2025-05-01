import { Pipe, PipeTransform } from '@angular/core';
import { isDefined } from '../utils/is-defined.utils';

@Pipe({ name: 'countryFlagSrc' })
export class CountryFlagSrcPipe implements PipeTransform {
    private readonly imagePath = 'assets/images/flags80/';

    transform(isoCode?: string | null): string | undefined {
        return isDefined(isoCode) ? `${this.imagePath}${isoCode.toLowerCase()}.png` : undefined;
    }
}
