import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthActions } from '../action.types';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private store: Store<AppState>) {
    this.setupForm();
  }

  ngOnInit() {}

  login() {
    const val = this.form.value;
    this.auth
      .login(val.email, val.password)
      .pipe(
        tap(user => {
          const newLoginAction = AuthActions.login({ user });
          this.store.dispatch(newLoginAction);
          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(noop, () => alert('login failed'));
  }

  private setupForm() {
    this.form = this.fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }
}
