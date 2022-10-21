import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Location } from '@angular/common';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  course$!: Observable<Course>;
  lessons$: Observable<CdkTableDataSourceInput<Lesson>> | undefined;
  loading$!: Observable<boolean>;
  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;

  constructor(private coursesService: CoursesHttpService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');

    this.course$ = this.coursesService.findCourseByUrl(courseUrl);

    this.lessons$ = this.course$.pipe(
      concatMap(course => this.coursesService.findLessons(course.id)),
      tap(console.log)
    );

    this.loading$ = this.course$.pipe(map(course => !course));
  }

  back() {
    this.location.back();
  }

  loadLessonsPage(course: Course) {}
}
