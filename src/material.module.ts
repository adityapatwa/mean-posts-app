import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule
  ]
})
export class MaterialModule {

}

