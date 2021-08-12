import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
  tasks: Array<Task>    = new Array<Task>();
  name                  = new FormControl('', [
                            Validators.required,
                          ]);
  @Input() task!: Task;
  selected: string[]    = [];
  matcher               = new RequireStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }

  public addToList() {
    console.log(this.name)
    if (!this.name) {
      return
    }
    else {
      this.task = {
        id: 1,
        name: this.name.value,
        description: "La misma para todos",
        solve: false
      }
      this.tasks.push(this.task);
    }
  }

  public deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  public deleteTasks(selects: Array<Task>) {
    selects.forEach((item: Task) => {
      console.log(item)
    })
  }

  public done(task: Task) {
    task.solve = !task.solve ;
  }

}
