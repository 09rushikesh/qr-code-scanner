import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannerScreenComponent } from './components/scanner-screen/scanner-screen.component';
import { LOAD_WASM, NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
LOAD_WASM().subscribe()

@NgModule({
  declarations: [
    AppComponent,
    ScannerScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxScannerQrcodeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
