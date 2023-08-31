import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Person } from '../entity/Person';
import { PersonService } from '../services-backend/person/person.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public id: number | undefined;
  public name = "";
  public lastName = "";
  public ci: number | undefined;
  public phone: number | undefined;

  public listPerson: Person[] = [];
  
  personData: any;

  addButton: boolean = true;
  editButton: boolean = false;
  editedPersonId: number | undefined;
  isButtonActive: boolean = false;
  shouldResetButtons: boolean = false;
  constructor(private personService: PersonService, private alertController: AlertController) {
    this.getPerson();
  }

  public getPerson() {
    this.personService.GetPerson().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listPerson = response.body;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        
      }
    })
  }

  public addPerson(){
    this.AddPersonBackend(this.name, this.lastName, this.ci, this.phone)
  }

  public AddPersonBackend(name: string, lastName: string, ci:number | undefined, phone:number | undefined){
    var person = new Person();
    person.name = name;
    person.lastName = lastName;
    person.ci = ci;
    person.phone = phone;

      this.personService.AddPerson(person).subscribe({
        next: (response: HttpResponse<any>) => {
            console.log(person)//1
            if(response.body == 1){
                alert("Se agrego la Persona con exito :)");
                this.getPerson();//Se actualize el listado
                this.name = "";
                this.lastName = "";
                this.ci = undefined;
                this.phone = undefined
            }else{
                alert("Al agregar la Persona fallo exito :(");
            }
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            console.log('complete - this.AddPerson()');
        },
    });
  }

  getIdPerson(id: number | undefined) {
    this.personService.GetByIdPerson(id).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response.body);
        this.personData = response.body;
        const {id, name, lastName, ci, phone} = response.body;
        // this.editedPersonId = id;
        // this.isButtonActive = true;
        if (this.editedPersonId === id && this.isButtonActive) {
          this.addButton = true;
          this.editButton = false;
          this.shouldResetButtons = true;
          this.isButtonActive = false;
          this.editedPersonId = undefined;
          this.id = undefined;
          this.name = "";
          this.lastName = "";
          this.ci = undefined;
          this.phone = undefined
        } else {
          this.addButton = false;
          this.editButton = true;
          this.shouldResetButtons = false;
          this.isButtonActive = true;
          this.id = id;
          this.editedPersonId = id;
          this.name = name;
          this.lastName = lastName;
          this.ci = ci;
          this.phone = phone
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        // console.log('complete - this.editPerson()');
      },
    });
  }


  editPerson() 
  {
    if(this.editedPersonId != 0 && this.editedPersonId != undefined){
      
      var person = new Person();
      person.id = this.id;
      person.name = this.name;
      person.lastName = this.lastName;
      person.ci = this.ci;
      person.phone = this.phone;

      if(this.personData.id > 0){
        
      this.personService.EditPerson(person).subscribe({
        next: (response: HttpResponse<any>) => {
          if(response.body == 1){
            console.log(response.body);
              this.id = undefined;
              this.name = "";
              this.lastName = "";
              this.ci = undefined;
              this.phone = undefined
              this.personData = {};
              this.addButton = true;
              this.editButton = false;
              this.editedPersonId = undefined;
              this.isButtonActive = false;
              this.shouldResetButtons = false;
              alert("Persona actualizada correctamente");
              this.getPerson();
          }else{
              alert("Algo sucedio :(");
          }
      },
      error: (error: any) => {
          console.log(error);
      },
      complete: () => {
          console.log('complete - this.editPerson()');
      },
      });
    }else{
      alert('Ingresar un codigo correcto');
    }
  }
}


  
  public async deletePerson(id: number | undefined) {
    this.id = id;
    // var person = new Person();
    // person.id = this.id;

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar a esta persona?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // Acción a realizar si se presiona el botón "Cancelar"
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.personService.DeletePerson(this.id).subscribe({
              next: (response: HttpResponse<any>) => {
                // Lógica de eliminación exitosa
                this.getPerson();
              },
              error: (error: any) => {
                console.log(error);
                this.getPerson();
              },
              complete: () => {
                // console.log('complete - this.deletePerson()');
              },
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
