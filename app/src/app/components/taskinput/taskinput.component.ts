import { TableComponent } from './../table/table.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-taskinput',
  templateUrl: './taskinput.component.html',
  styleUrls: ['./taskinput.component.css']
})
export class TaskinputComponent implements OnInit {

  addTaskName : string = "";
  addTaskDescription : string = "";

  constructor(private taskService: TaskService){}
  task = new Task();

  ngOnInit(): void {
  }

  addTask(){

    this.task.id = 0;
    this.task.completed = false;
    this.task.name = this.addTaskName;
    this.task.description = this.addTaskDescription;
    this.task.date = Date.now().toString();
    console.log(this.task);
    this.taskService
    .addTask(this.task)
    .subscribe((result: Task) => 
    (this.taskService.sendUpdate()));
    this.addTaskName = "";
    this.addTaskDescription = "";
  }
}
