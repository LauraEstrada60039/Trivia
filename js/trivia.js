//MODULOS

//ELEMENTOS HTML
let contenedorFormulario = document.getElementById("contenedor-formulario");
let formularioTrivia = document.getElementById("trivia-formulario");
let contenedorPregunta = document.getElementById("contenedor-trivia");
let contenedorFinDelJuego = document.getElementById("contenedor-fin-juego");
let cantPreguntas = document.getElementById("cantidad-preguntas");
let categoria = document.getElementById("categoria");
let dificultad = document.getElementById("dificultad");
let tipo = document.getElementById("tipo");
let respuestas = document.getElementsByClassName("respuesta");

//VARIABLES DE CONTROL
let url;
let questions;
let qIndex = 0;
let correct_index_answer;
let porcentaje = (100/cantPreguntas.value);
let score=0;
let randomCategoria;
let randomDificultad;
let randomTipo;

//FUNCIONES
function dificultadRandom() {
  let letDificultad;
  let randomDificultad = Math.round(Math.random() * 2)+1;
  if (randomDificultad===1) {
    letDificultad = "easy";
  } 
  else if (randomDificultad===2) {
    letDificultad = "medium";
  }
  else {
    letDificultad = "hard";
  }
  return letDificultad;
}

function categoriaRandom() {
  let randomCategoria = Math.round(Math.random() * 23)+9;
  // console.log(randomCategoria);
  return randomCategoria;
}

function tipoRandom() {
  let letTipo;
  let randomTipo = Math.round(Math.random() * 1)+1;
  if (randomTipo===1) {
    letTipo = "multiple";
  } else {
    letTipo = "boolean";
  }
  return letTipo;
}

let getAPIData = e => {
  e.preventDefault();
  if (categoria.value == 0 && dificultad.value!=0 && tipo.value!=0 ) 
  {
    randomCategoria = categoriaRandom();
    url = `https://opentdb.com/api.php?amount=${cantPreguntas.value}&category=${randomCategoria}&difficulty=${dificultad.value}&type=${tipo.value}`;
    // console.log(url);
  }
  else if (categoria.value != 0 && dificultad.value==0 && tipo.value!=0 )
  {
    randomDificultad = dificultadRandom();
    url = `https://opentdb.com/api.php?amount=${cantPreguntas.value}&category=${categoria.value}&difficulty=${randomDificultad}&type=${tipo.value}`;
    // console.log(url);
  }
  else if (categoria.value != 0 && dificultad.value!=0 && tipo.value==0 )
  {
    randomTipo = tipoRandom();
    url = `https://opentdb.com/api.php?amount=${cantPreguntas.value}&category=${categoria.value}&difficulty=${dificultad.value}&type=${randomTipo}`;
    // console.log(url);
  }
  else if (categoria.value == 0 && dificultad.value==0 && tipo.value!=0 )
  {
    randomCategoria = categoriaRandom();
    randomDificultad = dificultadRandom();
    url = `https://opentdb.com/api.php?amount=${cantPreguntas.value}&category=${randomCategoria}&difficulty=${randomDificultad}&type=${tipo.value}`;
    // console.log(url);
  }
  else if (categoria.value == 0 && dificultad.value!=0 && tipo.value==0 )
  {
    randomCategoria = categoriaRandom();
    randomTipo = tipoRandom();
    url = `https://opentdb.com/api.php?amount=${cantPreguntas.value}&category=${randomCategoria}&difficulty=${dificultad.value}&type=${randomTipo}`;
    // console.log(url);
  }
  else if (categoria.value != 0 && dificultad.value==0 && tipo.value==0 )
  {
    randomDificultad = dificultadRandom();
    randomTipo = tipoRandom();
    url = `https://opentdb.com/api.php?amount=${cantPreguntas.value}&category=${categoria.value}&difficulty=${randomDificultad}&type=${randomTipo}`;
    // console.log(url);
  }
  else if (categoria.value == 0 && dificultad.value==0 && tipo.value==0 )
  {
    randomCategoria = categoriaRandom();
    randomDificultad = dificultadRandom();
    randomTipo = tipoRandom();
    url = `https://opentdb.com/api.php?amount=${cantPreguntas.value}&category=${randomCategoria}&difficulty=${randomDificultad}&type=${randomTipo}`;
    // console.log(url);
  }
  else
  {
    url = `https://opentdb.com/api.php?amount=${cantPreguntas.value}&category=${categoria.value}&difficulty=${dificultad.value}&type=${tipo.value}`;
    // console.log(url);
  }
  fetch(url)
  // .then(response=>{
  //   if ( response.ok == true ) {
  //     console.log(response);
  //     console.log("Sí pasó");
  //         fetch(url).then(response => {
  //           console.log(url);
  //           // // console.log("razones: "+event.reason());
  //           // console.log(response.redirected==false);
  //           // console.log(response);
  //           // console.log(response.json());
  //           return response.json();
  //         })
  //     //     .then(() => {
  //     //     throw new Error('Algo falló');

  //     //     console.log('Haz esto para fallos');
  //     // })
  //     // .catch(() => {
  //     //     console.log('Haz aquello de que paso');
  //     // })
  //         .then(data => {
  //           // console.log("razones: "+event.reason());
  //           questions = data.results;
  //           startGame();
  //         });
  //   } else {
  //     console.log("No pasó");
  //   }
  // })
    .then(response => {
      console.log(url);
      return response.json();
    })
    .then(data => {
      questions = data.results;
      console.log(data.response_code === 0 );
      console.log(data.results);
      if (data.response_code === 0) {
        startGame();
      } else {
        alert("La API no encontró los resultados"
        +"\nPor favor, vuelve a intentarlo");
      }
    });
};

