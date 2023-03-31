import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CurrentUser {

  private username: string | null = null;
  private password: string | null = null;
  private _isAdmin: boolean | null = null;



  constructor() {
  }

  public getCredentials() : string {

    return  CurrentUser.b64EncodeUnicode(this.username + ':' + this.password)

  }

  public static b64EncodeUnicode(str: string): string {
    // generating constant prevents 'Expression form not supported.' error
    const rawString = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(('0x' + p1) as any))
    return btoa(rawString)
  }

  public setUser(username: string, password: string, isAdmin: any): void {
    this.username = username;
    this.password = password;
    this._isAdmin = isAdmin;
  }

  isLoggedIn() {
    return this.username != null;
  }

  clear() {
    this.username = null;
    this.password = null;
    this._isAdmin = null;
  }


  get isAdmin(): boolean | null {
    return this._isAdmin;
  }
}
