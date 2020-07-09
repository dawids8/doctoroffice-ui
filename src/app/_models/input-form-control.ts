import {AbstractControl, FormControl, Validators} from '@angular/forms';

export class InputFormControl extends FormControl {
  firstname;
  lastname;
  username;
  password;
  pesel;
  dateOfBirth;
  email;
  phoneNumber;
  street;
  city;
  postCode;
  accountType;

  constructor() {
    super();
    this.firstname = new FormControl('', Validators.required);
    this.lastname = new FormControl('', Validators.required);
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.minLength(6));
    this.pesel = new FormControl('', [Validators.minLength(11), Validators.maxLength(11)]);
    this.dateOfBirth = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.email);
    this.phoneNumber = new FormControl('', Validators.minLength(9));
    this.street = new FormControl('', Validators.required);
    this.city = new FormControl('', Validators.required);
    this.postCode = new FormControl('', Validators.required);
    this.accountType = new FormControl('Patient', Validators.required);
  }

  controls: {
    [key: string]: AbstractControl;
  };

  get invalid(): boolean {
    return super.invalid;
  }
}
