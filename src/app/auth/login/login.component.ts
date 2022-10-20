import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/reducers';
import { AuthActions } from '../action.types';
import { UserModel } from '../model/login.model';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  users = UserModel.users;

  set email(email: string) {
    this.form.patchValue({ email });
  }

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private store: Store<AppState>) {
    this.setupForm();
  }

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
