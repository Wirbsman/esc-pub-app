import { CountryWithAverage } from '../esc-dashboard.types';

export function countriesWithAverageSortFn(a: CountryWithAverage, b: CountryWithAverage): number {
    if (a.average === b.average) {
        return a.index - b.index;
    }

    const avgA = Number(a.average) || Number.MAX_VALUE;
    const avgB = Number(b.average) || Number.MAX_VALUE;
    return avgA - avgB;
}
