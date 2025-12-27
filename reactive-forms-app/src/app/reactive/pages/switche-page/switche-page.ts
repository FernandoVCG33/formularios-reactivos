import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';

@Component({
  selector: 'app-switche-page',
  imports: [
    JsonPipe,ReactiveFormsModule
  ],
  templateUrl: './switche-page.html',
})
export class SwitchePage {
    private fb=inject(FormBuilder);
    formUtils=FormUtils;
    myForm:FormGroup=this.fb.group({
      gender:['M',Validators.required],
      wantNotification:[true],
      termsAndConditions:[false,Validators.requiredTrue]

    });

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
}
