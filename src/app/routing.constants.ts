export const AppRouting = {
    Login: 'login',
    SimpleSignUp: 'sign-up/simple',
    Voting: 'vote',
    Dashboard: 'dashboard',
} as const;

export const AppRoutingParams = {
    CurrentYear: 'currentYear',
    CountryIsoCode: 'countryIsoCode',
} as const;

export const AdminRouting = {
    BasePath: 'admin',
    CountriesSubPath: 'countries',
    UsersSubPath: 'users',
} as const;
