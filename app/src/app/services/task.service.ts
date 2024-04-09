import { HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable,Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Task } from "../models/task";

@Injectable({
    providedIn:"root",
})


export class TaskService{
    private url = "Task"
    private subject = new Subject<boolean>();
    
    constructor (private http:HttpClient){ }
    
    public getTasks() : Observable<Task[]>
    {
        return this.http.get<Task[]>(`${environment.apiUrl}/${this.url}`);
    }

    public addTask(task : Task) : Observable<Task>
    {
        return this.http.post<Task>(`${environment.apiUrl}/${this.url}`,task);
    }

    public editTask(task : Task) : Observable<Task>
    {
        return this.http.put<Task>(`${environment.apiUrl}/${this.url}`,task);
    }
    public deleteTask(task : Task) : Observable<Task>
    {
        return this.http.delete<Task>(`${environment.apiUrl}/${this.url}/${task.id}`);
    }

    public sendUpdate() { //the component that wants to update something, calls this fn
        this.subject.next(true) //next() will feed the value in Subject
    }

    public getUpdate(): Observable<any> { //the receiver component calls this function 
        return this.subject.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
    }
}