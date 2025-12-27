import {AbstractControl, FormArray, FormGroup, ValidationErrors} from '@angular/forms';



async function sleep(){
  return new Promise(resolve =>
    setTimeout(()=>
    {
      resolve(true)
    },2000)
  );
}


export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(form: FormGroup, fieldName: string): boolean {
    // Se ha simplificado la expresión y se ha asegurado que siempre devuelva un booleano.
    return !!(form.controls[fieldName]?.errors && form.controls[fieldName]?.touched);
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    const control = form.get(fieldName);

    if (!control || !control.errors) return null;

    const errors = control.errors;

    return FormUtils.getTextErrors(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number): boolean {
    const control = formArray.at(index);
    // Se utiliza el encadenamiento opcional (?.) para evitar errores si el control no existe.
    return !!(control?.errors && control?.touched);
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    const control = formArray.at(index);

    if (!control || !control.errors) return null;

    const errors = control.errors;

    return FormUtils.getTextErrors(errors);
  }

  /**
   * Obtiene el texto de error a partir de un objeto de errores de validación.
   * Se cambió el tipo de 'ValidationError' a 'ValidationErrors' de '@angular/forms'.
   * @param errors - El objeto de errores de validación.
   * @returns El mensaje de error o null si no se encuentra ninguno.
   */
  static getTextErrors(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          const minLengthError = errors['minlength'];
          return `Mínimo ${minLengthError.requiredLength} caracteres.`;
        case 'min':
          const minError = errors['min'];
          return `El valor mínimo es ${minError.min}.`;
        case 'email':
          return 'El formato del email no es válido.';
        // Puedes añadir más casos de validación aquí
        default:
          return 'Campo inválido';
      }
    }
    return null;
  }
  static isFielEqualFirldTwo(field1: string, field2: string){
    return (formGroup: AbstractControl)=>{
      const field1Value= formGroup.get(field1)?.value;
      const field2Value= formGroup.get(field2)?.value;
      return field1Value === field2Value ? null : { passwordsNotEqual: true};
    }
  }
  static async checkinServerResponse(control: AbstractControl):Promise< ValidationErrors | null> {
    await sleep(); //se espera 2.30 segundos
    const formValue = control.value
    if(formValue === 'hola@mundo.com'){
       return {
         emailTaken:true
       };
    }
    return  null;
  }
}
