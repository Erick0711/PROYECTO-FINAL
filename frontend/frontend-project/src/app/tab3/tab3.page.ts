import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Rol } from '../entity/Rol';
import { RolService } from '../services-backend/rol/rol.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public id: number | undefined;
  public name = "";
  public listRol: Rol[] = [];
  
  personData: any;

  addButton: boolean = true;
  editButton: boolean = false;
  editedRolId: number | undefined;
  isButtonActive: boolean = false;
  shouldResetButtons: boolean = false;

  constructor(private rolService: RolService, private alertController: AlertController) {
    this.getRol();
  }

  public getRol(){
      this.rolService.GetRol().subscribe({
        next: (response: HttpResponse<any>) => {
          this.listRol = response.body;
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          
        }
      })
  }

   public addRol(){
    this.AddRolBackend(this.name)
  }

  public AddRolBackend(name: string){
    var rol = new Rol();
    rol.name = name;


      this.rolService.AddRol(rol).subscribe({
        next: (response: HttpResponse<any>) => {
            console.log(rol)//1
            if(response.body == 1){
                alert("Se agrego la Persona con exito :)");
                this.getRol();//Se actualize el listado
                this.name = "";
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

  getIdRol(id: number | undefined) {
    this.rolService.GetByIdRol(id).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response.body);
        this.personData = response.body;
        const {id, name} = response.body;
        // this.editedPersonId = id;
        // this.isButtonActive = true;
        if (this.editedRolId === id && this.isButtonActive) {
          this.addButton = true;
          this.editButton = false;
          this.shouldResetButtons = true;
          this.isButtonActive = false;
          this.editedRolId = undefined;
          this.id = undefined;
          this.name = "";
        } else {
          this.addButton = false;
          this.editButton = true;
          this.shouldResetButtons = false;
          this.isButtonActive = true;
          this.id = id;
          this.editedRolId = id;
          this.name = name;
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


  editRol() 
  {
    if(this.editedRolId != 0 && this.editedRolId != undefined){
      
      var rol = new Rol();
      rol.id = this.id;
      rol.name = this.name;

      if(this.personData.id > 0){
        
      this.rolService.EditRol(rol).subscribe({
        next: (response: HttpResponse<any>) => {
          if(response.body == 1){
            console.log(response.body);
              this.id = undefined;
              this.name = "";
              this.personData = {};
              this.addButton = true;
              this.editButton = false;
              this.editedRolId = undefined;
              this.isButtonActive = false;
              this.shouldResetButtons = false;
              alert("Rol actualizada correctamente");
              this.getRol();
          }else{
              alert("Algo sucedio :(");
          }
      },
      error: (error: any) => {
          console.log(error);
      },
      complete: () => {
          console.log('complete - this.editRol()');
      },
      });
    }else{
      alert('Ingresar un codigo correcto');
    }
  }
}


  
  public async deleteRol(id: number | undefined) {
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
            this.rolService.DeleteRol(this.id).subscribe({
              next: (response: HttpResponse<any>) => {
                // Lógica de eliminación exitosa
                this.getRol();
              },
              error: (error: any) => {
                console.log(error);
                this.getRol();
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
