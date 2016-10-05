import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  storage: any;

  constructor() {
    if (typeof chrome.storage !== 'undefined') {
      this.storage = chrome.storage.sync;
      console.log(this.storage);
    }
  }

  get(key: string | Object) : Promise<any> {
    if (!!this.storage) {
      return new Promise((resolve, reject) => {
        this.storage.get(key, resolve);
      });
    }

    return Promise.resolve({});
  }

  set(items: any) : Promise<void> {
    if (!!this.storage) {
      return new Promise((resolve, reject) => {
        this.storage.set(items, resolve);
      });
    }

    return Promise.resolve();
  }

  remove(key: string) : Promise<void> {
    if (!!this.storage) {
      return new Promise((resolve, reject) => {
        this.storage.remove(key, resolve);
      });
    }

    return Promise.resolve();
  }

  clear() : Promise<void> {
    if (!!this.storage) {
      return new Promise((resolve, reject) => {
        this.storage.clear(resolve);
      })
    }

    return Promise.resolve();
  }

}
