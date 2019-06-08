import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuariosUrl = 'http://localhost:50000/usuarios';
  usuarios: Usuario[] = [
    { id: 11, firstName: 'Mr. Nice', lastName: "asd", age: 20 },
    { id: 12, firstName: 'Narco', lastName: "asd", age: 20 },
    { id: 13, firstName: 'Bombasto', lastName: "asd", age: 20 },
    { id: 14, firstName: 'Celeritas', lastName: "asd", age: 20 },
    { id: 15, firstName: 'Magneta', lastName: "asd", age: 20 },
    { id: 16, firstName: 'RubberMan', lastName: "asd", age: 20 },
    { id: 17, firstName: 'Dynama', lastName: "asd", age: 20 },
    { id: 18, firstName: 'Dr IQ', lastName: "asd", age: 20 },
    { id: 19, firstName: 'Magma', lastName: "asd", age: 20 },
    { id: 20, firstName: 'Tornado', lastName: "asd", age: 20 }
  ];
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosUrl);
  }

  getUsuario(id: number): Observable<Usuario> {
    const url = `${this.usuariosUrl}/${id}`;
    return this.http.get<Usuario>(url).pipe(/* 
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`)) */
    );
  }

  /** POST: add a new hero to the server */
  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.usuariosUrl, usuario, httpOptions).pipe(
     /*  tap((nuevoUsuario: Usuario) => this.log(`added usuario w/ id=${nuevoUsuario.id}`)),
      catchError(this.handleError<Usuario>('addHero'))
     */);
  }

  /** DELETE: delete the hero from the server */
  borrarUsuario(usuario: Usuario | number): Observable<Usuario> {
    const id = typeof usuario === 'number' ? usuario : usuario.id;
    const url = `${this.usuariosUrl}/${id}`;

    return this.http.delete<Usuario>(url, httpOptions).pipe(/* 
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero')) */
    );
  }

  /** PUT: update the hero on the server */
  editarUsuario(usuario: Usuario): Observable<any> {
    // const id = typeof usuario === 'number' ? usuario : usuario.id;
    const url = `${this.usuariosUrl}/${usuario.id}`;
    return this.http.put(url, usuario, httpOptions).pipe(/* 
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero')) */
    );
  }
}
