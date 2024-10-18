import "../css/CustomButton.css";

export type CustomButtonPropsType = {
  label: string;
  handleClick: () => void;
};

const CustomButton = ({ label, handleClick }: CustomButtonPropsType) => {
  return (
    <div className="buttonContainer">
      <button className="buttonBody" onClick={handleClick}>
        {label}
      </button>
    </div>
  );
};

export default CustomButton;
