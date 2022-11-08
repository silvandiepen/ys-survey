export type ButtonSize = "small" | "medium" | "large";
export type ButtonColor = "primary" | "secondary" | "tertiary";
export type ButtonType = "default" | "ghost";

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: ButtonColor;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  href?: string;
};
