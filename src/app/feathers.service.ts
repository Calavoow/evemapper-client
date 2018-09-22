import {Injectable} from '@angular/core';
import feathers from '@feathersjs/feathers';
import * as io from 'socket.io-client';
import feathersSocketIOClient from '@feathersjs/socketio-client';
import feathersAuthClient from '@feathersjs/authentication-client';

@Injectable({
  providedIn: 'root'
})
export class FeathersService {
  private _feathers = feathers();                     // init socket.io
  private _socket = io('http://localhost:3030');      // init feathers
  constructor() {
    this._feathers
      .configure(feathersSocketIOClient(this._socket))  // add socket.io plugin
      .configure(feathersAuthClient({                   // add authentication plugin
        storage: window.localStorage
      }));
  }

  // expose services
  public service(name: string) {
    return this._feathers.service(name);
  }

  // expose authentication
  public authenticate(): Promise<any> {
    return this._feathers.authenticate();
  }

  // expose logout
  public logout() {
    return this._feathers.logout();
  }
}
