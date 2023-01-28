
export class SignUpForm {
    public email!: string;
    public userName!: string;
    public password!: string;
    public fullName!: string;
    public avatar!: string;
  constructor(email: string, username: string, password: string, name: string, avatar: string) {
    this.email = email;
    this.userName = username;
    this.password = password;
    this.fullName = name;
    this.avatar = avatar;
  }
}


