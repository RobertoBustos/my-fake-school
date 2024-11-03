export type SubjectType = {
  subjectId: string;
  subjectName: string;
  isDeleted: boolean;
};

export type AddSubjectPayloadType = string;

export type AddSubjectServicePayloadType = {
  subjectName: string;
  isDeleted: boolean;
};

export type EditSubjectPayloadType = {
  subjectId: string;
  newData: Omit<SubjectType, "subjectId">;
};

export type DeleteSubjectPayloadType = {
  subjectId: string;
  newData: Omit<SubjectType, "subjectId">;
};
