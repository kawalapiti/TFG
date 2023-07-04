import { Component, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Label, Color, BaseChartDirective } from "ng2-charts";
import { GetDataService } from "../shared/get-data.service";
import { dataResponse, restultadoTest} from "../shared/lineaClases";
import * as moment from "moment";

@Component({
  selector: "app-linea",
  templateUrl: "./linea.component.html",
  styleUrls: ["./linea.component.css"],
})
export class LineaComponent {
  more: boolean = false;

  /*public lineChartData: ChartDataSets[] = [
    { data: [], label: "Nivel de ánimo", yAxisID: "y-axis-1" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Test depresión" },
    { data: [12, 34, 28, 16, 20, 22, 14], label: "Test rumiación" },
  ];*/
  public testRumiacion: restultadoTest[] = [];
  public testDepresion: restultadoTest[] = [];
  public testAnimo: restultadoTest[] = [];

  public lineChartData: ChartDataSets[] = []
  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{      
        id: "x-axis-1",
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'YYYY-MM-DD'
          }
        }
        },
        {      
          id: "x-axis-2",
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'YYYY-MM-DD'
            }
          }
          },
          {      
            id: "x-axis-3",
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            }
            }],
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

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private getDataService: GetDataService) {}

  ngOnInit() {
    /*for(let i = 0; i<10; i++){
      this.lineChartData[0].data.push(i);
      console.log(this.lineChartData[0]);
    }*/
    this.getDataService.makeHttpGetRequest().subscribe(
      (response: dataResponse) => {
        for (let clave in response) {
          console.log(response[clave].enunciado)
          if (response[clave].enunciado === '¿Cómo te encuentras hoy?') {
            this.testAnimo.push({fecha: new Date(response[clave].fecha.split(" ")[0]), valor: parseInt(response[clave].respuesta)})
          }else if (response[clave].enunciado === 'Test depresión') {
            this.testDepresion.push({fecha: new Date(response[clave].fecha.split(" ")[0]), valor: parseInt(response[clave].respuesta)})
          }else if (response[clave].enunciado === 'Test rumiación') {
            this.testDepresion.push({fecha: new Date(response[clave].fecha.split(" ")[0]), valor: parseInt(response[clave].respuesta)})
          }
            /*let number = parseInt(response[clave].respuesta);
            console.log(number);
            this.lineChartData[0].data.push(parseInt(response[clave].respuesta));
            this.lineChartLabels.push(response[clave].fecha.split(" ")[0])*/
          
        }
        this.makeChart();
      },
      (error) => {
        console.error("Error:", error);
      }
    );

  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
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

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    const moreData = [6, 7, 4, 2, 5, 8, 10];
    moreData.forEach((data) => {
      this.lineChartData[0].data.push(data);
    });
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    const moreLabels: Label[] = [
      "08-03",
      "09-03",
      "10-01",
      "11-01",
      "12-03",
      "13-03",
      "14-03",
    ];
    moreLabels.forEach((label) => {
      //this.lineChartLabels.push(label);
    });
  }

  public changeColor() {
    this.lineChartColors[1].borderColor = "green";
    this.lineChartColors[1].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    //this.lineChartLabels[1] = ["1st Line", "2nd Line"];
    // this.chart.update();
  }

  public sieteDias() {
    this.lineChartData = [
      {
        data: [3, 2, 4, 8, 5, 10, 10],
        label: "Nivel de ánimo",
        yAxisID: "y-axis-1",
      },
      { data: [28, 48, 40, 19, 86, 27, 90], label: "Test de Beck" },
      { data: [12, 34, 28, 16, 20, 22, 14], label: "Test GDS" },
    ];

    this.lineChartLabels = [
      "01-03",
      "02-03",
      "03-01",
      "04-01",
      "05-03",
      "06-03",
      "07-03",
    ];
  }

  public quinceDias() {
    this.lineChartData = [
      {
        data: [3, 2, 4, 8, 5, 10, 10, 3, 2, 4, 8, 5, 10, 10],
        label: "Nivel de ánimo",
        yAxisID: "y-axis-1",
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90],
        label: "Test de Beck",
      },
      {
        data: [12, 34, 28, 16, 20, 22, 14, 12, 34, 28, 16, 20, 22, 14],
        label: "Test GDS",
      },
    ];

    this.lineChartLabels = [
      "01-03",
      "02-03",
      "03-01",
      "04-01",
      "05-03",
      "06-03",
      "07-03",
      "08-03",
      "09-03",
      "10-01",
      "11-01",
      "12-03",
      "13-03",
      "14-03",
    ];
  }

  public treintaDias() {
    this.lineChartData = [
      {
        data: [
          3, 2, 4, 8, 5, 10, 10, 3, 2, 4, 8, 5, 10, 10, 3, 2, 4, 8, 5, 10, 10,
          3, 2, 4, 8, 5, 10, 10,
        ],
        label: "Nivel de ánimo",
        yAxisID: "y-axis-1",
      },
      {
        data: [
          28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40,
          19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90,
        ],
        label: "Test de Beck",
      },
      {
        data: [
          12, 34, 28, 16, 20, 22, 14, 12, 34, 28, 16, 20, 22, 14, 12, 34, 28,
          16, 20, 22, 14, 12, 34, 28, 16, 20, 22, 14,
        ],
        label: "Test GDS",
      },
    ];

    this.lineChartLabels = [
      "01-03",
      "02-03",
      "03-01",
      "04-01",
      "05-03",
      "06-03",
      "07-03",
      "08-03",
      "09-03",
      "10-01",
      "11-01",
      "12-03",
      "13-03",
      "14-03",
      "01-03",
      "02-03",
      "03-01",
      "04-01",
      "05-03",
      "06-03",
      "07-03",
      "08-03",
      "09-03",
      "10-01",
      "11-01",
      "12-03",
      "13-03",
      "14-03",
    ];
  }

  makeChart(){
    this.testAnimo.forEach(resultado => {
      this.lineChartData.push({ data: [{ x: resultado.fecha, y: resultado.valor }], label: 'Nivel de ánimo', xAxisID: 'x-axis-1' });
    });
    
    this.testDepresion.forEach(resultado => {
      this.lineChartData.push({ data: [{ x: resultado.fecha, y: resultado.valor }], label: 'Test depresión', xAxisID: 'x-axis-2' });
    });
    
    this.testRumiacion.forEach(resultado => {
      this.lineChartData.push({ data: [{ x: resultado.fecha, y: resultado.valor }], label: 'Test rumiación', xAxisID: 'x-axis-3' });
    });

    console.log(this.testAnimo);
    console.log(this.testDepresion);
    console.log(this.testRumiacion);

    const labels1 = this.testAnimo.map(resultado => moment(resultado.fecha).format('YYYY-MM-DD'));
    const labels2 = this.testDepresion.map(resultado => moment(resultado.fecha).format('YYYY-MM-DD'));
    const labels3 = this.testRumiacion.map(resultado => moment(resultado.fecha).format('YYYY-MM-DD'));

this.lineChartLabels = [...labels1, ...labels2, ...labels3];
  }
}
