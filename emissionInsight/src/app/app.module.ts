import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular-highcharts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SensorDataService } from './aws-api.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule
  ],
  providers: [SensorDataService],
  bootstrap:  [AppComponent]
})
export class AppModule { }
