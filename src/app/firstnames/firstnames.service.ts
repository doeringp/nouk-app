import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import { sampleFirstNames } from './seed-data';
import { FirstName, Gender } from './models';

@Injectable({ providedIn: 'root' })
export class FirstNamesService {
  db: PouchDB.Database;

  constructor() {
    PouchDB.plugin(PouchDBFind);
    this.db = new PouchDB('firstnames');

    // seed initial firstnames.
    this.db.info().then(info => {
      if (info.doc_count === 0) {
        this.db.bulkDocs(sampleFirstNames);
      }
    });

    this.db.createIndex({
      index: { fields: ['name']}
    });
    this.db.createIndex({
      index: { fields: ['gender', 'rating'] },
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
    item._rev = res.rev;
  }

  public async remove(item: FirstName): Promise<void> {
    let res = await this.db.remove(item._id, item._rev);
    if (!res.ok)
      throw "removing the firstname failed.";
  }

  public async list(gender?: Gender): Promise<FirstName[]> {
    const res = await this.db.find({
      selector: {
        'gender': gender,
        'rating': { '$gt': -1 },
      },
      sort: [{'rating': 'desc'}],
      limit: 5
     });
     return this.toList(res.docs);
  }

  public async searchNames(term: string): Promise<FirstName[]> {
    if (!term) {
      return [];
    }
    const res = await this.db.find({
      selector: {
        name: { '$regex': new RegExp('.*' + this.escapeRegExp(term) + '.*', 'i') }
      }
    });
    return this.toList(res.docs);
  }

  private toList(docs: any): FirstName[] {
    const list: FirstName[] = [];
    for(let doc of docs) {
     list.push(doc);
    }
    return list;
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
}
