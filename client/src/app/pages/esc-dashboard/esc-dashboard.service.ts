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
    countryRatingsMap = new Map<number, (User & Rating)[]>;
    userAverageMap = new Map<number, string>();

    countries: ReadonlyArray<Country> = [];
    users: ReadonlyArray<User> = [];
    ratings: ReadonlyArray<Rating> = [];

    init({ countries, users, ratings }: InitInput) {
        this.buildCountryAverageMap({ countries, ratings });
        this.buildCountryRatingsMap({ countries, ratings, users });
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

    private buildCountryRatingsMap({ countries, users, ratings }: InitInput) {
        countries.forEach(country => {
            const countryRatings = ratings.filter(rating => rating.countryId === country.id && isDefined(rating.rating));
            const countryRatingsWithUser: (User & Rating)[] = countryRatings.map(countryRating => {
                const user = users.find(user => countryRating.userId === user.id);
                return !user ? undefined : { ...user, ...countryRating };
            }).filter(isDefined);
            this.countryRatingsMap.set(country.id, countryRatingsWithUser);
        });
    }

    private buildUserAverageMap({ users, ratings }: Pick<InitInput, 'users' | 'ratings'>) {
        users.forEach(user => {
            const userRatings = ratings.filter(rating => rating.userId === user.id && isDefined(rating.rating));
            this.userAverageMap.set(user.id, ratingsAverage(userRatings));
        });
    }
}
