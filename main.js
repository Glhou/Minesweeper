const app = new Vue({
    el : "#app",
    data: {
        boutons : [{
            voisin : 0,
            decouvert: false,
            ligne: 0,
            colone: 0,
        },
        {
            voisin : 1,
            decouvert: false,
            ligne: 0,
            colone: 1,
        },
        {
            voisin : -1,
            decouvert: false,
            ligne: 0,
            colone: 2,
        },
        {
            voisin : 0,
            decouvert: false,
            ligne: 1,
            colone: 0,
        },
        {
            voisin : 1,
            decouvert: false,
            ligne: 1,
            colone: 1,
        },
        {
            voisin : 0,
            decouvert: false,
            ligne: 1,
            colone: 2,
        },
        {
            voisin : 0,
            decouvert: false,
            ligne: 2,
            colone: 0,
        },
        {
            voisin : 0,
            decouvert: false,
            ligne: 2,
            colone: 1,
        },
        {
            voisin : 0,
            decouvert: false,
            ligne: 2,
            colone: 2,
        },
    ],
        lignes: 3,
        colones: 3,
    },
    methods:{
        decouvre : function (button) {
            button.decouvert = true
        }
    }
  })



