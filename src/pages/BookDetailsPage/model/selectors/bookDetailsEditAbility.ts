import { createSelector } from "@reduxjs/toolkit";
import { getBookDetailsData } from "entities/Book";
import { getUserAuthData } from "entities/User";

export const getBookDetailsEditAbility = createSelector(
  getBookDetailsData,
  getUserAuthData,
  (book, user) => {
    if (!book || !user) {
      return false;
    }

    // return book.owner === user.user.id;
    return user.user.roles?.includes("ROLE_ADMIN");
  }
);
