import { AbstractControl } from '@angular/forms';

export interface ISignUpForm{
  email: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;
}

export interface ISignUpBody{
  email?: string;
  password?: string;
  confirmPassword?: string;
}
