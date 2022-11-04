
export type  ButtonSize = 'small' | 'medium' | 'large';
export type  ButtonColor = 'primary' | 'secondary' | 'tertiary';


export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  href?: string;
};
