import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './pomodoro.component.html',
})
export class PomodoroComponent {
  // Constantes de tiempo en segundos
  private readonly WORK_TIME = 25 * 60;
  private readonly BREAK_TIME = 5 * 60;

  // Signals de estado
  timeLeft = signal<number>(this.WORK_TIME);
  isRunning = signal<boolean>(false);
  isBreak = signal<boolean>(false);

  private intervalId: any = null;

  // Signal computado para formatear el tiempo (ej: 1500 segundos -> "25:00")
  displayTime = computed(() => {
    const minutes = Math.floor(this.timeLeft() / 60);
    const seconds = this.timeLeft() % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  toggleTimer() {
    if (this.isRunning()) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  private startTimer() {
    this.isRunning.set(true);
    this.intervalId = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update(time => time - 1);
      } else {
        this.handleSessionSwitch();
      }
    }, 1000);
  }

  private pauseTimer() {
    this.isRunning.set(false);
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetTimer() {
    this.pauseTimer();
    this.timeLeft.set(this.isBreak() ? this.BREAK_TIME : this.WORK_TIME);
  }

  private handleSessionSwitch() {
    this.pauseTimer();
    // Cambiamos alternadamente de sesión
    this.isBreak.update(val => !val);
    this.timeLeft.set(this.isBreak() ? this.BREAK_TIME : this.WORK_TIME);
    // Notificación visual simple o feedback acústico futuro
    alert(this.isBreak() ? '¡Tiempo de enfocarse terminado! Toma un descanso.' : '¡Descanso terminado! Al lío de nuevo.');
    this.startTimer();
  }
}
