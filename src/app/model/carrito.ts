import { Producto } from './producto';

export class Carrito {
    id: number;
    estado: string;
    totalcondescuento: number;
    totalsindescuento: number;
    productos: Producto[];
}