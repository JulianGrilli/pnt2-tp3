new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
        },
        atacar: function () {
            const valorAtaque = this.calcularHeridas(this.rangoAtaque);
            this.saludMonstruo = this.saludMonstruo - valorAtaque;
            const evento = this.obtenerEvento(true, valorAtaque);
            this.registrarEvento(evento)
            this.ataqueDelMonstruo();
            this.verificarGanador();
            
        },

        ataqueEspecial: function () {
            const valorAtaque = this.calcularHeridas(this.rangoAtaqueEspecial);
            this.saludMonstruo = this.saludMonstruo - valorAtaque;
            const evento = this.obtenerEvento(true, valorAtaque);
            this.registrarEvento(evento)
            this.ataqueDelMonstruo();
            this.verificarGanador();
            
        },

        curar: function () {
            if(this.saludJugador <= 90) {
                this.saludJugador += 10;
            } else {
                this.saludJugador = 100;
            }
        },

        registrarEvento(evento) {
            this.turnos.unshift(evento);
        },

        obtenerEvento(valorEsJugador, valorAtaque){
            const tipoJugador = valorEsJugador ? 'jugador' : 'monstruo';
            return {esJugador : valorEsJugador, text: `El ${tipoJugador} hizo un ataque de ${valorAtaque} %`}
        },

        terminarPartida: function () {
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
            this.hayUnaPartidaEnJuego = false
        },

        ataqueDelMonstruo: function () {
            const contraAtaqueMonstruo = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            this.saludJugador = this.saludJugador - contraAtaqueMonstruo;
            const evento = this.obtenerEvento(false, contraAtaqueMonstruo);
            this.registrarEvento(evento);
            this.verificarGanador();
        },

        calcularHeridas: function (rango) {
            const minimoAtaque = rango[0];
            const maximoAtaque = rango[1];
            return Math.floor(Math.random() * (maximoAtaque - minimoAtaque + 1) ) + minimoAtaque;

        },
        verificarGanador: function () {
            if(this.saludJugador <= 0) {
                var r = confirm('Perdiste ! Deseas volver a jugar?');
            }else if(this.saludMonstruo <= 0){
                var r = confirm('Ganaste ! Deseas volver a jugar?');
            }
            if(r == true){
                this.terminarPartida();
            } else {
                // No estaba definido qué hacer en este caso.
            } 
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});