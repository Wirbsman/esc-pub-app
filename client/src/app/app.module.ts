import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import { CountryComponent } from './country/country.component';
import {MatListModule} from "@angular/material/list";
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";
import { UserTableComponent } from './user-table/user-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LogInComponent } from './log-in/log-in.component';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import { UserRatingsComponent } from './user-ratings/user-ratings.component';
import {MatSelectModule} from "@angular/material/select";
import { EscDashboardComponent } from './esc-dashboard/esc-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    MainNavigationComponent,
    UserTableComponent,
    LogInComponent,
    UserRatingsComponent,
    EscDashboardComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatListModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatGridListModule,
        MatMenuModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
