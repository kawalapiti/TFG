import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'graficosAngular';
  user: string;

  async ngOnInit(){
    const { value: user } = await Swal.fire({
      title: 'Indica su usario de Amazon',
      input: 'text',
      inputLabel: 'Su usuario',
      inputPlaceholder: 'Escribe su usuario'
    })
    
    if (user) {
      Swal.fire(`Entered user: ${user}`)
      this.user = user;
      localStorage.setItem('usuario', JSON.stringify(user));
    }
  }
}
