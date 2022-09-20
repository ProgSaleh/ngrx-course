import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

// When we have several feature modules(whhich usually is true),
// we need to make type safty selectors for each feature module
// this 'state["auth"]' code works fine but is error-prone!
// We should use NgRx util function createFeatureSelector()
// to get specific feature state from the whole store state.
export const selectAuthState = createFeatureSelector<AuthState>("auth");

// We use the NgRx utility function 'createSelector()'
// rather than a custom one, because createSelector() has a memory
// functions with memory in them are called momoized functions..
// they never execute until the input is different than the one in the memory.
// Get auth state from the whole store
// then, perform the projection function to see if a user already exists or not.
export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

// This is correct but, we can make use of isLoggedIn() as it also A mapping function.
// export const isLoggedOut = createSelector(
//   (state) => state["auth"],
//   (auth) => !auth.user
// );
export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);