const startGame = () => {
  // abro la vista de las preguntas
  contenedorPregunta.style.display = "flex";
  //Ocultamos el principal
  contenedorFormulario.style.display = "none";

  // Variable para controlar preguntas una por una
  let currentQuestion = questions[qIndex];
  document.getElementById("pregunta-trivia").innerText = currentQuestion.question;
  // console.log(questions);

  if (currentQuestion.incorrect_answers.length == 1) {
    document.getElementById("1").innerText = "True";
    document.getElementById("2").innerText = "False";
    document.getElementById("3").style.display = "none";
    document.getElementById("4").style.display = "none";
    
    //Nos dice si es true o false
    // console.log("currentQuestion.correct_answer "+currentQuestion.correct_answer);
    if (currentQuestion.correct_answer === "True")
    {
      correct_index_answer = 1;
    } 
    else 
    {
      correct_index_answer = 2;
    }
  } 
  else 
  {
    document.getElementById("1").style.display = "Block";
    document.getElementById("2").style.display = "Block";
    document.getElementById("3").style.display = "Block";
    document.getElementById("4").style.display = "Block";

    //Esta linea nos va a dar la respuesta correcta
    correct_index_answer = Math.floor(Math.random() * 4) + 1;
    // console.log("correct_index_answer"+correct_index_answer);
    // document.getElementById(correct_index_answer).innerText =
      currentQuestion.correct_answer;
    //imprimo la respuesta correcta
    // console.log(correct_index_answer);
    let j = 0;
    //Vamos a posicionar cada respuesta con un botón 
    for (let i = 1; i <= 4; i++) {
      if (i === correct_index_answer) continue;
        document.getElementById(i).innerText =
        currentQuestion.incorrect_answers[j];
      j++;
    }
  }
  qIndex++;
};

let correctAnswer = id => {
  // console.log("correct respuesta"+id);
  if (correct_index_answer == id) {
    // console.log("Es correcto");
    score = porcentaje + score;
  }
  else{
    // console.log("No es correcto");
  }
  if (qIndex<cantPreguntas.value) {
    startGame();
  }
  else
  {
    // console.log("Fin del juego");
    // abro la vista de fin del juego
    contenedorFinDelJuego.style.display = "flex";
    //Ocultamos el de la trivia
    contenedorPregunta.style.display = "none";
    let frase = "Su score es del " + String( Math.round(score)) + "%";
    // console.log(score);
    //Para el score
    document.getElementById("score-trivia").innerText = frase;
    //Regreso
    document.getElementById("regresar").innerText = "Volver a jugar";
  }
};

for (let i = 0; i < respuestas.length; i++) {
  const element = respuestas[i];
  element.addEventListener("click", () => correctAnswer(respuestas[i].id));
}

//LISTENERS
formularioTrivia.addEventListener("submit", getAPIData);
