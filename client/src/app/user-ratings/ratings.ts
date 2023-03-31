

export class Rating {
  private countryId: number;
  private ratingValue: number;

  constructor(countryId: number, ratingValue: number) {
    this.countryId = countryId;
    this.ratingValue = ratingValue;
  }
}

