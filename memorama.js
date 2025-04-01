let pokemon = []
let imagen = []
let fila = 2
let col = 10
let anchoC, altoC
let dorso
let cartas = []
let select = []
let par = []
let pokeId = shuffleArray([1,5,10,15,20,25,30,35,40,45,1,5,10,15,20,25,30,35,40,45])


function setup(){
    createCanvas(1899,800)
    anchoC = width/ col
    altoC = height/ fila
    loadPokemon(pokeId)
}

function draw(){
    background(loadImage("pokeback.jpg"))
        dibujarCartas()
}

function mousePressed(){
    for(let carta of cartas){
        if(carta.estaDentro(mouseX,mouseY) && !carta.descubierta){
            carta.descubierta = true
            select.push(carta)

            if(select.length === 2){
                setTimeout(verificarPar, 600)
            }
            break
        }
    }
}


function loadPokemon(idList){
    for(let i =0; i<idList.length; i++){
        let url = `https://pokeapi.co/api/v2/pokemon/${idList[i]}`;

        fetch(url)
        .then(response => response.json())
        .then((data) =>{
            pokemon[i] = data
            imagen[i] = loadImage(data.sprites.front_default)
            crearCarta()
        })
    
        .catch(error => console.error("ERROR AL CARGAR POKEMON", error))
    }
    
}

function crearCarta(){
    if(imagen.length !== pokeId.length) return

    cartas = []
    let index = 0
    for(let y = 0; y< fila; y++){
        for(let x = 0; x<col; x++){
            cartas.push(new Carta(x*anchoC, y*altoC, imagen[index], pokeId[index]))
            index++
        }
    }
}

function dibujarCartas(){
    for(let carta of cartas){
        carta.mostrar()
    }
}

function verificarPar(){
    if(select[0].id === select[1].id){
        par.push(...select)
        alert("has encontrado un par :D")
        if(par.length === cartas.length){
            setTimeout(() => {
                alert("ENCONTRASTE TODOS LOS PARES YUJUUUUUU!!!")
                reset()
            }, 1000)
        }
    }else{
        select[0].descubierta = false
        select[1].descubierta = false
        alert("ese no es par menso")
    }
    select=[]
}

function reset(){
    par=[]
    select=[]
    pokeId = shuffleArray([...pokeId])
    pokemon=[]
    imagen=[]
    loadPokemon(pokeId)
}

function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
}

class Carta{
    constructor(x,y,imagen,id){
        this.x = x
        this.y = y
        this.ancho = anchoC-10
        this.alto = altoC-10
        this.imagen = imagen
        this.id = id
        this.descubierta = false
    }

    mostrar(){
        fill("grey");
    stroke(2);
        rect(this.x, this.y, this.ancho, this.alto, 10)

        if(this.descubierta || par.includes(this)){
            image(this.imagen, this.x + this.ancho / 4, this.y + this.alto/4, this.ancho/2, this.alto/2)
        }else{
            fill("red")
            textSize(32)
            textAlign(CENTER, CENTER)
            text("?", this.x + this.ancho / 2, this.y + this.alto / 2)
        }
    }

    estaDentro(px, py){
        return px > this.x && px < this.x + this.ancho && py >this.y && py <this.y + this.alto
    }
}