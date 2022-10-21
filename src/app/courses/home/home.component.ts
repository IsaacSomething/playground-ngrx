import { Component, OnInit } from '@angular/core';
import { compareCourses, Course } from '../model/course';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { selectAdvancedCourses, selectBeginnerCourses, selectIntermediateCourses, selectPromoTotal } from '../courses.selectors';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  beginnerCourses$!: Observable<Course[]>;
  intermediateCourses$!: Observable<Course[]>;
  advancedCourses$!: Observable<Course[]>;
  promoTotal$!: Observable<number>;

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    this.intermediateCourses$ = this.store.pipe(select(selectIntermediateCourses));
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
