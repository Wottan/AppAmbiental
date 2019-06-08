import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Usuario } from '../clases/usuario';

import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass']
})

export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];

  usuarioSeleccionado: Usuario;
  //usuarios: any;

  // usuarios: Usuario[] = [
  //   { id: 11, firstName: 'Mr. Nice', lastName: "asd", age: 20 },
  //   { id: 12, firstName: 'Narco', lastName: "asd", age: 20 },
  //   { id: 13, firstName: 'Bombasto', lastName: "asd", age: 20 },
  //   { id: 14, firstName: 'Celeritas', lastName: "asd", age: 20 },
  //   { id: 15, firstName: 'Magneta', lastName: "asd", age: 20 },
  //   { id: 16, firstName: 'RubberMan', lastName: "asd", age: 20 },
  //   { id: 17, firstName: 'Dynama', lastName: "asd", age: 20 },
  //   { id: 18, firstName: 'Dr IQ', lastName: "asd", age: 20 },
  //   { id: 19, firstName: 'Magma', lastName: "asd", age: 20 },
  //   { id: 20, firstName: 'Tornado', lastName: "asd", age: 20 }
  // ];

  /*   usuario: Usuario = {
      id: 1,
      firstName: 'Windstorm',
      lastName: 'Hola',
      age: 21
    }; */

  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    age: [],
  });

  editarForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    age: [],
  });

  constructor(private fb: FormBuilder, private usuarioServicio: UsuarioService) { }

  ngOnInit() {
    console.log('Inicio');
    // this.getUsuarios();
    // this.http.get('http://localhost:50000/usuarios')
    //   .subscribe(data => {   // data is already a JSON object
    //     console.log(new Promise(resolve => (data)));
    //   });
    this.getUsuarios();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.agregarUsuario(this.profileForm.value);
    console.warn(this.profileForm.value);
  }

  async getUsuarios() {
    // await this.usuarioServicio.getUsuarios().then(usuarios => {
    //   console.log(usuarios);
    //   this.usuarios = usuarios;
    // });
    // .subscribe(usuarios => this.usuarios = usuarios);
    await this.usuarioServicio.getUsuarios().subscribe(usuarios => { this.usuarios = usuarios, console.log(usuarios) }, complete => { console.log(complete) });
  }

  agregarUsuario(usuario: Usuario): void {
    //name = name.trim();
    //if (!name) { return; }
    this.usuarioServicio.agregarUsuario(usuario/* { firstName } as Usuario */)
      .subscribe(usuario => {
        this.usuarios.push(usuario);
      });
  }

  alSeleccionar(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.editarForm.setValue({
      firstName: usuario.firstName,
      lastName: usuario.lastName,
      age: usuario.age
    });
  }

  delete(usuario): void {
    this.usuarios = this.usuarios.filter(h => h !== usuario);
    this.usuarioServicio.borrarUsuario(usuario).subscribe();
  }

  onEditar(): void {
    // TODO: Use EventEmitter with form value
    // this.agregarUsuario(this.profileForm.value);
    // console.warn(this.profileForm.value);
    this.usuarioServicio.editarUsuario(this.editarForm.value)
      .subscribe(usuario => console.log(usuario)/* () => this.goBack() */);
    // this.usuarios.find(item => item.id == this.usuarioSeleccionado.id)
    this.usuarios = [];
    this.getUsuarios();
    console.log('Editar');
  }


  // updateItem(newItem) {
  //   for (let i = 0; i < this.usuarios.length; i++) {
  //     if (this.usuarios[i].id == newItem.id) {
  //       this.users[i] = newItem;
  //     }
  //   }
  // }
}
