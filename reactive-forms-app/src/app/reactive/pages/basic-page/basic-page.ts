import { Component, inject } from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './basic-page.html',
})
export class BasicPage {
  private fb= inject(FormBuilder);

  myForm=this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    price:[0, [Validators.required, Validators.min(10)]],
    inStorage:[0, [Validators.required, Validators.min(0)]],
  })

  //protected readonly FormGroup = FormGroup;
}
