import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContratosComponent } from './contratos/contratos.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { TelaUserComponent } from './tela-user/tela-user.component';

const routes: Routes = [
  {path:'contratos',component:HomeComponent},
  {path:'',component:TelaUserComponent},
  {path:'atualiza',component:AtualizarComponent},
  {path:'userScreen',component:TelaUserComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
