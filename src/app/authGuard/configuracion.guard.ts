import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfiguracionService } from '../services/configuracion.service';

@Injectable({
    providedIn: 'root'
})

export class ConfiguracionGuard implements CanActivate{
    constructor(private router: Router, private configuracionService: ConfiguracionService ){}


    canActivate(): Observable<boolean>{
        return this.configuracionService.getConfiguracion().pipe(
            map( configuracion => {
                if(configuracion.allowAccess){
                    return true;
                }
                else{
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}