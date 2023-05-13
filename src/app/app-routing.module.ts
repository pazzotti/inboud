import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContratosComponent } from './contratos/contratos.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'contratos',component:ContratosComponent},
  {path:'atualiza',component:AtualizarComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
