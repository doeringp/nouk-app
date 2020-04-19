import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import { sampleFirstNames } from './seed-data';
import { FirstName, Gender } from './models';

@Injectable({ providedIn: 'root' })
export class FirstNamesService {
  db: PouchDB.Database;
  dbInitialized: Promise<void>;

  constructor() {
    this.dbInitialized = this.initDb();
  }

  async initDb(): Promise<void> {
    PouchDB.plugin(PouchDBFind);
    this.db = new PouchDB('firstnames');

    // seed initial firstnames.
    this.db.info().then(info => {
      if (info.doc_count === 0) {
        this.db.bulkDocs(sampleFirstNames);
      }
    });

    await this.db.createIndex({
      index: { fields: ['name']}
    });
    await this.db.createIndex({
      index: { fields: ['gender', 'rating'] },
    });
  }

  public async get(id: string) : Promise<FirstName> {
    await this.dbInitialized;
    return await this.db.get(id);
  }

  public async add(item: FirstName): Promise<string> {
    await this.dbInitialized;
    const res = await this.db.post(item);
    if (!res.ok)
      throw "saving the firstname failed.";
    return res.id;
  }

  public async update(item: FirstName): Promise<void> {
    await this.dbInitialized;
    const res = await this.db.put(item);
    if (!res.ok)
      throw "saving the firstname failed.";
    item._rev = res.rev;
  }

  public async remove(item: FirstName): Promise<void> {
    await this.dbInitialized;
    let res = await this.db.remove(item._id, item._rev);
    if (!res.ok)
      throw "removing the firstname failed.";
  }

  public async list(gender?: Gender): Promise<FirstName[]> {
    await this.dbInitialized;
    const res = await this.db.find({
      selector: {
        'gender': gender,
        'rating': { '$gt': -1 },
      },
      sort: [{'gender': 'desc'}, {'rating': 'desc'}],
      limit: 5
     });
     return this.toList(res.docs);
  }

  public async searchNames(term: string): Promise<FirstName[]> {
    if (!term) {
      return [];
    }
    await this.dbInitialized;
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
