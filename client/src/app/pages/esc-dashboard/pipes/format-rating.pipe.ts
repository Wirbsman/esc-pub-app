import { Pipe, PipeTransform } from '@angular/core';

import { ratingOptions } from '../../../shared/constants/rating-options';

@Pipe({
    name: 'formatRating',
    standalone: true,
})
export class FormatRatingPipe implements PipeTransform {
    transform(value?: number | null, fallback = '&ndash;'): unknown {
        return ratingOptions.find((value1) => value1.value === value)?.displayName ?? fallback;
    }
}
