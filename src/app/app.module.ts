import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// FireStore
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';

// Services
import { ClienteService } from './services/cliente.service';
import { LoginService } from './services/login.service';
import { ConfiguracionService } from './services/configuracion.service';

// Guardias
import { AuthGuard } from './authGuard/auth.guard';
import { ConfiguracionGuard } from './authGuard/configuracion.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableroComponent,
    ClientesComponent,
    EditarClienteComponent,
    LoginComponent,
    RegistroComponent,
    ConfiguracionComponent,
    NoEncontradoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, 'users-management'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ClienteService, LoginService, ConfiguracionService ,AuthGuard, ConfiguracionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
