import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task';

/** Error when invalid control is dirty, touched, or submitted. */
export class RequireStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  tasks: Array<Task>        = new Array<Task>();
  name                      = new FormControl('', [
                                  Validators.required,
                                ]);
  @Input() task!: Task;
  selected: string[]        = [];
  matcher                   = new RequireStateMatcher();
  selects: Array<Task>      = new Array<Task>();
  indexes: Array<number>    = Array<number>();
  filtered: Array<Task>     = Array<Task>();

  constructor(private taskService: TaskService) {}

  async ngOnInit(): Promise<void> {
    await this.loadTasks();
  }

  private async loadTasks(): Promise<void> {
    this.taskService
      .load()
      .subscribe(response => {
        this.tasks = new Array<Task>();
        Object.assign(this.tasks, response);

        this.tasks.forEach((task, index) => {
          if(task.solve)
            this.indexes.push(index)
        })

      }, err => {
        console.log(err);
      })
  }

  public addToList() {
    if (!this.name.value || this.name.value === '') {
      return
    }
    else {
      this.task = {
        name: this.name.value,
        description: "La misma para todos",
        solve: false
      }
      this.filtered = Array<Task>();
      this.tasks.push(this.task);
      this.name.reset();
      this.name.setErrors(null);
    }
  }

  showComplete() {
    this.filtered   = this.tasks.filter(task => task.solve)
  }

  showAll() {
    this.filtered = Array<Task>();
  }

  showIncomplete() {
    this.filtered = this.tasks.filter(task => !task.solve)
  }

  public getComplete() {
    let complete = this.tasks.filter(task => task.solve)
    return complete.length;
  }

  public getIncomplete() {
    let incomplete = this.tasks.filter(task => !task.solve)
    return incomplete.length;
  }

  public deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  public deleteTasks() {
    this.indexes.forEach((index) => {
      this.tasks.splice(index, 1);
    })
    this.indexes = Array<number>();
    this.filtered = Array<Task>();
  }

  public selectIndexes(index: number) {
    if(this.indexes.includes(index)) {
      this.removeItemFromArr(this.indexes, index);
    } else {
      this.indexes.push(index);
    }

    console.log(this.indexes)
  }

  private removeItemFromArr ( arr: Array<number>, item: number) {
    var i = arr.indexOf( item );
    arr.splice( i, 1 );
}

  public done(task: Task) {
    task.solve = !task.solve ;
  }

}
