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
      signIn: {
        confirmLabel: "Sign In"
      },
      signUp: {
        confirmLabel: "Sign Up"
      },
      user: {
        saveChangesLabel: "Save Changes",
        saveChangesInProgress: "Saving Changes...",
        verifyLabel: "Verify your email",
        verifyLabelInProgress: "Sending verification email...",
        logOutLabel: "Log out",
        logOutLabelInProgress: "Loggin out...",
        logInLabelInProgress: "Loggin in...",
        signUpLabelInProgress: "Creating account..."
      },
    },
    forms: {
      login: {
        email: "Email",
        password: "Password",
        passwordConfirmation: "Password Confirmation",
        needAnAccount: "Need an account?",
        signUp: "Create one",
        alreadyHaveAnAccount: "Already have an account?",
        signIn: "Log In",
      },
      profile: {
        firstName: "First Name",
        lastName: "Last Name",
        password: "New password",
        phoneNumber: "phoneNumber"
      }
    },
    pageTabTitles: {
      homePage: "My Fake School - Home",
      signUpPage: "My Fake School - Sign Up",
      signInPage: "My Fake School - Sign In",
      profilePage: "My Fake School - My Profile",
      subjectPage: "My Fake School - Subject Catalog"
    },
    formTitles: {
      signUp: "Sign Up",
      signIn: "Sign In",
      userProfile: "My Profile"
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
      auth: {
        passwordsNotMatch: "Passwords don't match.",
        invalidcredential: "Incorrect username or password.",
        emailalreadyinuse: "There's already an account with this email.",
        noChangesInProfile: "There are no changes to be saved."
      },
      storage: {
        retrylimitexceeded: "The number of retries has been exceeded."
      }
    },
    confirmations: {
      subject: {
        addedSuccesfully: "Subject added successfully.",
        editedSuccesfully: "Subject changed successfully.",
        removedSuccesfully: "Subject deleted successfully.",
      },
      user: {
        verificationEmailSent: "Verification email sent.",
        profileUpdated: "User information succesfully updated.",
      }
    },
    homePage: {
      title: "Welcome To Your Home Page",
      options: {
        subjects: "Subjects",
        teachers: "Teachers",
        students: "Students",
        groups: "Groups",
        grades: "Grades",
        admin: "Admin",
        logOut: "Log Out"
      },
    },
  },
};

export default en;
