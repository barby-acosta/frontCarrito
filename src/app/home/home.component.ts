import { Observable } from "rxjs";
import { CarritoService } from "../carrito.service";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Producto } from '../model/producto';
import { Carrito } from '../model/carrito';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dni: string;
  idCarrito: number;
  productos: Producto[] = [];
  productosreporte: Producto[] = [];
  carrito: Carrito = new Carrito();

  flagInicio: boolean;
  flagReporte: boolean;

  constructor(private carritoService: CarritoService,
    private router: Router) { }
  ngOnInit() {
    this.init();
  }

  init() {
    this.dni = '1111';
    this.flagInicio = true;
    this.flagReporte = false;
    this.listarProductos();
  }

  iniciar() {
    this.crearCarrito();
    this.flagInicio = false;
  }

  listarProductos() {
    //voy a buscar los productos
    this.carritoService.getProductos()
      .subscribe(
        data => {
          this.productos = data;
        },
        error => {
          console.log(error);
        });
  }

  crearCarrito() {
    this.carritoService.addCarrito(this.dni)
      .subscribe(
        data => {
          this.idCarrito = data.id;
          console.log("id", this.idCarrito);
          this.consultarCarrito();
        },
        error => {
          console.log(error);
        });
  }

  consultarCarrito() {
    this.carritoService.getCarrito(this.idCarrito)
      .subscribe(
        data => {
          this.carrito = data;
        },
        error => {
          console.log(error);
        });
  }

  eliminarCarrito() {
    this.carritoService.deleteCarrito(this.idCarrito)
      .subscribe(
        data => {
          this.flagInicio = true;
          this.flagReporte = false;
        },
        error => {
          console.log(error);
        });
  }

  comprar() {
    this.carritoService.finalizar(this.idCarrito)
      .subscribe(
        data => {
          this.flagInicio = true;
          this.flagReporte = false;
        },
        error => {
          console.log(error);
        });
  }

  agregarProducto(id: number) {
    this.carritoService.addProducto(id, this.idCarrito)
      .subscribe(
        data => {
          this.carrito = data;
        },
        error => {
          console.log(error);
        });
  }

  eliminarProducto(id: number) {
    this.carritoService.removeProducto(id, this.idCarrito)
      .subscribe(
        data => {
          this.carrito = data;
        },
        error => {
          console.log(error);
        });
  }

  reporte() {
    if (this.flagReporte) {
      this.flagReporte = false;
    } else {
      this.flagReporte = true;
      this.getReporte();
    }
  }

  getReporte() {
    this.carritoService.getReporte(this.dni)
      .subscribe(
        data => {
          this.productosreporte = data;
        },
        error => {
          console.log(error);
        });
  }
}
