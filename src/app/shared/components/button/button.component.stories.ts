import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';

// Configuración principal de la historia
const meta: Meta<ButtonComponent> = {
  title: 'Shared/Button', // Categoría en el menú lateral de Storybook
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// Variación 1: Botón Primario
export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled">Primary Button</app-button>`,
  }),
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

// Variación 2: Botón Secundario
export const Secondary: Story = {
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled">Secondary</app-button>`,
  }),
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
  },
};
