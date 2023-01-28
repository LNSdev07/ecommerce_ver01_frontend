import { Injectable } from '@angular/core';
import {Token} from "@angular/compiler";
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const AVATAR_KEY ='Avatar_Key';
const ROLE_KEY = 'Role_Key';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public roles: string[] | undefined

  constructor() { }

  public setToken(token: string){
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    // @ts-ignore
    return localStorage.getItem(TOKEN_KEY);
  }

  public setName(name: String){
    localStorage.removeItem(NAME_KEY);
    // @ts-ignore
    localStorage.setItem(NAME_KEY, name);
  }

  public getName(): string{
    // @ts-ignore
    return localStorage.getItem(NAME_KEY);
  }
  public setAvatar(avatar: string){
    // @ts-ignore
    localStorage.removeItem(AVATAR_KEY);
    // @ts-ignore
    localStorage.setItem(AVATAR_KEY, avatar);
  }

  public getAvatar(): string{
    // @ts-ignore
    return localStorage.getItem(AVATAR_KEY);
  }

  public setRoles(roles: string[]){
    localStorage.removeItem(ROLE_KEY);
    localStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }

  public getRoles(): string[] | undefined{
    if(this.getToken()){
      // @ts-ignore
      JSON.parse(localStorage.getItem(ROLE_KEY)).forEach(role =>{
        // @ts-ignore
        this.roles.push(role.authority);
      })
    }
    return this.roles;
  }


}
