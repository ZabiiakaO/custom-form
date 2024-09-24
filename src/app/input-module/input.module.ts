import { NgModule } from '@angular/core';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgClass, NgIf } from '@angular/common';

@NgModule({
  declarations: [
    TextInputComponent,
  ],
  exports: [
    TextInputComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgClass,
    JsonPipe,
  ],
})
export class InputModule { }
