import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  tipo: any;
  email: any;
  nombre: any;
  apellido: any;
  panoramas: any;

  empresa:any;
  numeroContacto: any;
  nombreContacto: any;
  descripcionEmpresa: any;

  closeResult: any;

  exito: any;
  modalReference: NgbModalRef;
  modalReference2: NgbModalRef;
  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router ){
  
  }
  ngOnInit(){
    this.tipo = 'undefined';
    this.email = '';
    this.exito = false;
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {size: 'lg'});
    this.modalReference.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});
  }

  abrir(content2) {
    this.modalReference2 = this.modalService.open(content2, {size: 'lg'});
    this.modalReference2.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onSubmit(){
     if(this.tipo == 'proveedor'){
       let nuevoProveedor = {
         tipo: this.tipo,
         email: this.email,
         empresa: this.empresa,
         nombreContacto: this.nombreContacto,
         numeroContacto: this.numeroContacto,
         descripcion:  this.descripcionEmpresa
       }
       let headers = new HttpHeaders();
       interface Proveedor {
         success: String;
         msg: String
       }
       headers.append('Content-Type', 'application/json');
       this.http.post<Proveedor>('http://localhost:3000/nuevo-proveedor', nuevoProveedor, {headers: headers})
       .subscribe(data => {
       
       }); 
     }
     else if(this.tipo =='usuario'){
      let nuevoUsuario = {
        tipo: this.tipo,
        email: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
        panoramas: this.panoramas
      }
      interface Usuario  {
        success: String;
        msg: String
      }
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      this.http.post<Usuario>('http://localhost:3000/nuevo-usuario', nuevoUsuario, {headers: headers})
      .subscribe(data => {
        if(data.success){
          this.exito = true;
          setTimeout(() => {
            this.modalReference.close();
            this.exito = false;
            this.tipo = 'undefined';
            this.email = '';
            this.nombre = '';
            this.apellido = '';
            this.panoramas = '';
          }, 1750);
         
        }
      }); 
     }

  }
}
