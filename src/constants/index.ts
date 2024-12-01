import type { SupportedLanguageType } from "@customTypes/index";

export const serviceUrl: string =
  "https://rickandmortyapi.com/api/character/?page=18";

export const homePageOptions: string[] = [
  "profile",
  "profilev2",
  "subjects",
  "admin",
];

export const supportedLanguages: SupportedLanguageType[] = [
  { code: "en", nativeName: "English" },
  { code: "es", nativeName: "Spanish" },
];


export const EMAIL_REGEX = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
export const PHONE_REGEX = new RegExp(/^[\d]{10}$/gm)
export const NAME_REGEX = new RegExp(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/gm)

export const MAX_PROFILE_PICTURE_FILE_SIZE = 1024;
export const VALID_IMAGE_FILE_TYPES = ['image/gif', 'image/jpeg', 'image/png'];
