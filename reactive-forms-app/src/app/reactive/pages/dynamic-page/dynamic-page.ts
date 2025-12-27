import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';

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
    formUtils= FormUtils;
    myForm:FormGroup=this.fb.group({
        name:['',Validators.required, Validators.minLength(3)],
        favoriteGames:this.fb.array([
          ['Metal Gear' , Validators.required],
          ['FIFA' , Validators.required],
        ], Validators.minLength(3)),
      });
    get favoriteGames(){
      return this.myForm.get('favoriteGames') as FormArray;
    }

    isValidFieldArray(formArray: FormArray, index:number) {
        return (
          formArray.controls[index].errors && formArray.controls[index].touched
        );
    }
    newFavorite=this.fb.control('', Validators.required);

   onaddToFavorites() {
        if(this.newFavorite.invalid) return;
        const newGame=this.newFavorite.value;
  }
}
