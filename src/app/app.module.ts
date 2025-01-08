import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './componentes/base.component';
import { XlsxModule } from './modulos/xlsx/xlsx.module';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    XlsxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
