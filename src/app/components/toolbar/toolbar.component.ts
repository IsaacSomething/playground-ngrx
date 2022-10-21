import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { logout } from 'src/app/auth/auth.actions';
import { user } from 'src/app/auth/auth.selectors';
import { selectPromoTotal } from 'src/app/courses/courses.selectors';
import { EditCourseDialogComponent } from 'src/app/courses/edit-course-dialog/edit-course-dialog.component';
import { CourseEntityService } from 'src/app/courses/services/course-entity-service';
import { defaultDialogConfig } from 'src/app/courses/shared/default-dialog-config';

@Component({
  selector: 'base-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() sidenav!: MatSidenav;
  @Input() small!: boolean | null;
  user$ = this.store.pipe(select(user));
  promoTotal$ = this.courseEntityService.promoTotal$;

  constructor(private dialog: MatDialog, private store: Store, private courseEntityService: CourseEntityService) {}

  addCourse() {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = { dialogTitle: 'Create Course', mode: 'create' };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }

  logout() {
    this.store.dispatch(logout());
  }
}
