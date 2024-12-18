const es = {
  translation: {
    languages: {
      en: "Inglés",
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
      },
      payment: {
        confirmPaymentLabel: "Pagar ahora",
        confirmPaymentLabelInProgress: "Pago en proceso...",
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
    },
    pageTabTitles: {
      homePage: "My Fake School - Inicio",
      signUpPage: "My Fake School - Registro",
      signInPage: "My Fake School - Entrar",
      profilePage: "My Fake School - Mi Perfil",
      subjectPage: "My Fake School - Catálogo de Materias",
      location: "My Fake School - Mapa"
    },
    formTitles: {
      signUp: "Crear Nueva Cuenta",
      signIn: "Iniciar Sesión",
      userProfile: "Mi Perfil",
      checkout: "Informacion del Pago"
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
        idRequired: "No se encontró el id de esta materia.",
        subjectsWithoutIdDetected:
          "Se encontraron {{subjects}} faltantes de registro en el catálogo.",
      },
      auth: {
        noChangesInProfile: "No hay información que modificar.",
        passwordsNotMatch: "Las contraseñas no coinciden.",
        networkrequestfailed: "Error de comunicación.",
        toomanyrequests: "Se excedió el número máximo de peticiones",
        invalidcredential: "Usuario o contraseña incorrectos.",
        emailalreadyinuse: "Ya existe una cuenta con este correo.",
        equiresrecentlogin: "Se necesita volver a ingresar para cambiar la contraseña.",
        weakpassword: "Contraseña poco segura."
      },
      storage: {
        retrylimitexceeded: "El número de intentos ha sido excedido."
      },
      forms: {
        isRequired: "{{field}} es requerido.",
        minLength: "{{field}} debe contener al menos {{characters}} caracteres.",
        confirmationRequired: "Confirmación requerida.",
        invalidEmailFormat: "Por favor proporcione un correo válido.",
        invailidPhoneFormat: "Por favor proporcione un teléfono válido.",
        ageRange: "Por favor proporcione un núnmero entre {{minAge}} y {{maxAge}}.",
        fileFormatNotSupported: "Tipo de archivo no válido.",
        fileSizeExceeded: "El archivo excede {{maxSize}}"
      },
      permission: {
        geolocation1: "La ubicación esta desactivada.",
        geolocation2: "No se pudo localizar.",
        geolocation3: "Tiempo de espera excedido."
      }
    },
    confirmations: {
      subject: {
        addedSuccesfully: "Materia agregada exitosamente.",
        editedSuccesfully: "Materia editada exitosamente.",
        removedSuccesfully: "Materia eliminada exitosamente.",
      },
      user: {
        verificationEmailSent: "Correo de verificación enviado exitosamente.",
        profileUpdated: "Perfil actualizado exitosamente."
      },
      payment: {
        purchaseCompleted: "Pago aplicado correctamente.",
        thankyouText: "Gracias por su compra.",
      }
    },
    homePage: {
      title: "Bienvenido a Tu Página de Inicio",
      options: {
        profile: "Mi Perfil",
        profilev2: "Mi Perfil (v2)",
        subjects: "Materias",
        payment: "Pagos",
        logOut: "Cerrar Sesión",
        location: "Mapas y localización"
      },
    },
    maps: {
      distance: "Distancia: {{distance}}",
      duration: "Duración: {{duration}}",
      from: "De {{from}}",
      to: "a {{to}}",
      otherRoutes: "Rutas alternas",
      searchPlaceholder: "Busque una dirección",
      destinationPlaceholder: "Dirección de destino"
    }
  },
};

export default es;
