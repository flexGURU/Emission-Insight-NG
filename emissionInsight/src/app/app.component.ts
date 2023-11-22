import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { SensorDataService } from './aws-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'emissionInsight';
  sensorData: any = {}; // Initialize an empty object to store sensor data

  constructor(private sensorDataService: SensorDataService) {}

  async ngOnInit() {
    try {
      this.sensorData = await this.sensorDataService.list();
    } catch (error) {
      console.error(error);
    }
  }
  methaneChart = new Chart({
    chart: {
      type: 'pie',
      backgroundColor: '#6096B4',
      style: {
        fontFamily: 'Lucida'
      }
    },
    title: {
      text: 'Methane Data',
      style: {
        color: '#ffffff',
        fontSize: '15px'
      }
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        innerSize: '70%', // This makes the pie chart a donut chart
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {
        name: 'Methane',
        data: [
          {
            name: 'Methane',
            y: 56,
            color: '#22092C'
          }
        ],
        size: '130%',
        innerSize: '70%'
      }
    ] as any
  });
  
  carbonChart = new Chart({
    chart: {
      type: 'pie',
      backgroundColor: '#6096B4',
      style: {
        fontFamily: 'Lucida'
      }
    },
    title: {
      text: 'Carbon (IV) Oxide Data',
      style: {
        color: '#ffffff',
        fontSize: '15px'
      }
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        innerSize: '170%', // This makes the pie chart a donut chart
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {
        name: 'Carbon (IV) oxide',
        data: [
          {
            name: 'Carbon (IV) oxide',
            y: 8,
            color: '#323232'
          }
        ],
        size: '130%',
        innerSize: '70%'
      }
    ] as any
  });
}