import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { sampleFirstNames } from './seed-data';
import { FirstName, Gender } from './models';

@Injectable({ providedIn: 'root' })
export class FirstNamesService {
  db: PouchDB.Database;

  constructor() {
    this.db = new PouchDB('firstnames');

    this.db.info().then(info => {
      if (info.doc_count === 0) {
        this.seedSampleData();
      }
    });
  }

  public async create(item: FirstName): Promise<string> {
    const res = await this.db.post(item);
    if (!res.ok)
      throw "saving the object failed.";
    return res.id;
  }

  public async list(gender?: Gender): Promise<FirstName[]> {
     const res = await this.db.allDocs<FirstName>({include_docs: true, descending: true});
     const list = [];
     for(let i = 0; i < res.rows.length; i++) {
      let name: FirstName = res.rows[i].doc;
      if (gender == null) {
        list.push(name);
        continue;
      }
      if (name.gender === gender) {
        list.push(name);
      }
    }
    return list;
  }

  public async searchNames(term: string): Promise<FirstName[]> {
    if (!term) {
      return [];
    }
    const result = await this.list();
    return result.filter(
      n => n.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
  }

  private seedSampleData() {
    for(let name of sampleFirstNames) {
      this.create(name);
    }
  }
}
