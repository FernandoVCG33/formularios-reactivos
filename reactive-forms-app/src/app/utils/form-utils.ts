import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

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
      }
    }
    return null;
  }
}
