const es = {
  translation: {
    languages: {
      en: "Ingles",
      es: "Español",
    },
    buttons: {
      subject: {
        editLabel: "Editar",
        deleteLabel: "Borrar",
        confirmAddLabel: "Agregar",
        confirmEditLabel: "Guardar",
        cancelEditLabel: "Cerrar",
        confirmDeleteLabel: "Borrar",
        cancelDeleteLabel: "Cancelar",
      },
      signIn: {
        confirmLabel: "Entrar"
      },
      signUp: {
        confirmLabel: "Registrarse"
      },
      user: {
        saveChangesLabel: "Guardar",
        saveChangesInProgress: "Guardando...",
        verifyLabel: "Verifique su correo",
        verifyLabelInProgress: "Enviando...",
        logOutLabel: "Cerrar Sesíon",
        logOutLabelInProgress: "Saliendo...",
        logInLabelInProgress: "Entrando...",
        signUpLabelInProgress: "Creando cuenta..."
      },
      actions: {
        defaultLoadingLabel: "Cargando..."
      }
    },
    forms: {
      user: {
        email: "Correo",
        password: "Contraseña",
        confirmPassword: "Confirme Contraseña",
        age: "Edad",
        dateOfBirth: "Fecha de Nacimiento",
        firstName: "Nombre",
        lastName: "Apellido",
        newPassword: "Nueva Contraseña",
        confirmNewPassword: "Confirme con contraseña actual",
        phoneNumber: "Teléfono",
        photoURL: "Foto de Perfil",
        needAnAccount: "¿Necesitas una cuenta? ",
        signUp: "Registrate",
        alreadyHaveAnAccount: "¿Ya cuentas con una cuenta? ",
        signIn: "Ingresa",
      },
      profile: {
        firstName: "Nombre",
        lastName: "Apellido",
        password: "Nueva contraseña",
        phoneNumber: "Teléfono"
      }
    },
    pageTabTitles: {
      homePage: "My Fake School - Inicio",
      signUpPage: "My Fake School - Registro",
      signInPage: "My Fake School - Entrar",
      profilePage: "My Fake School - Mi Perfil",
      subjectPage: "My Fake School - Catalogo de Materias"
    },
    formTitles: {
      signUp: "Crear Nueva Cuenta",
      signIn: "Iniciar Sesión",
      userProfile: "Mi Perfil"
    },
    subject: {
      editModal: {
        title: "Editar materia",
        subtitle: "Escriba un nuevo nombre para esta materia",
        description:
          "Este es un texto larguisimo que pude haber generado en la pagina generadora de textos largos o con algun lorem lipsum pero en vez de eso mejor perdere mi tiempo y escribire manualmente todo.",
      },
      deleteModal: {
        title: "¿Está seguro de borrar esta materia?",
      },
      catalogPage: {
        title: "Catálogo de Materias",
      },
      addSubjectForm: {
        label: "Nueva materia",
      },
    },
    errors: {
      unknown: "Ha ocurrido un error inesperado.",
      subject: {
        nameRequired: "El nombre de la materia no puede estar vacio.",
        idRequired: "No se encontro el id de esta materia.",
        subjectsWithoutIdDetected:
          "Se encontraron {{subjects}} faltantes de registro en el catálogo.",
      },
      auth: {
        noChangesInProfile: "No hay información que modificar.",
        passwordsNotMatch: "Las contraseñas no coinciden.",
        invalidcredential: "Usuario o contraseña incorrectos.",
        emailalreadyinuse: "Ya existe una cuenta con este correo.",
        equiresrecentlogin: "Se necesita volver a loguearse para cambiar la contraseña.",
        weakpassword: "Contraseña poco segura."
      },
      storage: {
        retrylimitexceeded: "El número de intentos ha sido excedido."
      },
      forms: {
        isRequired: "{{field}} es requerido.",
        minLength: "{{field}} debe contener al menos {{characters}} caracteres.",
        confirmationRequired: "Confirmacion requerida.",
        invalidEmailFormat: "Por favor proporcione un correo válido.",
        invailidPhoneFormat: "Por favor proporcione un telefono válido.",
        ageRange: "Por favor proporcione un núnmero entre {{minAge}} y {{maxAge}}.",
        fileFormatNotSupported: "Tipo de archivo no valido.",
        fileSizeExceeded: "El archivo excede {{maxSize}}"
      }
    },
    confirmations: {
      subject: {
        addedSuccesfully: "Materia agregada exitosamente.",
        editedSuccesfully: "Materia editada exitosamente.",
        removedSuccesfully: "Materia eliminada exitosamente.",
      },
      user: {
        verificationEmailSent: "Correo de verification enviado exitosamente.",
        profileUpdated: "Perfil actualizado exitosamente."
      }
    },
    homePage: {
      title: "Bienvenido a Tu Pagina de Inicio",
      options: {
        profile: "Mi Perfil",
        profilev2: "Mi Perfil (v2)",
        subjects: "Materias",
        teachers: "Maestros",
        students: "Alumnos",
        groups: "Grupos",
        grades: "Calificaciones",
        admin: "Administración",
        logOut: "Cerrar Sesión"
      },
    },
  },
};

export default es;
