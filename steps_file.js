// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.


     conversionTextToNumber: function (pin){
      const expression = pin.replace('=?', '');
      const result = eval(expression);

      this.click(result.toString());
  },
  
  extractNumbertoText: function (pin){
    const regex = /\d+/; 
    const numeroExtraido = parseInt(pin.match(regex)[0]);
    const regex2 = /"(.*?)"/g;
    let letra = pin.match(regex2);
 
    let letraFinal ="";

    for (let i = 1; i <= numeroExtraido ; i++) {
      letraFinal+=letra
    }
    const expression = letraFinal.replace(/"/g, '');

    console.log("this"+expression.length);
    this.click("html>body>div:nth-of-type(2)>form>div>div:nth-of-type(2)>textarea");


    const fragmentos = 50; // Cantidad de caracteres por fragmento

for (let i = 0; i < expression.length; i += fragmentos) {
  const fragmento = expression.substring(i, i + fragmentos);
  this.appendField("html>body>div:nth-of-type(2)>form>div>div:nth-of-type(2)>p",fragmento)
}
},
extractEmoji: function (emoji,emojis){
  const regex1 = /\p{Emoji}/u ;

  const emojisABuscar = emoji.match(regex1);

  console.log("hola"+ emojisABuscar);

  const regex = new RegExp(emojisABuscar, "g");

  console.log(emojis)
  const occurrences = emojis.match(regex);

  console.log(occurrences);


  



  this.fillField("html>body>div:nth-of-type(2)>form>div>div:nth-of-type(3)>input",occurrences.length );
  
},

getMultiplos:  function (pin,pin2){
  const regex = /\d+/; 
  const numeroExtraido = parseInt(pin.match(regex)[0]);
  console.log("hola"+numeroExtraido);
  const lineas = pin2.trim().split('\n'); 
  const numeros = lineas.map(linea => parseInt(linea.trim())); 
  const multiplos = numeros.filter(numero => numero % numeroExtraido === 0);
  console.log(multiplos);

  for (let i = 0; i < multiplos.length; i++) {
    const num = multiplos[i];

    
    this.click("//label[text()[normalize-space()='"+num+"']]");
  }
  
},
getCoordenadas:  function (pin,pin2){

  
  const lineas = pin2.trim().split('\n'); 
  let numeros = lineas.map(linea => parseInt(linea.trim())); 

  function listaAMatriz(lista) {
    const longitud = lista.length;
    const raiz = Math.sqrt(longitud);
  
    if (lista.length !== raiz * raiz) {
      throw new Error("La lista debe contener exactamente 14*14 elementos.");
    }
  
    let matriz = new Array(raiz).fill(0).map(() => new Array(raiz).fill(0));
    let index = 0;
  
    for (let i = 0; i < raiz; i++) {
      for (let j = 0; j < raiz; j++) {
        matriz[i][j] = lista[index];
        index++;
      }
    }
  
    return matriz;
  }

  

  function eliminarNaN(array) {
   
    const arraySinNaN = array.filter((valor) => !isNaN(valor));
  
    return arraySinNaN;
  }

  function separarCoordenadas(stringCoordenadas) {
    const regex = /\((-?\d+),(-?\d+)\)/g;
    const coordenadas = [];
    let match;
  
    while ((match = regex.exec(stringCoordenadas)) !== null) {
      const x = parseInt(match[1]);
      const y = parseInt(match[2]);
      coordenadas.push([x, y]);
    }
  
    return coordenadas;
  }

  function sumarCoordenadas(coordenadas) {
    let sumaX = 0;
    let sumaY = 0;
  
    for (const coordenada of coordenadas) {
      sumaX += coordenada[0];
      sumaY += coordenada[1];
    }
  
    return [[sumaX, sumaY]];
  }
  
  function obtenerCoordenadasVecinas(coordenada) {
    const [x, y] = coordenada;
    const vecinas = [];
  
    // Coordenadas diagonales
    vecinas.push([x - 1, y - 1]);
    vecinas.push([x - 1, y + 1]);
    vecinas.push([x + 1, y - 1]);
    vecinas.push([x + 1, y + 1]);
  
    // Coordenadas inferiores
    vecinas.push([x + 1, y]);
    vecinas.push([x + 1, y - 1]);
    vecinas.push([x + 1, y + 1]);
  
    // Coordenadas laterales
    vecinas.push([x, y - 1]);
    vecinas.push([x, y + 1]);
  
    // Coordenadas superiores
    vecinas.push([x - 1, y]);
    vecinas.push([x - 1, y - 1]);
    vecinas.push([x - 1, y + 1]);
  
    // Filtrar coordenadas inválidas (x < 0 o x > 13 o y < 0 o y > 13)
    const coordenadasFiltradas = vecinas.filter(
      ([x, y]) => x >= 0 && x <= 13 && y >= 0 && y <= 13
    );
  
    // Eliminar coordenadas repetidas
    const coordenadasUnicas = [];
    const coordenadasVisitadas = new Set();
  
    for (const coordenada of coordenadasFiltradas) {
      const key = `${coordenada[0]},${coordenada[1]}`;
      if (!coordenadasVisitadas.has(key)) {
        coordenadasUnicas.push(coordenada);
        coordenadasVisitadas.add(key);
      }
    }
  
    return coordenadasUnicas;
  }
  

  function obtenerValorEnCoordenadas(matriz, coordenadas) {
    const [y, x] = coordenadas;
    // Verificar si las coordenadas están dentro del rango de la matriz
    if (x >= 0 && x < matriz.length && y >= 0 && y < matriz[0].length) {
      const botonCorrecto = matriz[x][y];
      return botonCorrecto;
    } else {
      return null;
    }
  }
  
  
  const stringCoordenadas = pin;
  const arrayCoordenadas = separarCoordenadas(stringCoordenadas);

  const resultadoCoordenadas = sumarCoordenadas(arrayCoordenadas);
  
  const vecinas = obtenerCoordenadasVecinas(resultadoCoordenadas[0]);


  numeros=eliminarNaN(numeros);

  console.log(arrayCoordenadas);



  const matriz = listaAMatriz(numeros);

  
  console.log(resultadoCoordenadas);

  console.log(vecinas);
  

  const boton = obtenerValorEnCoordenadas(matriz, resultadoCoordenadas[0])

  this.click(boton.toString());


  let resultSuma =0;

  for (let i = 0; i < vecinas.length; i++) {
    const coordenadaActual = vecinas[i];
    const valorEnCoordenada = obtenerValorEnCoordenadas(matriz, coordenadaActual);
    console.log(valorEnCoordenada);
    resultSuma += valorEnCoordenada;
   
  }
  resultSuma=resultSuma+boton;
  
  this.click("//input[@type='number']");
  this.fillField("//input[@type='number']",resultSuma.toString());
  this.wait(3);
  this.click("//button[@type='submit']");

  }
   
 

  });
  
   
}
