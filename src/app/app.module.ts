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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LiveFormDialogComponent,
    AtualizarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
