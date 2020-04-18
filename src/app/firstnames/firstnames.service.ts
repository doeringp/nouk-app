import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { sampleFirstNames } from './seed-data';
import { FirstName, Gender } from './models';

@Injectable({ providedIn: 'root' })
export class FirstNamesService {
  db: PouchDB.Database;

  constructor() {
    this.db = new PouchDB('firstnames');

    // seed initial firstnames.
    this.db.info().then(info => {
      if (info.doc_count === 0) {
        this.db.bulkDocs(sampleFirstNames);
      }
    });
  }

  public get(id: string) : Promise<FirstName> {
    return this.db.get(id);
  }

  public async add(item: FirstName): Promise<string> {
    const res = await this.db.post(item);
    if (!res.ok)
      throw "saving the firstname failed.";
    return res.id;
  }

  public async update(item: FirstName): Promise<void> {
    const res = await this.db.put(item);
    if (!res.ok)
      throw "saving the firstname failed.";
  }

  public async remove(item: FirstName): Promise<void> {
    let res = await this.db.remove(item._id, item._rev);
    if (!res.ok)
      throw "removing the firstname failed.";
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
}
