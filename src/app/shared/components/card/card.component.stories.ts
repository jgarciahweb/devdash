import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';

const meta: Meta<CardComponent> = {
  title: 'Shared/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  // Aseguramos que Storybook reconozca que "title" es un texto modificable
  argTypes: {
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

// Variación 1: Con Título (Le pasamos el argumento directamente)
export const ConTitulo: Story = {
  args: {
    title: 'Mi Widget Pro',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-6 bg-slate-100 dark:bg-slate-900 min-h-[200px]">
        <!-- Forzamos el binding explícito [title]="title" -->
        <app-card [title]="title">
          <p class="text-sm">Este es el contenido interno de nuestro widget de ejemplo con cabecera.</p>
        </app-card>
      </div>
    `,
  }),
};

// Variación 2: Sin Título (Se lo pasamos vacío)
export const SinTitulo: Story = {
  args: {
    title: '', // Dejamos el título completamente vacío
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-6 bg-slate-100 dark:bg-slate-900 min-h-[200px]">
        <app-card [title]="title">
          <p class="text-sm">Una tarjeta limpia sin cabecera, ideal para elementos simples.</p>
        </app-card>
      </div>
    `,
  }),
};
