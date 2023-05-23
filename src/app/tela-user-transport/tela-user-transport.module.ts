import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // <<<< import it here
import { TelaUserComponentTransport } from './tela-user-transport.component';






@NgModule({
  declarations: [TelaUserComponentTransport],
  imports: [CommonModule,MatIconModule,BrowserModule, FormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class TelaUserModuleTransport { }




