import { Task } from './../models/task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  path: string = '/assets/data.json';

  constructor(private http: HttpClient) { }

  load(): Observable<Task> {
    return this.http.get<Task>(`http://localhost:4200${this.path}`);
  }
}
