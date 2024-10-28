import Alert from "react-bootstrap/Alert";

export type WarningMessagePropsType = {
  headerText?: string;
  bodyText: string;
  footerText?: string;
};

function WarningMessage({
  headerText,
  bodyText,
  footerText,
}: WarningMessagePropsType) {
  return (
    <Alert variant="warning">
      {headerText ? <Alert.Heading>{headerText}</Alert.Heading> : null}
      <p>{bodyText}</p>
      {footerText ? (
        <>
          <hr />
          <p className="mb-0">{footerText}</p>
        </>
      ) : null}
    </Alert>
  );
}

export default WarningMessage;
