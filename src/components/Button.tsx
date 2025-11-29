import './Button.css';

type ButtonType = 'POSITIVE' | 'NEGATIVE';

interface ButtonProps {
  text: string;
  type?: ButtonType;
  onClick?: () => void;
}

const Button = ({ text, type, onClick }: ButtonProps) => {
  const buttonClassName = type ? `Button Button_${type}` : 'Button';

  return (
    <button type="button" onClick={onClick} className={buttonClassName}>
      {text}
    </button>
  );
};

export default Button;
