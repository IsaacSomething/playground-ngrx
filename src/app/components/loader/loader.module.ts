import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
const moduleImports = [FlexLayoutModule];

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
const materialImports = [MatProgressSpinnerModule];

import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  imports: [CommonModule, ...materialImports, ...moduleImports]
})
export class LoaderModule {}
