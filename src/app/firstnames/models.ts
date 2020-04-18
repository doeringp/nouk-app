export class FirstName {

  constructor(values?: { gender?: Gender, name?: string, meaning?: string }) {
    if (values) {
      this.gender = values.gender;
      this.name = values.name;
      this.meaning = values.meaning;
    }
    this.createdAt = new Date();
  }

  _id: string;
  _rev: string;
  gender: Gender;
  name: string;
  meaning: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
}

export enum Gender {
  Male,
  Female
}
