import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISignUpForm } from './interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SignUpFormService } from '../sign-up-form.service';
import {
  combineLatest,
  distinctUntilChanged,
  map, skipWhile,
  startWith,
} from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit{

  public emailErrorText: string = '';
  public passwordErrorText: string = '';
  public confirmPasswordErrorText: string = '';
  public isSubmitDisable: boolean = true;

  public signUpForm = new FormGroup<ISignUpForm>({
    email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(
    private destroyRef: DestroyRef,
    private signUpService: SignUpFormService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.subscribeOnFormChange();
  }

  public submit(): void {
    this.signUpService.sendSignUpRequest(this.signUpForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: responce => {
        console.log(responce)
        if(responce){
          this.toastr.success('Success submit!');
        }
      },
      error: err => {
        this.toastr.error('Something went wrong:((');
        console.warn(err);
      }
    });
  }

  private subscribeOnFormChange(): void {
    const emailChanged = this.signUpForm.controls.email.valueChanges;
    const passwordChanged = this.signUpForm.controls.password.valueChanges;
    const confirmPasswordChanged = this.signUpForm.controls.confirmPassword.valueChanges;
    combineLatest([
      emailChanged.pipe(
        distinctUntilChanged(),
        map(value => this.validateEmail(value))
      ).pipe(startWith(false)),
      passwordChanged.pipe(
        skipWhile(v => !this.signUpForm.touched),
        distinctUntilChanged(),
        map(value => this.validatePassword(value))
      ).pipe(startWith(false)),
      confirmPasswordChanged.pipe(
        skipWhile(v => !this.signUpForm.touched),
        distinctUntilChanged(),
        map(value => this.validateConfirmPassword(value))
      ).pipe(startWith(false))
    ]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([isEmailValid, isPasswordValid, isConfirmPasswordValid]) => {
      if(isEmailValid && isPasswordValid && isConfirmPasswordValid){
        this.isSubmitDisable = false;
      }
    });
  }

  private validateEmail(email: string) {
    const errors = this.signUpForm.controls.email.errors;
    if(errors && errors['required']) {
      this.emailErrorText = 'Email is required';
      return false;
    }
    if(errors && errors['pattern']) {
      this.emailErrorText = 'Input valid email address';
      return false;
    }
    this.emailErrorText = '';
    return true;
  }

  private validatePassword(password: string) {
    const errors = this.signUpForm.controls.password.errors;
    if(errors && errors['minlength']) {
      this.passwordErrorText = 'Password should be minimum 6 symbols';
      return false;
    }
    if(errors && errors['required']) {
      this.passwordErrorText = 'Password is required';
      return false;
    }
    this.passwordErrorText = ''
    return true;
  }

  private validateConfirmPassword(confirm: string) {
    if(this.signUpForm.controls.confirmPassword.errors) {
      this.confirmPasswordErrorText = `Confirm Password is required`
      return false
    }
    if(this.signUpForm.controls.confirmPassword.value !== this.signUpForm.controls.password.value) {
      this.confirmPasswordErrorText = `Confirm Password doesn't match Password`
      return false;
    }
    this.confirmPasswordErrorText = '';
    return true;
  }

  public resetForm(): void {
    this.signUpForm.reset();
    this.isSubmitDisable = true;
    this.emailErrorText = '';
    this.passwordErrorText = '';
    this.confirmPasswordErrorText = '';
  }
}
