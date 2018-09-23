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

  user?: {userId: number, name: string};

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

  public get(field: string) {
    return this._feathers.get(field);
  }

  // expose authentication
  public authenticate(): Promise<any> {
    return this._feathers.authenticate()
      .then(response => {
        console.log('Logged in ', response);
        return this._feathers.passport.verifyJWT(response.accessToken);
      }).then(payload => {
        console.log('Payload ', payload);
        return this._feathers.service('users').get(payload.userId);
      }).then(user => {
        console.log('User ', user);
        this.user = user;
        return user;
      });
  }

  // expose logout
  public logout() {
    return this._feathers.logout();
  }
}
