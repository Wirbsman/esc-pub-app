import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { CountryArtistTileComponent } from '../../../components/country-artist-tile/country-artist-tile.component';
import { ratingOptions } from '../../../shared/constants/rating-options';
import { CountryAndArtist } from '../../../shared/types/country-and-artist.types';
import { UserRating } from '../../../shared/types/rating.types';

@Component({
    selector: 'app-user-rating-tile',
    templateUrl: 'user-rating-tile.component.html',
    styles: [`
        .rating {
            text-align: right;
            font-weight: 700;
            font-size: 24px;
        }
    `],
    imports: [NgIf, NgForOf, MatSelectModule, MatInputModule, ReactiveFormsModule, CountryArtistTileComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRatingTileComponent implements OnInit, OnDestroy {
    readonly ratingOptions = ratingOptions;

    readonly ratingFormControl = new FormControl<number | null>(null);

    private _userRating?: UserRating;

    private readonly destroyed$ = new Subject<void>();

    get countryAndArtist(): CountryAndArtist | undefined {
        if (!this.userRating) {
            return undefined;
        }
        const { flag, name, artistName, artistSong } = this.userRating;
        return { flag, name, artistName, artistSong };
    }

    get userRating(): UserRating | undefined {
        return this._userRating;
    }

    @Input() set userRating(rating: UserRating | undefined) {
        this._userRating = rating;
        this.ratingFormControl.patchValue(rating?.rating ?? null);
    }

    @Output() ratingChanged = new EventEmitter<UserRating>();

    ngOnInit() {
        this.ratingFormControl.valueChanges.pipe(
            takeUntil(this.destroyed$),
            distinctUntilChanged()
        ).subscribe(value => {
            if (this._userRating) {
                this.ratingChanged.emit({
                    ...this._userRating,
                    rating: value ?? this._userRating.rating
                });
            }
        });
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }
}
