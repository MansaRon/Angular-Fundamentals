import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

type ValidatorOptions = {
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

interface ControlSchema {
  validators?: ValidatorOptions & { errors?: Record<string, unknown> };
  value?: string;
  disabled?: boolean;
}

type GroupSchema = Record<string, ControlSchema>;

type Schema = Record<string, ControlSchema | GroupSchema[]>;

export class FormBuilder {
  static buildform(schema: Schema, form: FormGroup, options?: { validateErrors?: boolean }) {
    Object.keys(schema).forEach((key: string) => {
      const node = schema[key];
      if (!Array.isArray(node) && node?.validators) {
        const { controller, validators } = this.buildFormControllers(key, node as ControlSchema);
        form.addControl(
          `${controller.key}`,
          new FormControl<string>(
            { value: controller.values.value as string, disabled: controller.values.disabled },
            validators,
          ),
        );
      } else if (Array.isArray(node)) {
        const groups: FormGroup[] = [];
        node.forEach((entry: GroupSchema) => {
          const formGroup = this.buildFormGroupControllers(entry);
          groups.push(new FormGroup(formGroup));
        });

        form.addControl(`${key}`, new FormArray(groups));

        if (options?.validateErrors) {
          this.buildFormErrors(schema);
        }
      }
    });

    return form;
  }

  static buildFormErrors(schema: Schema) {
    const errors: Record<string, unknown> = {};
    Object.keys(schema).forEach((key: string) => {
      const node = schema[key];
      if (!Array.isArray(node) && node?.validators?.errors) {
        errors[key] = node.validators.errors;
      }
    });

    return errors;
  }

  static setValidators(options?: ValidatorOptions): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (options) {
      Object.keys(options).forEach((key: string) => {
        switch (key) {
          case 'required':
            if (options['required']) {
              validators.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            validators.push(Validators.requiredTrue);
            break;
          case 'email':
            validators.push(Validators.email);
            break;
          case 'minLength':
            validators.push(Validators.minLength(options['minLength'] as number));
            break;
          case 'maxLength':
            validators.push(Validators.maxLength(options['maxLength'] as number));
            break;
          case 'pattern':
            validators.push(Validators.pattern(options['pattern'] as string));
            break;
          default:
            break;
        }
      });
    }
    return validators;
  }

  static buildFormControllers(key: string, childSchema: ControlSchema) {
    const validators = this.setValidators(childSchema.validators);

    const controller = {
      key: `${key}`,
      values: {
        value: childSchema.value,
        disabled: childSchema.disabled || false,
      },
    };

    return { controller, validators };
  }

  static buildFormGroupControllers(childSchema: GroupSchema) {
    const formGroup: Record<string, FormControl> = {};
    Object.keys(childSchema).forEach((childKey: string) => {
      if (childSchema[childKey]?.validators) {
        const { controller, validators } = this.buildFormControllers(
          childKey,
          childSchema[childKey],
        );

        formGroup[`${childKey}`] = new FormControl<string>(
          { value: controller.values.value as string, disabled: controller.values.disabled },
          validators,
        );
      }
    });
    return formGroup;
  }
}
