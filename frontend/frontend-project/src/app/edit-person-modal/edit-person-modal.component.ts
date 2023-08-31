import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-person-modal',
  templateUrl: './edit-person-modal.component.html',
  styleUrls: ['./edit-person-modal.component.scss']
})
export class EditPersonModalComponent {
  public id: number | undefined;
  public name = "";
  public lastName = "";
  public ci: number | undefined;
  public phone: number | undefined;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  saveChanges() {
    // Implement logic to save changes here
    // You can use this.id, this.name, this.lastName, this.ci, this.phone
    // Close the modal after saving
    this.modalController.dismiss();
  }
}
