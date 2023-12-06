import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Chat, Message } from '../dataStructure';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  /*
  https://www.baeldung.com/spring-mvc-controller-custom-http-status-code
  */

  private baseUrl: string = 'http://localhost:8080/api';
  //private baseUrl: string = 'http://ip:8080/api';
  // https://stackoverflow.com/questions/43492354/how-to-allow-access-outside-localhost

  // to import service
  private importZips: string = '/upload/zips';
  private importFolder: string = '/upload/folder';
  // to userservice
  private userGetUser: string = '/user';
  private userGetChats: string = '/user/chats';
  private userInsertUser: string = '/user/new';
  private userLogin: string = '/user/login';
  private userUpdateEmail: string = '/update/email';
  private userUpdatePass: string = '/update/pass';
  private userUpdatePhone: string = '/update/phone';
  // to chatservice
  private chatGetChat: string = '/chat';
  private chatGetMessages: string = '/chat/messages';
  private chatUpdateName: string = '/chat/name';
  private chatUpdateOwnerChat: string = '/chat/owner';
  // to export service
  private exportAttachment: string = "/download";

  constructor(private http: HttpClient) {}

  // to importService
  // /api/upload/zips?user=1
  uploadZips(user: number, files: File[]): Observable<HttpResponse<any>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('user', user);
    let formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      formData.append('file', files[index]);
    }
    return this.http.post<HttpResponse<any>>(
      this.baseUrl + this.importZips,
      formData,
      { params: queryParams, observe: 'response' }
    );
  }

  /**
   * api/upload/folder?user=1
   * @param user on url
   * @param name on body
   * @param files on body
   * @returns 
   */
  uploadFolder(
    user: number,
    name: string,
    files: File[]
  ): Observable<HttpResponse<any>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('user', user);
    let formData = new FormData();
    formData.append('namechat', name);
    for (let index = 0; index < files.length; index++) {
      formData.append('file', files[index]);
    }
    return this.http.post<HttpResponse<any>>(
      this.baseUrl + this.importFolder,
      formData,
      { params: queryParams, observe: 'response' }
    );
  }

  // to userService
  // /user?id=1
  getUser(id: number): Observable<User> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('id', id);
    return this.http.get<User>(this.baseUrl + this.userGetUser, {
      params: queryParams,
    });
  }

  // /user/chats?id=1
  getChats(id: number): Observable<Chat[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('id', id);
    return this.http.get<Chat[]>(this.baseUrl + this.userGetChats, {
      params: queryParams,
    });
  }

  /* da scrivere  
  userInsertUser: string = "/user/new"; 
  userUpdateEmail: string = "/update/email";
  userUpdatePass: string = "/update/pass";
  userUpdatePhone: string = "/update/phone"
  */

  // /user/new
  InsertUser(registerform: any): Observable<HttpResponse<any>> {
    let header = new HttpHeaders();
    header = header.set('content-type', 'application/json');
    return this.http.post<HttpResponse<any>>(
      this.baseUrl + this.userInsertUser,
      registerform,
      { headers: header, observe: 'response' }
    );
  }

  // /user/login
  getLogin(loginForm: any): Observable<User> {
    let header = new HttpHeaders();
    header = header.set('content-type', 'application/json');
    return this.http.post<User>(this.baseUrl + this.userLogin, loginForm, {
      headers: header,
      observe: 'body',
    });
  }

  // to chatService
  // /chat?id=1
  getAChat(id: number): Observable<Chat> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('id', id);
    return this.http.get<Chat>(this.baseUrl + this.chatGetChat, {
      params: queryParams,
    });
  }

  // /chat/messages?id=1
  getMessages(id: number): Observable<Message[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('id', id);
    return this.http.get<Message[]>(this.baseUrl + this.chatGetMessages, {
      params: queryParams,
    });
  }

  // /chat/name?id=1&name=miao
  updateNameChat(id: number, name: string): Observable<HttpResponse<any>> {
    let header = new HttpHeaders();
    header = header.set('content-type', 'application/json');
    let queryParams = new HttpParams();
    queryParams = queryParams.set('id', id);
    return this.http.patch<HttpResponse<any>>(
      this.baseUrl + this.chatUpdateName,
      name,
      {
        params: queryParams,
        headers: header,
        observe: 'response',
      }
    );
  }

  // /chat/owner?id=1
  updateNameOwner(id: number, owner: any): Observable<Chat> {
    let header = new HttpHeaders();
    header = header.set('content-type', 'application/json');
    let queryParams = new HttpParams();
    queryParams = queryParams.set('id', id);
    return this.http.patch<Chat>(
      this.baseUrl + this.chatUpdateOwnerChat,
      owner,
      {
        params: queryParams,
        headers: header,
        observe: 'body',
      }
    );
  }

  // to export service
  // /download?user=1&chat=1&file=nome.estenzione
  getAttachment(idUser: number, idChat: number, name: string, type: string) {
    
    let queryParams = new HttpParams();
    queryParams = queryParams.set('user', idUser);
    queryParams = queryParams.set('chat', idChat);
    queryParams = queryParams.set('file', name);
    return this.http.get(this.baseUrl + this.exportAttachment, {
      params: queryParams,
       responseType: 'blob'
    });
    
  }
  getLinkAttachment(idUser: number, idChat: number, name: string, type: string) {
   return this.baseUrl+this.exportAttachment+"?user="+idUser+"&chat="+idChat+"&file="+name;
  }
}
