export class Objeto {
    constructor(nombre, imagen, rareza, tipo, bonus, precio) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.rareza = rareza;
        this.tipo = this.validarTipo(tipo);
        this.bonus = bonus;
        this.precio = precio;
        this.precioOriginal = precio
    }
    // Funcion para aplicar el objeto
    aplicarObjeto(jugador) {
        switch (this.tipo) {
            case "arma":
                jugador.ataque += this.bonus;
                break
            case "armadura":
                jugador.defensa += this.bonus;
                break
            case "consumible":
                jugador.vida += this.bonus;
                break
        }

        jugador.oroCentimos -= this.precio
    }

    // Funcion validar el tipo objeto
    validarTipo(tipo) {
        switch (tipo.toLowerCase()) {
            case "arma":
                return "arma";

            case "armadura":
                return "armadura";

            case "consumible":
                return "consumible";

            default:
                return "arma";
        }
    }

    // Funcion para devolver un valor descuento
    descuento(rebaja) {
        this.precio -= this.precio * (rebaja / 100)
    }

    precioEuro() {
        let euros = this.precio / 100
        let eurosString = Math.abs(euros).toFixed(2)

        return eurosString + " " + "€"
    }

    precioOriginalEuro() {
        let euros = this.precioOriginal / 100
        let eurosString = Math.abs(euros).toFixed(2)

        return eurosString + " " + "€"
    }
}
