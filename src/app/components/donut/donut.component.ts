import { Component } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent {

// Doughnut
public doughnutChartLabels: Label[] = ['salir', 'leer', 'hablar', 'meditar', 'música', 'listas', 'test'];
public doughnutChartData: number[] = [2, 3, 5, 4, 7, 9, 10];
public doughnutChartType: ChartType = 'doughnut';

// events
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public randomize(): void {

  this.doughnutChartData = [
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100)
  ];
}

public sieteDias(){
  this.doughnutChartData = [
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100)
  ];
}

public quinceDias(){
  this.doughnutChartData = [
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100)
  ];
}

public treintaDias(){
  this.doughnutChartData = [
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100)
  ];
}

}
