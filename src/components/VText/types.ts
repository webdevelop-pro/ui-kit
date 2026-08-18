
import { ButtonProps } from 'UiKit/components/Base/VButton/VButton.vue';
import { Component } from 'vue';

export interface VTextButtonConfig extends Partial<ButtonProps> {
    href?: string;
    text?: string;
    icon?: Component | string;
    target?: string;
    rel?: string;
    'aria-label'?: string;
}
  
export interface VTextBlockConfig {
    title?: string;
    titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    subtitle?: string;
    subtitle2?: string;
    text?: string;
    buttons?: VTextButtonConfig[];
}