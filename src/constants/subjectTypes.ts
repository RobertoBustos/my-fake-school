export type SubjectType = {
  subjectId: string;
  subjectName: string;
  isDeleted: boolean;
};

export type SubjectEditableType = Omit<SubjectType, "subjectId">;

export type AddSubjectPayloadType = {
  subjectName: string;
  isDeleted: boolean;
};

export type UpdateSubjectPayloadType = {
  subjectId: string;
  newData: SubjectEditableType;
};

export type DeleteSubjectPayloadType = {
  subjectId: string;
};

export type SubjectCatalogType = SubjectType[];
