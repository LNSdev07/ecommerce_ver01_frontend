
export class SignUpForm {
    public email!: string;
    public userName!: string;
    public password!: string;
    public fullName!: string;
    public avatar!: string;
    public gender!: number;
    public phoneNumber!: string;
    public address!: string;


  constructor(email: string, userName: string,
              password: string, fullName: string,
              avatar: string, gender: number,
              phoneNumber: string, address: string) {
    this.email = email;
    this.userName = userName;
    this.password = password;
    this.fullName = fullName;
    this.avatar = avatar;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.gender = gender;
  }
}


