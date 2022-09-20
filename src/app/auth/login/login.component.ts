import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { AuthState } from "../reducers";
import { login } from "../auth.actions";
import { AuthActions } from "../actionTypes";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AuthState>
  ) {
    this.form = fb.group({
      email: ["test@angular-university.io", [Validators.required]],
      password: ["test", [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const val = this.form.value;

    this.auth
      .login(val.email, val.password)
      .pipe(
        tap((user) => {
          // store user data here before routing...
          // inject the store to the component..
          // passing the Store a generic state of the default AppState of the app.

          // dispatch user data to the Auth store,
          // passing it an NgRx Action (by using NgRx createAction(arg1, arg2)).
          // An NgRx Action is just a JS obj that we send(or dispatch)
          // to the store so it performs the immutable modification.
          // An NgRx Action obj USUALLY looks like { type: '', payload: { // changes to be applied in the store } }
          // in this case, the payload is the user data.
          // The store handles the rest of the work now.
          this.store.dispatch(login({ user }));

          this.router.navigateByUrl("/courses");
        })
      )
      .subscribe(noop, () => alert("Login faild!"));
  }
}
