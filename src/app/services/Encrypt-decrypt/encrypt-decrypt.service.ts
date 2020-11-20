import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {
  tokenFromUI: string = environment.encryptionKey;
  encrypted: any ;
  decrypted!: string;
  request!: string;
  responce!: string;
  constructor() {
  }
  encrypt(value:any) {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let encrypted:any = CryptoJS.AES.encrypt(
      JSON.stringify(value), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    encrypted =  encodeURIComponent(encrypted.toString());
    return encrypted;
  }

  decrypt(value:any) {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    this.decrypted = CryptoJS.AES.decrypt(
        decodeURIComponent(value), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
      if(this.decrypted) {
        return JSON.parse(this.decrypted);
      } else {
        return this.decrypted;
      }
  }
}
