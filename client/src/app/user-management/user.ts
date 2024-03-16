export class User {

  id: number;
  name: string;
  icon: string;
  admin: boolean;


  constructor(id: number, name: string, icon: string, admin: boolean) {

    this.id  = id;
    this.name = name;
    this.icon = icon;
    this.admin = admin;
  }
}
