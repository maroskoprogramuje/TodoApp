import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataSource:Task[] = [];

  displayedColumns: string[] = ['name', 'description',"completed","edit", "delete"];
  constructor(private taskService: TaskService,
              private changeDetectorRefs: ChangeDetectorRef){
                this.taskService.getUpdate().subscribe
                (message => { //message contains the data sent from service
                  if (message === true)
                  {
                    this.refresh()
                  }
                })
              }
  
  editing:boolean = false;
  taskEditName: string = "";
  taskEditDescription:string = "";


  ngOnInit() : void {
    this.refresh();
  }

  taskCompleted(task: Task): void{
    task.completed = true;
    this.taskService.editTask(task)
    .subscribe(result => (this.refresh()));
  }

  taskUncompleted(task: Task): void{
    task.completed = false;
    this.taskService.editTask(task)
    .subscribe(result => (this.refresh()));
  }

  editTaskStart(task:Task) : void{
    if (!this.editing){
      this.editing = !(this.editing);
      task.isEdit = !(task.isEdit);
      this.taskEditName = task.name;
      this.taskEditDescription = task.description;
    }
  }

  editTaskDone(task:Task) : void{
    task.isEdit = !(task.isEdit);
    task.name = this.taskEditName;
    task.description = this.taskEditDescription;
    this.taskService.editTask(task)
    .subscribe(result => this.refresh());
    this.editing = false;
  }

  deleteTask(element:Task) : void{
    if (confirm("Do you want to delete this task?")){
      this.taskService
      .deleteTask(element)
      .subscribe(result => this.refresh());
    }
    
  }

  refresh(){
    this.taskService
    .getTasks()
    .subscribe((result: Task[]) => (this.dataSource = result));
    this.changeDetectorRefs.detectChanges();
  }
}