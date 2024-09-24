import { NgModule } from '@angular/core';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { InputModule } from '../input-module/input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpFormService } from './sign-up-form.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SignUpFormComponent,
  ],
  imports: [
    InputModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    SignUpFormComponent,
  ],
  providers: [
    SignUpFormService,
  ]
})
export class FormsModule { }
