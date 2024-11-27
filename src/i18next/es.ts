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
        confirmEditLabel: "Guardar",
        verifyLabel: "Verifique su correo",
        logOutLabel: "Cerrar Sesíon"
      },
    },
    forms: {
      login: {
        email: "Correo",
        password: "Contraseña",
        passwordConfirmation: "Confirme Contraseña",
        needAnAccount: "¿Necesitas una cuenta? ",
        signUp: "Registrate",
        alreadyHaveAnAccount: "¿Ya cuentas con una cuenta? ",
        signIn: "Ingresa",
      },
      profile: {
        firstName: "Nombre",
        lastName: "Apellidos",
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
        passwordsNotMatch: "Las contraseñas no coinciden.",
        invalidcredential: "Usuario o contraseña incorrectos.",
        emailalreadyinuse: "Ya existe una cuenta con este correo.",
        noChangesInProfile: "No hay información que modificar."
      },
      storage: {
        retrylimitexceeded: "El número de intentos ha sido excedido."
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
