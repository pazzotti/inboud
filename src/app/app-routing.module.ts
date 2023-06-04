import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContratosComponent } from './contratos/contratos.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { TelaUserComponent } from './tela-user/tela-user.component';
import { TelaUserComponentTransport } from './tela-user-transport/tela-user-transport.component';
import { Contrato_EADIComponent } from './contrato-eadi/contrato-eadi.component';
import { Contrato_RedexComponent } from './contrato-redex/contrato-redex.component';
import { Contrato_TransportadoraComponent } from './contrato-transportadora/contrato-transportadora.component';
import { Contrato_TerminalComponent } from './contrato-terminal/contrato-terminal.component';
import { Locais_DestinoComponent } from './locais-destino/locais-destino.component';
import { Locais_OrigemComponent } from './locais-origem/locais-origem.component';


const routes: Routes = [
  {path:'contratos',component:HomeComponent},
  {path:'',component:TelaUserComponent},
  {path:'atualiza',component:AtualizarComponent},
  {path:'userScreen',component:TelaUserComponent},
  {path:'userScreenTransport',component:TelaUserComponentTransport},
  {path:'contrato_EADI',component:Contrato_EADIComponent},
  {path:'contrato_Redex',component:Contrato_RedexComponent},
  {path:'contrato_Transportadora',component:Contrato_TransportadoraComponent},
  {path:'contrato_terminal',component:Contrato_TerminalComponent},
  {path:'locais_destino',component:Locais_DestinoComponent},
  {path:'locais_origem',component:Locais_OrigemComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
