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
        saveChangesInProgress: "Saving...",
        verifyLabel: "Verify your email",
        verifyLabelInProgress: "Sending...",
        logOutLabel: "Log out",
        logOutLabelInProgress: "Loggin out...",
        logInLabelInProgress: "Loggin in...",
        signUpLabelInProgress: "Creating account..."
      },
      actions: {
        defaultLoadingLabel: "Loading..."
      },
      payment: {
        confirmPaymentLabel: "Pay now",
        confirmPaymentLabelInProgress: "Payment in progress...",
      }
    },
    forms: {
      user: {
        email: "Email",
        password: "Password",
        confirmPassword: "Password Confirmation",
        age: "Age",
        dateOfBirth: "Date of Birth",
        firstName: "First Name",
        lastName: "Last Name",
        newPassword: "New Password",
        confirmNewPassword: "Confirm with current password",
        phoneNumber: "Phone Number",
        photoURL: "Profile Photo",
        needAnAccount: "Need an account?",
        signUp: "Create one",
        alreadyHaveAnAccount: "Already have an account?",
        signIn: "Log In",
      },
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
      userProfile: "My Profile",
      checkout: "Payment Information"
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
        noChangesInProfile: "There are no changes to be saved.",
        passwordsNotMatch: "Passwords don't match.",
        networkrequestfailed: "Cant complete your request.",
        toomanyrequests: "Max number of request exceeded",
        invalidcredential: "Incorrect username or password.",
        emailalreadyinuse: "There's already an account with this email.",
        equiresrecentlogin: "To change your password please sign in again.",
        weakpassword: "Password too weak."
      },
      storage: {
        retrylimitexceeded: "The number of retries has been exceeded."
      },
      forms: {
        isRequired: "{{field}} is Required.",
        minLength: "{{field}} must contain at least {{characters}} characters.",
        confirmationRequired: "Confirmation required.",
        invalidEmailFormat: "Invalid email format.",
        invailidPhoneFormat: "Invalid phone number format.",
        ageRange: "Plese enter a number between {{minAge}} and {{maxAge}}.",
        fileFormatNotSupported: "Invalid file type.",
        fileSizeExceeded: "File size is greater than {{maxSize}}"
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
      },
      payment: {
        purchaseCompleted: "You have succesfully completed your purchase.",
        thankyouText: "Thank You!.",
      }
    },
    homePage: {
      title: "Welcome To Your Home Page",
      options: {
        profile: "My Profile",
        profilev2: "My Profile (v2)",
        subjects: "Subjects",
        payment: "Payments",
        logOut: "Log Out"
      },
    },
  },
};

export default en;
