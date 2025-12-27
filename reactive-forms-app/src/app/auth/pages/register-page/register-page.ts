import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [
    JsonPipe
  ],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private fb=inject(FormBuilder);
  myForm:FormGroup= this.fb.group({

  });
}
