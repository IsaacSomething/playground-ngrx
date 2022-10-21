import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, map, Observable, of, tap } from 'rxjs';
import { AppState } from '../../reducers';
import { loadAllCourses } from '../course.actions';
import { areCoursesLoaded } from '../courses.selectors';
import { CourseEntityService } from './course-entity-service';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private courseEntityService: CourseEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.courseEntityService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.courseEntityService.getAll();
        }
      }),
      filter(loaded => !!loaded),
      first()
    );
  }
}

/* @Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap(coursesLoaded => {
        // Side effect
        if (!this.loading && !coursesLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      filter(coursesLoaded => coursesLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
} */
