import { Component, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { SensorDataService } from './aws-api.service';
import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'emissionInsight';
  sensorData: any = {};
  private carbonValue: number = 0;
  private methaneValue: number = 0;
  carbonChart!: Chart;
  methaneChart!: Chart;

  constructor(
    private sensorDataService: SensorDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.setupGaugeCharts();
    this.updateData();
    setInterval(() => this.reload(), 60000);
    this.cdr.detectChanges();
  }

  private reload() {
    window.location.reload();
  }

  async updateData() {
    try {
      this.sensorData = await this.sensorDataService.list();
      const latestSensorData = this.sensorData.getSensorData[0];
      this.carbonValue = latestSensorData.carbon_concentration || 0;
      this.methaneValue = latestSensorData.methane_concentration || 0;

      console.log('Carbon Value:', this.carbonValue);
      console.log('Methane Value:', this.methaneValue);

      setTimeout(() => {
        this.updateMethaneChart();
        this.updateCarbonChart();
      }, -1000);
    } catch (error) {
      console.error(error);
    }
  }
  setupGaugeCharts() {
    // Create a gauge chart for carbon
    this.carbonChart = new Chart({
      chart: {
        type: 'solidgauge', 
        backgroundColor: '#040D12',
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
       data: [0],
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
        
      }]as any
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
        data: [0],
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

  updateMethaneChart() {
    if (this.methaneChart && this.methaneChart.ref) {
      this.methaneChart.ref.series[0].setData([this.methaneValue], true);
      this.cdr.detectChanges();
    } else {
      console.error('Methane chart or its reference is undefined.');
    }
  }
  
  
  
  updateCarbonChart() {
    if (this.carbonChart && this.carbonChart.ref) {
      this.carbonChart.ref.series[0].setData([this.carbonValue]);
      this.carbonChart.ref.redraw();
      this.cdr.detectChanges();
    } else {
      console.error('Carbon chart or its reference is undefined.');
    }
  }
  
}