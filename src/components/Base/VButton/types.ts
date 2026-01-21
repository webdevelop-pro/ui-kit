import { type PrimitiveProps } from 'radix-vue';

export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonVariant = 'default' | 'outlined' | 'link' | 'tetriary';
export type ButtonColor = 'primary' | 'secondary' | 'red';
export type ButtonAs = 'button' | 'a' | 'router-link';

export interface ButtonProps extends /* @vue-ignore */ PrimitiveProps {
  as?: ButtonAs;
  asChild?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  squared?: boolean;
  pill?: boolean;
  iconOnly?: boolean;
}
