import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.sass']
})
export class UsuarioDetalleComponent implements OnInit {

  @Input()
  usuario: Usuario;

  constructor(
    private route: ActivatedRoute,
    private usuarioServicio: UsuarioService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuarioServicio.getUsuario(id)
      .subscribe(usuario => this.usuario = usuario);
  }

  goBack(): void {
    this.location.back();
  }

  guardar(): void {

    this.usuarioServicio.editarUsuario(this.usuario)
      .subscribe(() => this.goBack()/* () => this.goBack() */);
    // this.usuarios.find(item => item.id == this.usuarioSeleccionado.id)
    console.log('Editar');
  }



}
