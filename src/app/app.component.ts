import { Component, OnInit } from "@angular/core";
// import { select, Store } from "@ngrx/store";
// import { Observable } from "rxjs";
// import { map } from "rxjs/operators";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { AuthState } from "./auth/reducers";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { isLoggedIn, isLoggedOut } from "./auth/auth.selectors";
import { logout } from "./auth/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loading = true;

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AuthState>) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    // The injected Store returns an observable of AppState,
    // ANY data in the store is returned in the subscription.
    // This is clear and doable.. but,
    // there's more effeciant way of querying data from the store; that's Selectors.
    // Without Selectors, the subscription on the store WILL
    // calculate the value of 'this.isLoggedIn$' and send it
    // again and again on EVERY update on the store..
    // this.isLoggedIn$ will have to report the newly received value
    // to the template (which is the exact same data!!!) and that is an expensive process!
    // Of course, we can use RxJS's distinctUntillChange() operator,
    // but this behaviour is repetitive in NgRX so much that they've created the Selecters for it.
    // Selectors definition from the doc https://ngrx.io/guide/store/selectors#selectors
    //     => "Selectors are pure functions used for obtaining slices of store state"

    // This -> '(response) => !!response["auth"]?.user' function is a pure mapping function,
    // it takes an input, and retuns an output.
    // And, if the input doesn't change, the output will not change! It could be much more involved by the way..
    // Anyways, we create selectors using createSelector() NgRx's API
    // to check if the input has changed so we perform the processing.
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));

    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));

    // TODO: test this.
    // this.store.subscribe((value) => {
    //   console.log("new value>>>", value);
    // });
  }

  logout() {
    this.store.dispatch(logout());
  }
}
