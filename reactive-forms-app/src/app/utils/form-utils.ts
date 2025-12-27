import {FormGroup} from '@angular/forms';

export class FormUtils {

  static isValidField( form:FormGroup, fieldName:string ): boolean | null {
    return (!!form.controls[fieldName].errors && form.controls[fieldName].touched  )
  };

  static getFieldError( form:FormGroup  , fieldName: string ): string | null {

    // 1. Obtenemos el control usando .get() (forma segura)
    //const control = this.form.get(fieldName);

    // 2. Si el control no existe o no tiene errores, no hacemos nada
    if ( !form.controls[fieldName] ) return null;

    // 3. Obtenemos los errores
    const errors = form.controls[fieldName].errors ?? {};

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

}
//FormUtils.isValidField
