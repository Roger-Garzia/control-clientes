import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  @ViewChild('clienteForm') clienteForm: NgForm;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private clientService: ClienteService, private fs: FlashMessagesService) { }

  ngOnInit() {
    this.clientService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    })
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if(this.clientes) {
      this.clientes.forEach(cliente => {
        saldoTotal += cliente.saldo;
      })
    }
    return saldoTotal;
  }

  agregar({value, valid}: {value: Cliente, valid: boolean}) {
    if(!valid) {
      this.fs.show('Por favor llena el Formulario Correctamente', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
    } else {
      // Se agrega el nuevo Cliente
      this.clientService.agregarCliente(value);
      this.clienteForm.resetForm();
      this.closeModal();
    }
  }

  private closeModal() {
    this.closeBtn.nativeElement.click();
  }

}
