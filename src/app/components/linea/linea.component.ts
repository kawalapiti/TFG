import { Component, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Label, Color, BaseChartDirective } from "ng2-charts";
import { GetDataService } from "../shared/get-data.service";
import { dataResponse, datos, restultadoTest} from "../shared/lineaClases";
import * as moment from "moment";

@Component({
  selector: "app-linea",
  templateUrl: "./linea.component.html",
  styleUrls: ["./linea.component.css"],
})
export class LineaComponent {
  more: boolean = false;

  public lineChartData: ChartDataSets[] = [
    { data: [], label: "Nivel de ánimo", yAxisID: "y-axis-1" },
    { data: [], label: "Test depresión" },
    { data: [], label: "Test rumiación" },
  ];
  public testRumiacion: restultadoTest[] = [];
  public testDepresion: restultadoTest[] = [];
  public testAnimo: restultadoTest[] = [];
  public datosAnimo: datos[] = [];
  public datosDep: datos[] = [];
  public datosRum: datos[] = [];

  //public lineChartData: ChartDataSets[] = []
  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left",
        },
        {
          id: "y-axis-1",
          position: "right",
          gridLines: {
            color: "rgba(255,0,0,0.3)",
          },
          ticks: {
            fontColor: "red",
          },
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "orange",
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: "orange",
            content: "LineAnno",
          },
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: "rgba(0, 255, 0, 0.3)",
      borderColor: "green",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
    {
      // dark grey
      backgroundColor: "rgba(77,83,96,0.2)",
      borderColor: "rgba(77,83,96,1)",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)",
    },
    {
      // red
      backgroundColor: "rgba(255,0,0,0.3)",
      borderColor: "red",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  private user;
  private fechaActual = new Date();

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private getDataService: GetDataService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.sieteDias();
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public sieteDias() {
    this.getChartLabel(7);
    let fechaInicio = new Date(this.fechaActual);
    fechaInicio.setDate(this.fechaActual.getDate() - 7);

    let fechaFormateada = this.getDateFormat(fechaInicio);
    this.request(fechaFormateada);
  }

  public quinceDias() {
    let fechaInicio = new Date(this.fechaActual);
    fechaInicio.setDate(this.fechaActual.getDate() - 15);

    let fechaFormateada = this.getDateFormat(fechaInicio);
    this.request(fechaFormateada);
    this.getChartLabel(15);
  }

  public treintaDias() {
    let fechaInicio = new Date(this.fechaActual);
    fechaInicio.setDate(this.fechaActual.getDate() - 30);

    let fechaFormateada = this.getDateFormat(fechaInicio);
    this.request(fechaFormateada);
    this.getChartLabel(30);
  }

  public getDateFormat(date){
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    let fechaFormateada = `${year}-${month}-${day}`;
    return fechaFormateada;
  }

  public getChartLabel(days){
    this.lineChartLabels = [];
    let fechaInicio = new Date(this.fechaActual);
    for(let i=(days-1);i>=0;i--){
      fechaInicio = new Date(this.fechaActual); 
      fechaInicio.setDate(this.fechaActual.getDate() - i);
      let fechaFormateada = this.getDateFormat(fechaInicio);
      this.lineChartLabels.push(fechaFormateada);
    }
  }

  public calculaMedia(array: datos[]){
    array.forEach(e => {
      let acum = e.valor.reduce((acumulador, valor) => acumulador + valor, 0);
      e.media = acum/e.valor.length;
    });
  }

  public rellenaDatos(){
    this.lineChartData = [
      { data: [], label: "Nivel de ánimo", yAxisID: "y-axis-1" },
      { data: [], label: "Test depresión" },
      { data: [], label: "Test rumiación" },
    ];
    this.lineChartLabels.forEach(day =>  {
      let datoA = this.datosAnimo.find(dato => dato.dia === day);
      if(datoA){
        this.lineChartData[0].data.push(datoA.media)
      }else{
        this.lineChartData[0].data.push(0);
      }
      let datoD = this.datosDep.find(dato => dato.dia === day);
      if(datoD){
        this.lineChartData[1].data.push(datoD.media)
      }else{
        this.lineChartData[1].data.push(0);
      }
      let datoR = this.datosRum.find(dato => dato.dia === day);
      if(datoR){
        this.lineChartData[2].data.push(datoR.media)
      }else{
        this.lineChartData[2].data.push(0);
      }
    })
  }

  public request(fechaFormateada){
    this.datosAnimo = [];
    this.datosDep = [];
    this.datosRum = [];
    this.getDataService.makeHttpGetRequest(this.user, fechaFormateada).subscribe(
      (response: dataResponse) => {
        for (let clave in response) {
          if (response[clave].enunciado === 'Test ánimo') {
            let valorEncontrado = false;
            this.datosAnimo.forEach(e =>{
              if(e.dia === response[clave].fecha.split(" ")[0]){
                e.valor.push(parseInt(response[clave].respuesta));
                valorEncontrado = true;
              }
            });
            if(valorEncontrado === false){
              let dia = response[clave].fecha.split(" ")[0];
              let valor = [];
              valor.push(parseInt(response[clave].respuesta));
              this.datosAnimo.push({dia: dia, valor: valor});
            }
          }else if (response[clave].enunciado === 'Test depresión') {
            let valorEncontrado = false;
            this.datosDep.forEach(e =>{
              if(e.dia === response[clave].fecha.split(" ")[0]){
                e.valor.push(parseInt(response[clave].respuesta));
                valorEncontrado = true;
              }
            });
            if(valorEncontrado === false){
              let dia = response[clave].fecha.split(" ")[0];
              let valor = [];
              valor.push(parseInt(response[clave].respuesta));
              this.datosDep.push({dia: dia, valor: valor});
            }
          }else if (response[clave].enunciado === 'Test Rumiación') {
            let valorEncontrado = false;
            this.datosRum.forEach(e =>{
              if(e.dia === response[clave].fecha.split(" ")[0]){
                e.valor.push(parseInt(response[clave].respuesta));
                valorEncontrado = true;
              }
            });
            if(valorEncontrado === false){
              let dia = response[clave].fecha.split(" ")[0];
              let valor = [];
              valor.push(parseInt(response[clave].respuesta));
              this.datosRum.push({dia: dia, valor: valor});
            }
          }                     
        }
        this.calculaMedia(this.datosAnimo);
        this.calculaMedia(this.datosDep);
        this.calculaMedia(this.datosRum);
        this.rellenaDatos();
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }
}
