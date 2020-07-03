export class RegisterRequest {

  username: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  pesel: string;
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  postCode: string;

  constructor(username: string, password: string, firstname: string, lastname: string, dateOfBirth: string, pesel: string,
              email: string, phoneNumber: string, street: string, city: string, postCode: string) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.dateOfBirth = dateOfBirth;
    this.pesel = pesel;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.street = street;
    this.city = city;
    this.postCode = postCode;
  }
}
