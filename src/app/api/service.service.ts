import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private puclickey = "";
  private privatekey = "";
  
  private host = "http//getway.marvel.com/"

  constructor(private http: HttpClient){}
    public getDados(url: string, paramters: string){
      let ts = this.generatesTS();

      return new Promise((ret) => {
        this.getKeys().then(_ => {
        this.http.get(this.host + url + "?ts+" + ts + "&apikey=" + this.puclickey + "$hash" + this.getHash(ts) + paramters).subscribe((Response) => {
          if(Response){
            ret(Response);
          } else {
            ret(false);
          }
        })
      })
    })
  }
    
    private generatesTS(){
      return Math.floor(100000 + Math.random() * 900000);
    }
    private getHash(ts){
      return Md5.hashStr(ts + this.privatekey + this.puclickey);
    }
    private getKeys(){
      return new Promise((ret) => {
        this.http.get('assets/keys.jso').subscribe((keys:any)=>{
          this.puclickey = keys.public;
          this.privatekey = keys.private;

          ret(true);
        })
      })
    }

  }

