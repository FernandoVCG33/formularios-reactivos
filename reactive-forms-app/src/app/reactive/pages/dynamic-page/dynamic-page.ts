import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './dynamic-page.html',
})
export class DynamicPage {
    private  fb = inject(FormBuilder);
    myForm:FormGroup=this.fb.group({
        name:['',Validators.required, Validators.minLength(3)],
        favoriteGames:this.fb.array([
          ['Metal Gear' , Validators.required],
          ['FIFA' , Validators.required],
        ], Validators.minLength(3)),
      })
}
