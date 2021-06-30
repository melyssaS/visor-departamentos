
// Todos los datos en minuscula y sin acento
var values=[];

//Todos los datos exactos obtenidos del json
var show=[];
  
  //Borramos los departamentos del anterior filtro
function deleteElement(){
  var elem = document.getElementById('centrar');
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
  }
}

//Removemos acentos 
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u0301]/g, "");
} 

//Filtramos los datos de acuerdo al string ingresado
function getFilteredData(searchValue){
    var result=[];
    //buscamos los que cumplan el filtro
    for (var i in values) {
      if (values[i][0].indexOf(searchValue)!=-1){
        result.push(show[i]);
      }else if (values[i][1].some((elem)=> elem.indexOf(searchValue)!=-1 )){
        result.push(show[i]);
      }
    }
    return result;
    
}

//Añadimos los departamentos de acuerdo al filtro
function addElement( departamento, ciudades ){

  var seccion = document.getElementById("centrar");
  seccion.innerHTML=seccion.innerHTML+`<article class="lado">
                                      <h3 class="titulo">${departamento}</h3>
                                      <p class="parrafo">${ciudades}</p>
                                      </article>`
}

function showFilteredData(){

    deleteElement();
    let searchValue = document.getElementById("search-box").value;  
    searchValue = removeAccents(searchValue.toLowerCase());
    var result= getFilteredData(searchValue);
    result.forEach((elem)=> document.body.onload = addElement(elem[0],elem[1].toString().split(",").join(", ")) )

}


// Hacemos el fetch
fetch('https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json')
  .then(response => response.json()
    )
  .then(data =>{
    
    getData(data);

  })

  function getData(data){

       
   for (let i = 0; i < data.length; i++) {

    //Borramos el id de los objetos
    delete data[i].id;
    show.push(Object.values(data[i]));
    
    //quitar acento y pasarlo a minuscula
    data[i].departamento= removeAccents (data[i].departamento.toLowerCase());
    data[i].ciudades=(data[i].ciudades).map(function(ciudad){
      return removeAccents (ciudad.toLowerCase())
    })
    values.push(Object.values(data[i]));
  }

  }



  