import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  formUtils=FormUtils;
  private fb=inject(FormBuilder);
  myForm:FormGroup= this.fb.group({
      name:['', Validators.required,Validators.pattern(FormUtils.namePattern)],
      email:['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
      username:['', [ Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern)]],
      password:['', [Validators.required, Validators.minLength(6)]],
      password2:['', [Validators.required]],
  });
  onSubmit(){
    this.myForm.markAllAsTouched();
    this.myForm.value;
  }
}
