import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component';
import { CoursesHttpService } from './services/courses-http.service';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
const materialImports = [
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule
];

import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderModule } from '../components/loader';
const moduleImports = [
  LoaderModule,
  ReactiveFormsModule,
  MatMomentDateModule,
  FlexLayoutModule,
  EffectsModule.forFeature([CoursesEffects]),
  StoreModule.forFeature(coursesFeatureKey, coursesReducer)
];

import { CoursesResolver } from './services/courses.resolver';
import { CourseComponent } from './course/course.component';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './courses.effects';
import { StoreModule } from '@ngrx/store';
import { coursesFeatureKey, coursesReducer } from './reducers/course.reducers';
import { CourseRoutingModule } from './course-routing.module';
import { EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { coursesEntityMetadata } from './courses-entity-metadata';
import { CourseEntityService } from './services/course-entity-service';
import { CoursesDataService } from './services/courses-data.service';
import { LessonEntityService } from './services/lesson-entity-service';

@NgModule({
  imports: [CommonModule, CourseRoutingModule, ...materialImports, ...moduleImports],
  declarations: [HomeComponent, CoursesCardListComponent, EditCourseDialogComponent, CourseComponent],
  exports: [HomeComponent, CoursesCardListComponent, EditCourseDialogComponent, CourseComponent],
  entryComponents: [EditCourseDialogComponent],
  providers: [CoursesHttpService, CoursesResolver, CourseEntityService,LessonEntityService, CoursesResolver, CoursesDataService]
})
export class CoursesModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private coursesDataService: CoursesDataService
  ) {
    this.eds.registerMetadataMap(coursesEntityMetadata);
    this.entityDataService.registerService('Course', coursesDataService);
  }
}
