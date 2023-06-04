import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { LiveFormDialogComponent } from './app/home/live-form-dialog/live-form-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { Contrato_EADIComponent } from './contrato-eadi/contrato-eadi.component';
import { Contrato_TerminalComponent } from './contrato-terminal/contrato-terminal.component';
import { Contrato_RedexComponent } from './contrato-redex/contrato-redex.component';
import { Contrato_TransportadoraComponent } from './contrato-transportadora/contrato-transportadora.component';
import { Locais_OrigemComponent } from './locais-origem/locais-origem.component';
import { Locais_DestinoComponent } from './locais-destino/locais-destino.component';
import { FormularioLocaisComponent } from './formulario_locais/formulario_locais';
import { TelaUserComponentTransport } from './tela-user-transport/tela-user-transport.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LiveFormDialogComponent,
    AtualizarComponent,
    Contrato_EADIComponent,
    Contrato_TerminalComponent,
    Contrato_RedexComponent,
    Contrato_TransportadoraComponent,
    Locais_OrigemComponent,
    Locais_DestinoComponent,
    FormularioLocaisComponent,
    TelaUserComponentTransport

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    ProgressbarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
