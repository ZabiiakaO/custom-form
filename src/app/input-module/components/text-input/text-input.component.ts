import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgModel,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ]
})
export class TextInputComponent implements AfterViewInit, ControlValueAccessor, Validator{

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = '';
  @Input() id: string = '';
  @Input() isDisabled: boolean = false;
  @Input() errorText: string = '';
  private innerValue: any = '';

  private onTouchedCallback: (event: any) => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  public writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  validate(control: AbstractControl): ValidationErrors|null {
    return {'custom': true};
  }

  public onTouched(value: any) {
    if(this.onTouchedCallback) {
      this.onTouchedCallback(value)
    }
  }

  public ngAfterViewInit(): void {
  }
}

