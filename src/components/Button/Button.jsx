import { ButtonStyled } from './Button.styled';

export const Button = ({ onBtnMoreClick }) => {
  return (
    <ButtonStyled onClick={onBtnMoreClick} type="button">
      Load More
    </ButtonStyled>
  );
};

export default Button;
