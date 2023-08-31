import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Users } from '../entity/Users';
import { UsersService } from '../services-backend/users/users.service';
import { PersonService } from '../services-backend/person/person.service';
import { Person } from '../entity/Person';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public id: number | undefined;
  public idPerson = 0;
  public username = "";
  public email = "";
  public password = "";
  public image = "";
  selectedPersonId: any = null;
  // public ci: number | undefined;
  // public phone: number | undefined;
  personData: any;
  public listUsers: Users[] = [];
  public listPerson: Person[] = [];
  
  editedUserId: number | null = null;
  isButtonActive = false;
  addButton: boolean = true;
  editButton: boolean = false;
  shouldResetButtons: boolean = false;
  constructor(private usersService: UsersService, private alertController: AlertController, private personService: PersonService) {

    // let usuario: Usuarios = new Usuarios();
    // usuario.nombreCompleto = "Maicol erick";
    // usuario.userName = "maicolarteaga0711@gmail.com";
    // usuario.password = "123";

    // this.listaUsuarios.push(usuario);
    
    this.getPerson();
    this.getUsers();
  }

  public getUsers() {
    this.usersService.GetUsers().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listUsers = response.body;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        
      }
    })
  }

  public getPerson() {
    this.personService.GetPerson().subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);
        this.listPerson = response.body;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        
      }
    })
  }

  personSelected(event: any) {
    this.idPerson = 0;
    const selectedPersonId = event.detail.value;
    this.idPerson = selectedPersonId;
  }

  toggleEdit(id: number) {
    if (this.editedUserId === id) {
      this.editedUserId = null;
      this.isButtonActive = false;
      this.addButton = true; // Mostrar el botón de "Guardar"
      this.editButton = false; // Ocultar el botón de "Editar"
      this.id = undefined;
      this.image = "";
    } else {
      this.editedUserId = id;
      this.id = id;
      this.isButtonActive = true;
      this.addButton = false; // Ocultar el botón de "Guardar"
      this.editButton = true; // Mostrar el botón de "Editar"
      this.getIdUser(id);
    }
  }
  
  addUsers (){
    this.AddPersonBackend(this.username, this.password, this.image,this.idPerson);
  }

  // Guardar nuevo usuario
  public AddPersonBackend(username: string, password:string, image:string,idPerson: number){
    var users = new Users();
    users.userName = username;
    users.password = password;
    users.idPerson = idPerson;
    users.image = image;
      this.usersService.AddUsers(users).subscribe({
        next: (response: HttpResponse<any>) => {
            // console.log(users)//1
            if(response.body == 1){
                alert("Se agrego el USUARIO con exito :)");
                this.selectedPersonId = null;
                this.username = ""; 
                this.password = ""; 
                this.image = "";
                this.idPerson = 0;
                this.getUsers();//Se actualize el listado
            }else{
                alert("Al agregar al USUARIO fallo exito :(");
            }
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            console.log('complete - this.AddUsers()');
        },
    });
  }


  getIdUser(id: number | undefined) {
    this.usersService.GetByIdUsers(id).subscribe({
      next: (response: HttpResponse<any>) => {
        this.personData = response.body;
        const {id, password, image} = response.body
        this.id = id;
        this.image = image;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        // console.log('complete - this.editPerson()');
      },
    });
  }

  editUsers() 
  {
    if(this.editedUserId != 0 && this.editedUserId != undefined){
      
      var users = new Users();
      users.id = this.id;
      users.password = this.password;
      users.image = this.image;

      // if(this.personData > 0){
        
      this.usersService.EditUsers(users).subscribe({
        next: (response: HttpResponse<any>) => {
          if(response.body == 1){
            console.log(users)
              this.editedUserId = null;
              this.isButtonActive = false;
              this.addButton = true; // Mostrar el botón de "Guardar"
              this.editButton = false; // Ocultar el botón de "Editar"
              this.id = undefined;
              this.password = "";
              this.image = "";
              this.personData = {};
              this.editedUserId = 0;
              this.isButtonActive = false;
              this.shouldResetButtons = false;
              alert("Usuario actualizado correctamente");
              this.getUsers();
          }else{
              alert("Algo sucedio :(");
          }
      },
      error: (error: any) => {
          console.log(error);
      },
      complete: () => {
          console.log('complete - this.editUsers()');
      },
      });
    // }else{
    //   alert('Ingresar un codigo correcto');
    // }
  }
}
  
  // Eliminar usuario
  public async deleteUsers(id: number | undefined) {
    this.id = id;

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar a este Usuario?',
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
            this.usersService.DeletePerson(this.id).subscribe({
              next: (response: HttpResponse<any>) => {
                // Lógica de eliminación exitosa
                this.getUsers();
              },
              error: (error: any) => {
                this.getUsers();
                // console.log(error);
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
