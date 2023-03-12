import { Component } from '@angular/core';
import {Country} from "../country";
import {TEST_COUNTRIES} from "../test-countries";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {

test_countries = TEST_COUNTRIES;

}
