import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerScreenComponent } from './components/scanner-screen/scanner-screen.component';

const routes: Routes = [{
  path:'', component:ScannerScreenComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
