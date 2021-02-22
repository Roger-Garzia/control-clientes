import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id: string;

  constructor(private clientService: ClienteService, 
              private flashMessages: FlashMessagesService, 
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getCliente(this.id).subscribe(cliente => {
      this.cliente = cliente;
    });
  }

  guardar({value, valid}: {value: Cliente, valid: boolean}) {
    if(!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
    } else {
      value.id = this.id;
      // Editar cliente
      this.clientService.clientEdition(value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if(confirm('Seguro que desea Eliminar un Cliente?')) {
      this.clientService.clientDelete(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
