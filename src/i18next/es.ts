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
    },
    subject: {
      editModal: {
        title: "Editar materia",
        subtitle: "Escriba un nuevo nombre para esta materia",
        description:
          "Este es un texto larguisimo que pude haber generado en la pagina generadora de textos largos o con algun lorem lipsum pero en vez de eso mejor perdere mi tiempo y escribire manualmente todo",
      },
      deleteModal: {
        title: "¿Esta seguro de borrar esta materia?",
      },
      catalogPage: {
        title: "Catalogo de Materias",
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
          "Se encontraron {{subjects}} faltantes de registro en el catalogo.",
      },
    },
    confirmations: {
      subject: {
        addedSuccesfully: "Materia agregada exitosamente.",
        editedSuccesfully: "Materia editada exitosamente.",
        removedSuccesfully: "Materia eliminada exitosamente.",
      },
    },
    homePage: {
      title: "Bienvenido a Tu Pagina de Inicio",
      options: {
        subjects: "Materias",
        teachers: "Maestros",
        students: "Alumnos",
        groups: "Grupos",
        grades: "Calificaciones",
        admin: "Administracion",
      },
    },
  },
};

export default es;
