import { Component, effect, signal } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-kanban',
  imports: [CommonModule, FormsModule, DragDropModule, CardComponent, ButtonComponent],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent {
  // Estado inicial recuperando de localStorage o listas vacías
  todo = signal<string[]>(JSON.parse(localStorage.getItem('kanban_todo') || '["Refactorizar servicios", "Añadir tests unitarios"]'));
  done = signal<string[]>(JSON.parse(localStorage.getItem('kanban_done') || '["Configurar Tailwind v4"]'));

  // Input para añadir nuevas tareas
  newTask = signal<string>('');

  constructor() {
    // Persistencia automática con efectos de Angular
    effect(() => {
      localStorage.setItem('kanban_todo', JSON.stringify(this.todo()));
    });
    effect(() => {
      localStorage.setItem('kanban_done', JSON.stringify(this.done()));
    });
  }

  addTask() {
    const task = this.newTask().trim();
    if (task) {
      this.todo.update(tasks => [...tasks, task]);
      this.newTask.set(''); // Limpiar input
    }
  }

  deleteTask(list: 'todo' | 'done', index: number) {
    if (list === 'todo') {
      this.todo.update(tasks => tasks.filter((_, i) => i !== index));
    } else {
      this.done.update(tasks => tasks.filter((_, i) => i !== index));
    }
  }

  // Función mágica del CDK que maneja el movimiento visual y de datos
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Mover dentro de la misma lista
      const array = [...event.container.data];
      moveItemInArray(array, event.previousIndex, event.currentIndex);
      this.updateListSignal(event.container.id, array);
    } else {
      // Mover entre listas diferentes
      const previousArray = [...event.previousContainer.data];
      const currentArray = [...event.container.data];

      transferArrayItem(
        previousArray,
        currentArray,
        event.previousIndex,
        event.currentIndex
      );

      this.updateListSignal(event.previousContainer.id, previousArray);
      this.updateListSignal(event.container.id, currentArray);
    }
  }

  private updateListSignal(id: string, newArray: string[]) {
    if (id === 'todo-list') this.todo.set(newArray);
    if (id === 'done-list') this.done.set(newArray);
  }
}
