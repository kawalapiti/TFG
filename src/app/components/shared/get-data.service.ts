import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { dataResponse } from './lineaClases';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  makeHttpGetRequest(): Observable<dataResponse> {
    const url = 'https://www.it.uniovi.es/hosesbackend/skillSaludMental.php';
    const idSkill = 'd344f58284064bf80c2851dfe224c8ee';
    const usuario = 'eva';
    const fechaInicial = '2023-04-01';
    const fechaFinal = 'valor_fechaFinal';

    const params = new HttpParams()
      .set('idSkill', idSkill)
      .set('usuario', usuario)
      //.set('fechaInicial', fechaInicial)
      //.set('fechaFinal', fechaFinal);

    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa('evagrania:holaTFG123uniovi'));

    return this.http.get<dataResponse>(url, { params, headers })
  }

}
