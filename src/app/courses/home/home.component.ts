import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { compareCourses, Course } from '../model/course';
import { map, Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { selectAdvancedCourses, selectBeginnerCourses, selectIntermediateCourses, selectPromoTotal } from '../courses.selectors';
import { CourseEntityService } from '../services/course-entity-service';
import { courseType } from '../model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  beginnerCourses$!: Observable<Course[]>;
  intermediateCourses$!: Observable<Course[]>;
  advancedCourses$!: Observable<Course[]>;
  promoTotal$!: Observable<number>;

  constructor(private dialog: MatDialog, private store: Store, private courseEntityService: CourseEntityService) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.courseEntityService.entities$.pipe(
      map(courses => courses.filter(course => course.category === courseType.BEGINNER))
    );

    this.advancedCourses$ = this.courseEntityService.entities$.pipe(
      map(courses => courses.filter(course => course.category === courseType.ADVANCED))
    );

    /* this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    this.intermediateCourses$ = this.store.pipe(select(selectIntermediateCourses)); */
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
