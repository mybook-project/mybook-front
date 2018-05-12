import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RequestOptions} from '@angular/http';

@Injectable()
export class DemoService {

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get('http://localhost:8080/api/book/all');
  }

  getUser(name: string) {
    return this.http.get('http://localhost:8080/api/user/' + name);
  }

  postStats(stat) {
    return this.http.post('http://localhost:8080/api/statistic/add', stat);
  }

  postUser(user) {
    return this.http.post('http://localhost:8080/api/user/add', user);
  }

  putUser(user) {
    return this.http.put('http://localhost:8080/api/user/update', user);
  }

  putStat(stat) {
    return this.http.put('http://localhost:8080/api/statistic/update', stat);
  }

  postComment(comment) {
    return this.http.post('http://localhost:8080/api/comment/add', comment);
  }

}
