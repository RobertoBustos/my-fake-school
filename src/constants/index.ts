import type { SupportedLanguagesListType } from "@customTypes/index";

export const serviceUrl: string =
  "https://rickandmortyapi.com/api/character/?page=18";

export const homePageOptions: string[] = [
  "subjects",
  "teachers",
  "students",
  "groups",
  "grades",
  "admin",
];

export const supportedLanguages: SupportedLanguagesListType = [
  { code: "en", nativeName: "English" },
  { code: "es", nativeName: "Spanish" },
];

export enum customEvents {
  ADD_SUBJECT = "addSubject",
  UPDATE_SUBJECT = "updateSubject",
  DELETE_SUBJECT = "deleteSubject"
}