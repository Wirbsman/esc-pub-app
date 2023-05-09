import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CurrentUser {

  private _username: string | null = null;
  private password: string | null = null;
  private _isAdmin: boolean | null = null;


  constructor() {
  }

  public getCredentials(): string {

    return CurrentUser.b64EncodeUnicode(this._username + ':' + this.password)

  }

  public static b64EncodeUnicode(str: string): string {
    // generating constant prevents 'Expression form not supported.' error
    const rawString = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(('0x' + p1) as any))
    return btoa(rawString)
  }

  public setUser(username: string, password: string, isAdmin: any): void {
    this._username = username;
    this.password = password;
    this._isAdmin = isAdmin;
  }

  isLoggedIn() {
    console.log("isloggedin", this._username)
    return this._username != null;
  }

  clear() {
    this._username = null;
    this.password = null;
    this._isAdmin = null;
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('admin');
  }


  get isAdmin(): boolean | null {
    return this._isAdmin;
  }

  get username(): string | null {
    return this._username;
  }

  public save(): void {
    console.log("save")
    if (this._username && this.password && this._isAdmin !== null) {
      sessionStorage.setItem('username', this._username)
      sessionStorage.setItem('password', this.password)
      sessionStorage.setItem('admin', this._isAdmin.toString())
    }

  }

  load() {
    console.log("load")
    if(sessionStorage.getItem('username') !== null) {

      this._username = sessionStorage.getItem('username')
      this.password = sessionStorage.getItem('password')
      this._isAdmin = sessionStorage.getItem('admin') === 'true'
    }
  }
}
