import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { Lesson } from '../model/lesson';
import { concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Location } from '@angular/common';
import { CourseEntityService } from '../services/course-entity-service';
import { LessonEntityService } from '../services/lesson-entity-service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  course$!: Observable<Course | undefined>;
  lessons$: Observable<CdkTableDataSourceInput<Lesson>> | undefined;
  loading$ = this.lessonEntityService.loading$;
  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private courseEntityService: CourseEntityService,
    private lessonEntityService: LessonEntityService
  ) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
    this.course$ = this.courseEntityService.entities$.pipe(map(course => course.find(course => course.url === courseUrl)));
    this.lessons$ = this.lessonEntityService.entities$.pipe(
      withLatestFrom(this.course$),
      tap(([lessons, course]) => {
        if (this.nextPage === 0) {
          this.loadLessonsPage(course);
        }
      }),
      map(([lessons, course]) => lessons.filter(lesson => lesson.courseId === course?.id))
    );

    this.loading$ = this.lessonEntityService.loading$.pipe(delay(0));
  }

  back() {
    this.location.back();
  }

  loadLessonsPage(course: Course | undefined) {
    if (course) {
      this.lessonEntityService.getWithQuery({
        courseId: course.id.toString(),
        pageNumber: this.nextPage.toString(),
        pageSize: '3'
      });

      this.nextPage += 1;
    }
  }
}
