import { Injectable } from '@angular/core';
import { Country } from '../../shared/types/country.types';
import { Rating } from '../../shared/types/rating.types';
import { User } from '../../shared/types/user.types';
import { isDefined } from '../../shared/utils/is-defined.utils';
import { ratingsAverage } from './utils/ratings.utils';

type InitInput = {
    countries: ReadonlyArray<Country>;
    users: ReadonlyArray<User>;
    ratings: ReadonlyArray<Rating>;
}

@Injectable({ providedIn: 'root' })
export class EscDashboardService {

    countryAverageMap = new Map<number, string>();
    userAverageMap = new Map<number, string>();

    countries: ReadonlyArray<Country> = [];
    users: ReadonlyArray<User> = [];
    ratings: ReadonlyArray<Rating> = [];

    init({ countries, users, ratings }: InitInput) {
        this.buildCountryAverageMap({ countries, ratings });
        this.buildUserAverageMap({ users, ratings });
        this.countries = [...countries];
        this.users = [...users];
        this.ratings = [...ratings];
    }

    private buildCountryAverageMap({ countries, ratings }: Pick<InitInput, 'countries' | 'ratings'>) {
        countries.forEach(country => {
            const countryRatings = ratings.filter(rating => rating.countryId === country.id && isDefined(rating.rating));
            this.countryAverageMap.set(country.id, ratingsAverage(countryRatings));
        });
    }

    private buildUserAverageMap({ users, ratings }: Pick<InitInput, 'users' | 'ratings'>) {
        users.filter(user => {
            const userRatings = ratings.filter(rating => rating.userId === user.id && isDefined(rating.rating));
            this.userAverageMap.set(user.id, ratingsAverage(userRatings));
        });
    }
}
