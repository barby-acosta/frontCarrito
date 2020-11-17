import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './model/producto';
import { Carrito } from './model/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private baseUrl = 'http://localhost:8080/carritoDeCompras';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get<Producto[]>(`${this.baseUrl}/producto/productos`);
  }

  addCarrito(dni: string): Observable<any> {
    return this.http.get<number>(`${this.baseUrl}/carrito/create/${dni}`);
  }

  getCarrito(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/carrito/carritos/${id}`);
  }

  getReporte(dni: string): Observable<any> {
    return this.http.get<Producto[]>(`${this.baseUrl}/producto/reporte/${dni}`);
  }

  deleteCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/carrito/carritos/${id}`);
  }

  addProducto(prod_id: number, carrito_id: number): Observable<any> {
    return this.http.get<number>(`${this.baseUrl}/carrito/add/${prod_id}/${carrito_id}`);
  }

  removeProducto(prod_id: number, carrito_id: number): Observable<any> {
    return this.http.get<number>(`${this.baseUrl}/carrito/remove/${prod_id}/${carrito_id}`);
  }

  finalizar(carrito_id: number): Observable<any> {
    return this.http.get<number>(`${this.baseUrl}/carrito/finalizar/${carrito_id}`);
  }

}
