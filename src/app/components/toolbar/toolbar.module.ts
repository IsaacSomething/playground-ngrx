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

@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [CommonModule, ...materialImports, ...moduleImports, ...ngrxModules]
})
export class ToolbarModule {}
