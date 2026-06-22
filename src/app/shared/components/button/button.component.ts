import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styles: ``,
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'danger'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);

  btnClick = output<void>();

  handleClick() {
    if (!this.disabled()) {
      this.btnClick.emit();
    }
  }
}
