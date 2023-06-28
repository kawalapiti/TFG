import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterContentChecked{
  user = '';
  constructor() { }
  ngAfterContentChecked() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnInit() {
    this.user = '';
  }

  async enterUser(){
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
