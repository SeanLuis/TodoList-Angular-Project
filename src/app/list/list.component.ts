import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
  public tasks: string[]    = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  public taskFormControl    = new FormControl('', [
    Validators.required,
  ]);
  public newTask: string    = '';
  public selected: string[] = [];

  matcher = new RequireStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }

  public addToList() {
    if (this.newTask == '') {
      return
    }
    else {
      this.tasks.push(this.newTask);
      this.newTask = '';
    }
  }

  public deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  public deleteTasks(select: any) {
    console.log()
    select.forEach((item: { value: any; }) => {
      console.log(item.value)
    })
  }

}
