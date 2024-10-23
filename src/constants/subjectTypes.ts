export type SubjectType = {
  subjectId: string;
  subjectName: string;
  isDeleted: boolean;
};

export type SubjectCatalogType = SubjectType[];

export type AddSubjectPayloadType = string;

export type AddSubjectServicePayloadType = {
  subjectName: string;
  isDeleted: boolean;
};

export type EditSubjectPayloadType = {
  subjectId: string;
  newData: Omit<SubjectType, "subjectId">;
};

export type DeleteSubjectPayloadType = string;

export type DeleteSubjectServicePayloadType = {
  subjectId: string;
};
