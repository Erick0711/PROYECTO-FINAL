import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EditPersonModalComponent } from './edit-person-modal.component';

@NgModule({
  declarations: [EditPersonModalComponent],
  imports: [
    CommonModule,
    IonicModule // Asegúrate de importar IonicModule aquí
  ],
  exports: [EditPersonModalComponent] // Si planeas usarlo en otros lugares
})
export class EditPersonModalModule {}