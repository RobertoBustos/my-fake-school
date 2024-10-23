import Alert from "react-bootstrap/Alert";

function WarningMessage() {
  return (
    <Alert variant="warning">
      <Alert.Heading>Importante Aviso</Alert.Heading>
      <p>
        Hemos detectado algunos elementos del catalogo que no estan registrados
        aun, esto puede afectar al uso de estos cambios a otros usuarios por lo
        que recomendamos no registrar nuevos elementos por el momento
      </p>
      <hr />
      <p className="mb-0">
        Cuando esto sea corregido el sistema ocultara esta alerta
      </p>
    </Alert>
  );
}

export default WarningMessage;
