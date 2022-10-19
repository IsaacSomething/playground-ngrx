import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { EditCourseDialogComponent } from 'src/app/courses/edit-course-dialog/edit-course-dialog.component';
import { defaultDialogConfig } from 'src/app/courses/shared/default-dialog-config';

@Component({
  selector: 'base-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() sidenav!: MatSidenav;
  @Input() small!: boolean | null;
  @Input() hideActions!: boolean | null;

  constructor(private dialog: MatDialog) {}

  addCourse() {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = { dialogTitle: 'Create Course', mode: 'create' };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
