import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../action-types';
import { compareCourses, Course } from '../model/course';

export const coursesFeatureKey = 'courses';

// Initialize CourseState with entityState of type Course
export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}
// Create the entity adaptor of type Course with sort
export const adaptor = createEntityAdapter<Course>({ sortComparer: compareCourses, selectId: course => course.id });
// Initialize the course state with the adaptor and check if loaded
export const initialCoursesState = adaptor.getInitialState({ allCoursesLoaded: false });
// Create the reducer with the initial course state from the adaptor and set the state
// from the allCoursesLoaded action

export const coursesReducer = createReducer(
  initialCoursesState,
  // The adaptor setsAll from the action allCoursesLoaded (api return) and mutates the courses state
  on(CourseActions.allCoursesLoaded, (state, action) => adaptor.setAll(action.courses, { ...state, allCoursesLoaded: true })),
  // The adaptor updatesOne from the action (user save action) and mutates the courses state
  on(CourseActions.courseUpdated, (state, action) => adaptor.updateOne(action.update, state))
);
// Set the adaptors selector
export const { selectAll } = adaptor.getSelectors();
