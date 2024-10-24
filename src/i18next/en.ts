const en = {
  translation: {
    languages: {
      en: "English",
      es: "Spanish",
    },
    buttons: {
      subject: {
        editLabel: "Edit",
        deleteLabel: "Delete",
        confirmAddLabel: "Add",
        confirmEditLabel: "Save",
        cancelEditLabel: "Close",
        confirmDeleteLabel: "Delete",
        cancelDeleteLabel: "Cancel",
      },
    },
    subject: {
      editModal: {
        title: "Subject Edition",
        subtitle: "Please Enter a new subject title",
        description:
          "this is a long text that i could have generated in lorem lipsum page but im too lazy so i wont do it and i will waste my time typing all this instead",
      },
      deleteModal: {
        title: "Are you sure you want to delete this subject?",
      },
      catalogPage: {
        title: "Subject Catalog",
      },
      addSubjectForm: {
        label: "New Subject",
      },
    },
    errors: {
      unknown: "An unknown error has ocurred.",
      subject: {
        nameRequired: "Subject name is required.",
        idRequired: "Subject id is required.",
        subjectsWithoutIdDetected:
          "There are {{subjects}} missing its confirmation in the catalog.",
      },
    },
    confirmations: {
      subject: {
        addedSuccesfully: "Subject added successfully.",
        editedSuccesfully: "Subject changed successfully.",
        removedSuccesfully: "Subject deleted successfully.",
      },
    },
  },
};

export default en;
