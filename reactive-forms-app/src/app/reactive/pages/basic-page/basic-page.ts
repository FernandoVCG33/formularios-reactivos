import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './basic-page.html',
})
export class BasicPage {

  private fb = inject(FormBuilder);

  formUtils= FormUtils;
  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  isValidField( fieldName: string ): boolean | null {
    // CORRECCIÓN: Usar .get()
    return this.myForm.get(fieldName)?.errors
      && this.myForm.get(fieldName)?.touched
      || null;
  }

  getFieldError( fieldName: string ): string | null {

    // 1. Obtenemos el control usando .get() (forma segura)
    const control = this.myForm.get(fieldName);

    // 2. Si el control no existe o no tiene errores, no hacemos nada
    if ( !control || !control.errors ) return null;

    // 3. Obtenemos los errores
    const errors = control.errors;

    // 4. Iteramos sobre las llaves de los errores
    for (const key of Object.keys(errors)) {
      switch ( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } carácteres.`;

        case 'min':
          return `El valor mínimo es ${ errors['min'].min }.`;
      }
    }

    return null;
  }
  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset({
      price: 100,
      inStorage: 50,
      name: 'Sin nombre'
    })
  }
}
