import { props, createAction } from "@ngrx/store";
import { User } from "./model/user.model";

// This is just an Action creater NOT the action itself to be sent to the store.
// type name convernsion is important here as we'll display it in the console.
export const login = createAction(
  "[Login Page] User Login",
  props<{ user: User }>()
);

export const logout = createAction("[Top Menu] User Logout");
