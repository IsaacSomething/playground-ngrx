import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesFeatureKey, CoursesState } from './reducers/course.reducers';
import * as fromCourses from './reducers/course.reducers';
import { courseType } from './model';

// Feature selector
export const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);
// Select all the courses
export const selectAllCourses = createSelector(selectCoursesState, fromCourses.selectAll);
// Retrieve beginner courses
export const selectBeginnerCourses = createSelector(selectAllCourses, courses =>
  courses.filter(course => course.category === courseType.BEGINNER)
);
// Retrieve intermediate courses
export const selectIntermediateCourses = createSelector(selectAllCourses, courses =>
  courses.filter(course => course.category === courseType.INTERMEDIATE)
);
// Retrieve advanced courses
export const selectAdvancedCourses = createSelector(selectAllCourses, courses =>
  courses.filter(course => course.category === courseType.ADVANCED)
);
// Retrieve all courses in promo as length
export const selectPromoTotal = createSelector(selectAllCourses, courses => courses.filter(course => course.promo).length);
// Loading selector
export const areCoursesLoaded = createSelector(selectCoursesState, state => state.allCoursesLoaded);
