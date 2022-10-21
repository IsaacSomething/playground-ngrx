import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
const moduleImports = [RouterModule];

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
const materialImports = [MatIconModule, MatToolbarModule, MatButtonModule, MatBadgeModule, MatDialogModule, MatMenuModule];

import { StoreModule } from '@ngrx/store';
import { coursesFeatureKey, coursesReducer } from 'src/app/courses/reducers/course.reducers';
const ngrxModules = [StoreModule.forFeature(coursesFeatureKey, coursesReducer)];

import { ToolbarComponent } from './toolbar.component';
import { CourseEntityService } from 'src/app/courses/services/course-entity-service';
import { coursesEntityMetadata } from 'src/app/courses/courses-entity-metadata';
import { CoursesDataService } from 'src/app/courses/services/courses-data.service';
import { EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { CoursesResolver } from 'src/app/courses/services/courses.resolver';
import { CoursesHttpService } from 'src/app/courses/services/courses-http.service';

@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [CommonModule, ...materialImports, ...moduleImports, ...ngrxModules],
  providers: [CoursesHttpService, CoursesResolver, CourseEntityService, CoursesResolver, CoursesDataService]
})
export class ToolbarModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private coursesDataService: CoursesDataService
  ) {
    this.eds.registerMetadataMap(coursesEntityMetadata);
    this.entityDataService.registerService('Course', this.coursesDataService);
  }
}
