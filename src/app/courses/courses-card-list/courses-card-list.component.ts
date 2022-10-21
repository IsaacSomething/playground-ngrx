import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../model/course';
import { MatDialog } from '@angular/material/dialog';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { CourseEntityService } from '../services/course-entity-service';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesCardListComponent {
  @Input()
  courses: Course[] = [];

  @Output()
  courseChanged = new EventEmitter();

  constructor(private dialog: MatDialog, private courseEntityService: CourseEntityService, private snackbar: MatSnackBar) {}

  editCourse(course: Course) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Course',
      mode: 'update',
      course
    };

    this.dialog
      .open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseChanged.emit());
  }

  onDeleteCourse(course: Course) {
    /* Always Optimistic */
    this.courseEntityService
      .delete(course)
      .pipe(take(1))
      .subscribe(() => {
        this.snackbar.open(`Course: ${course.description} was deleted`, undefined, { panelClass: 'warn' });
      });
  }
}
