import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
const moduleImports = [RouterModule];

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
const materialImports = [MatIconModule, MatToolbarModule, MatListModule];

import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [CommonModule, ...materialImports, ...moduleImports]
})
export class MenuModule {}
