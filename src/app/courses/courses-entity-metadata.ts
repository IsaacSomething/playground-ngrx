import { EntityMetadataMap } from '@ngrx/data';
import { compareCourses } from './model/course';
import { compareLessons } from './model/lesson';

export const coursesEntityMetadata: EntityMetadataMap = {
  Course: {
    sortComparer: compareCourses,
    /* Optimistic */
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Lesson: {
    sortComparer: compareLessons
  }
};
