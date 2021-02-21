import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/models/configuracion.model';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  allowAccess = false;

  constructor(private router: Router, private configuracionService: ConfiguracionService) { }

  ngOnInit() {
    this.configuracionService.getConfiguracion().subscribe((configuracion: Configuracion) => {
      this.allowAccess = configuracion.allowAccess;
    })
  }

  guardar() {
    let configuracion = {allowAccess: this.allowAccess};
    this.configuracionService.modificarConfiguracion(configuracion);
    this.router.navigate(['/']);
  }

}
