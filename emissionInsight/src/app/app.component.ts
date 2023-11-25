import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { SensorDataService } from './aws-api.service';
import { interval, Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'emissionInsight';
  sensorData: any = {}; // Initialize an empty object to store sensor data
  private updateSubscription!: Subscription;
  carbonChart = new Chart(); // Assuming you are using the angular-highcharts library
  methaneChart = new Chart(); // Assuming you are using the angular-highcharts library
  constructor(private sensorDataService: SensorDataService) {}


  ngOnInit() {
    this.setupGaugeCharts();
    this.updateData();
    this.updateSubscription = interval(600000000).subscribe(
      (val) => { this.updateData() }
    );
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  async updateData() {
    try {
      this.sensorData = await this.sensorDataService.list();
      // Update your charts here with the new data
      this.updateCarbonChart();
      this.updateMethaneChart();
    } catch (error) {
      console.error(error);
    }
  }

  setupGaugeCharts() {
    // Create a gauge chart for carbon
    this.carbonChart = new Chart({
      chart: {
        type: 'solidgauge',
        backgroundColor: '#040D12'
    
        
      },
      credits: {
        enabled: false
    },
      title: {
        text: 'Carbon Concentration',
        style: {
          fontSize: '24px',
          fontWeight: '100',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
        }
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        size: '140%',
        center: ['50%', '85%'],
        
  

      },        
      yAxis: {
        min: 0,
        max: 1,  
        tickPosition: 'outside',
        lineColor: '#000000',
        lineWidth: 2,
        labels: {
          distance: 12,
          rotation: 360
        },
        offset: -20,
        endOnTick: true,
        stops: [
          [0.1, '#1A5D1A'], // green at 10%
          [0.5, '#F4CE14'], // yellow at 50%
          [0.9, '#B31312'] 
        ]
      },
      series: [{  
        name: 'Carbon',
        data: [0.7],
        dataLabels: {

          backgroundColor: {
            linearGradient: {
              x1: 2,
              y1: 3,
              x2: 4,
              y2: 1
            },
            stops: [
              [0.1, '#040D12'], 
               
            ]
          } 
        },
        tooltip: {
          valueSuffix: '% CO2'
        }
        
      }] as any
    });
    
    
      // ... other chart options for carbon
  

    // Create a gauge chart for methane
    this.methaneChart = new Chart({
      chart: {
        type: 'solidgauge',
        backgroundColor: '#040D12',
        
    
        
      },
      credits: {
        enabled: false
    },
      
      title: {
        text: 'Methane Concentration',
        style: {
          fontSize: '24px',
          fontWeight: '100',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
        }
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        size: '140%',
        center: ['50%', '85%'],
        
  

      },        
      yAxis: {
        min: 0,
        max: 1,  
        tickPosition: 'outside',
        lineColor: '#000000',
        lineWidth: 2,
        labels: {
          distance: 12,
          rotation: 360
        },
        offset: -20,
        endOnTick: true,
        stops: [
          [0.1, '#1A5D1A'], // green at 10%
          [0.5, '#F4CE14'], // yellow at 50%
          [0.9, '#B31312'] 
        ]
      },
      series: [{  
        name: 'Methane',
        data: [0.8],
        dataLabels: {

          backgroundColor: {
            linearGradient: {
              x1: 2,
              y1: 3,
              x2: 4,
              y2: 1
            },
            stops: [
              [0.1, '#040D12'], 
               
            ]
          } 
        },
        tooltip: {
          valueSuffix: '% CO2'
        }
        
      }] as any
    });
  }

  updateCarbonChart() {
    // Update your carbon chart here with the new data
  }

  updateMethaneChart() {
    // Update your methane chart here with the new data
  }
}


