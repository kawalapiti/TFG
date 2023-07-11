import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { GetDataService } from '../shared/get-data.service';
import { dataResponse } from '../shared/lineaClases';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit{

  constructor(private getDataService: GetDataService){};
  private user;
  private fechaActual = new Date();

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.getValues7days();
    this.getValues15days();
    this.getValues30days();
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
 // public acum: number[] = [0, 0, 0, 0, 0, 0, 0];
  public barChartLabels: Label[] = ['salir', 'leer', 'hablar', 'meditar', 'música', 'listas', 'test'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: '7 días' },
    { data: [], label: '15 días' },
    { data: [], label: '30 días' }
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  public async getValues7days(){
    let fechaInicio = new Date(this.fechaActual);
    fechaInicio.setDate(this.fechaActual.getDate() - 7);
    let year = fechaInicio.getFullYear();
    let month = (fechaInicio.getMonth() + 1).toString().padStart(2, '0');
    let day = fechaInicio.getDate().toString().padStart(2, '0');
    let fechaFormateada = `${year}-${month}-${day}`;
    this.getData(fechaFormateada, 7);
  }

  public async getValues15days(){
    let fechaInicio = new Date(this.fechaActual);
    fechaInicio.setDate(this.fechaActual.getDate() - 15);
    let year = fechaInicio.getFullYear();
    let month = (fechaInicio.getMonth() + 1).toString().padStart(2, '0');
    let day = fechaInicio.getDate().toString().padStart(2, '0');
    let fechaFormateada = `${year}-${month}-${day}`;
    this.getData(fechaFormateada, 15);
  }

  public async getValues30days(){
    let fechaInicio = new Date(this.fechaActual);
    fechaInicio.setDate(this.fechaActual.getDate() - 30);
    let year = fechaInicio.getFullYear();
    let month = (fechaInicio.getMonth() + 1).toString().padStart(2, '0');
    let day = fechaInicio.getDate().toString().padStart(2, '0');
    let fechaFormateada = `${year}-${month}-${day}`;
    this.getData(fechaFormateada, 30);
  }

  public getData(fecha, dias){
    this.getDataService.makeHttpGetRequest(this.user, fecha).subscribe(
      (response: dataResponse) => {
        let acum: number[] = [0, 0, 0, 0, 0, 0, 0];
        for (let clave in response) {
          switch (response[clave].enunciado) {
            case '¿Quieres salir a dar un paseo?':
              acum[0]++;
              break;
            case '¿Quieres leer algún libro que te guste?':
              acum[1]++;
              break;
            case '¿Quieres hablar con algún amigo o familiar?':
              acum[2]++;
              break;
            case '¿Quieres meditar o hacer ejercicios de respiración?':
              acum[3]++;
              break;
            case 'Música':
              acum[4]++;
              break;
            case 'Asociaciones':
              acum[5]++;
              break;
            case 'Test depresión':
            case 'Rumiación':
              acum[6]++;
              break;
          }                            
        }
        switch(dias){
          case 7:
          this.barChartData[0].data = acum;
          break;
          case 15:
          this.barChartData[1].data = acum;
          break;
          case 30:
          this.barChartData[2].data = acum;
          break;
        }
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }
}
