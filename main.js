"use strict"

function renderCoffees(coffee){

    //clears list
    coffeeList.innerHTML = "";

    coffee.forEach( coffee =>{

        var bigName = document.createElement("h3") //Coffee name
        var smallName = document.createElement("h5") //Coffee roast
        var container = document.createElement("div") 
    
        bigName.innerHTML = coffee.name;
        smallName.innerHTML = coffee.roast;

        //sets up classes
        bigName.setAttribute("class","");
        smallName.setAttribute("class","p-2 font-weight-normal vis-font");

        container.setAttribute("class","p-2 col-6 d-flex flex-row");
    
        container.appendChild(bigName);
        container.appendChild(smallName);
    
        coffeeList.appendChild(container);

    })
    
    
}



function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value.toLowerCase();
    var filteredCoffees = [];
    
    //this checks if all coffee's are selected and just returns all coffees 
    if(selectedRoast == "all"){
        coffees.forEach( coffee =>{
            filteredCoffees.push(coffee);
        });
        renderCoffees(filteredCoffees);
        return true;
    }

    //if there is no input and you select a roast that is not "all", gets coffee's with those roasts
    if(searchInput.value == ''){

        coffees.forEach(function(coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
        renderCoffees(filteredCoffees);

    }else{
        //goes to the search function if there is an input
        search(e);
    }

    
    
}

function search(e){
    e.preventDefault();

    var searchTerm = searchInput.value.toLowerCase();
    var filteredCoffees = [];
    coffees.forEach( coffee =>{
        //switches the coffee name to lowercase for the compare to be accurate
        var coffeeCase = coffee.name.toLowerCase()
        //filters coffee roast and passes all if "all" is selected
        if(roastSelection.value != coffee.roast && roastSelection.value.toLowerCase() != "all") return false;
        //check if coffee name has any part of the search term in there
        if(coffeeCase.indexOf(searchTerm) == -1){
            return false; 
        }else{
            filteredCoffees.push(coffee);
        }
    })
    renderCoffees(filteredCoffees);
}

//add coffee function

function addCoffee(e) {
    e.preventDefault();
    var newCoffeeObj = {
        id: coffees.length + 1,
        name: document.querySelector('#add-coffee').value,
        roast: document.querySelector('#add-roast').value.toLowerCase()
    }
    coffees.push(newCoffeeObj);
    renderCoffees(coffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var coffeeList = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var searchInput = document.getElementById("search")
var addRoast = document.getElementById("add-roast");
var submitNewCoffee = document.getElementById("submit-new-coffee");

renderCoffees(coffees);

roastSelection.addEventListener('input', updateCoffees);
searchInput.addEventListener('input',search);
submitNewCoffee.addEventListener('click', addCoffee);


//Animated background 
//Grabbing the canvas element
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var mountain1 = new Image();
mountain1.src = "mountain1.svg"

var mountain2 = new Image();
mountain2.src = "mountain2.svg"

var clouds1 = new Image();
clouds1.src = "cloud1.svg"

var mousePos = {
    x: 0,
    y: 0
}

var sky = ctx.createLinearGradient(0, 0, 0, 170);
sky.addColorStop(0, "#56afdb");
sky.addColorStop(0.5, "#7bc0e3");
sky.addColorStop(1, "#a7d9f2");

var cloud1PosX = 0
var cloud2PosX = -900

function animate(){
    //resizes the canvas to the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight + 60;



    mountain1.width = canvas.width * 2
    mountain1.height = canvas.height 

    mountain2.width = canvas.width * 2 
    mountain2.height = canvas.height 
    
    //Clears canvas
    ctx.clearRect(0, 0 ,canvas.width, canvas.height)

    //renders sky
    ctx.fillStyle = sky
    ctx.fillRect(0,0,canvas.width, canvas.height)

    //mountains
    ctx.drawImage(
        mountain1,  
        -20 + (-canvas.width / 2 ) + (mousePos.x / 26),
        (canvas.height - mountain1.height) + (mousePos.y / 26),
        mountain1.width , 
        mountain1.height  
    )
    ctx.drawImage(
        mountain2, // the image to draw
        -70 + (-canvas.width / 2 ) + (mousePos.x / 16),                                      // X-Cord
        (canvas.height - mountain2.height) + (mousePos.y / 16),  // Y-Cord   
        mountain2.width , //width
        mountain2.height  //height
    )

    //clouds

    if(cloud1PosX >= 1000) cloud1PosX = -700;
    ctx.drawImage(clouds1, cloud1PosX - (mousePos.x / 25), 0 - (mousePos.y / 25))

    if(cloud2PosX >= 1000) cloud2PosX = -700;
    ctx.drawImage(clouds1, cloud2PosX - (mousePos.x / 25), 0 - (mousePos.y / 25))

    //animation
    cloud1PosX++
    cloud2PosX++

    //loop
    requestAnimationFrame(animate);
}

animate()

function updatePos(e){
    mousePos.x = e.clientX;   
    mousePos.y = e.clientY; 
}

var keyBuffer = [];

function konami(e) {

    //console.log(e);
    var kode = [38,38,40,40,37,39,37,39,66,65];

    keyBuffer.forEach((key, index) => {
        if (kode[index] !== key) {
            keyBuffer = [];
        }
    })

    if(keyBuffer.length === kode.length && e.keyCode === 13) {
        console.log("YEET");
    } else if (keyBuffer.length > kode.length) {
        keyBuffer = [];
    }

    keyBuffer.push(e.keyCode);
    //console.log(keyBuffer);
}

document.addEventListener("keydown", konami);



document.addEventListener("mousemove",updatePos)