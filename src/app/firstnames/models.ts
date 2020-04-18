export class FirstName {

  constructor(values?: { gender?: Gender, name?: string, meaning?: string }) {
    if (values) {
      this.gender = values.gender;
      this.name = values.name;
      this.meaning = values.meaning;
    }
  }

  _id: string;
  _rev: string;
  gender: Gender;
  name: string;
  meaning: string;
  likes: number = 0;
  dislikes: number = 0;
  rating: number = 0;
  lastRatedAt?: Date;
  createdAt: Date = new Date();
}

export enum Gender {
  Male,
  Female
}
