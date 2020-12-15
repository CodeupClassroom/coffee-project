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

    //using metaphone to get phonetics of the word
    var searchTerm = double_metaphone(searchInput.value);
    
    var filteredCoffees = [];
    coffees.forEach( coffee =>{
        //switches the coffee name to lowercase for the compare to be accurate
        var coffeeCase = double_metaphone(coffee.name)
        //filters coffee roast and passes all if "all" is selected
        if(roastSelection.value != coffee.roast && roastSelection.value.toLowerCase() != "all") return false;
        //check if coffee name has any part of the search term in there
        if(coffeeCase.primary.indexOf(searchTerm.primary) == -1){
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


//Assets
var mountainback = new Image();
mountainback.src = "img/mountainback.png"

var mountainfront = new Image();
mountainfront.src = "img/mountainfront.png"

var clouds = [];
for(var i = 0; i < 10 ;i++){
    clouds[i] = new Image();
    let randomCloud = Math.floor(Math.random() * 4)
    clouds[i].src = `img/cloud${randomCloud}.png`;
    clouds[i].posX = 300 * [i];
    clouds[i].randomY = Math.floor(Math.random() * 400) -100
}

var backhill = new Image();
backhill.src = 'img/backhill.png';

var fronthill = new Image();
fronthill.src = 'img/fronthill.png';

var sky = ctx.createLinearGradient(0, 0, 0, 170);
sky.addColorStop(0, "#56afdb");
sky.addColorStop(0.5, "#7bc0e3");
sky.addColorStop(1, "#a7d9f2");

var moon = new Image();
moon.src = 'img/moon.svg'


//Variable Decleration
var mousePos = {
    x: 0,
    y: 0
}
var keyBuffer = [];
var dMode = 0;

function darkMode(){
    sky = ctx.createLinearGradient(0, 0, 0, 170);
    sky.addColorStop(0, "#4d4794");
    sky.addColorStop(0.5, "#2a274f");
    sky.addColorStop(1, "#0b0a17");
}

function animate(){
    //resizes the canvas to the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight + 60;

    
    //Clears canvas
    ctx.clearRect(0, 0 ,canvas.width, canvas.height)

    //Dark Mode Check
    if(dMode){
        ctx.filter = 'brightness(.2)';
    }

    //renders sky
    ctx.fillStyle = sky
    ctx.fillRect(0,0,canvas.width, canvas.height)

    //Draw moon
    if(dMode){
        ctx.filter = 'brightness(1)'; //returns brightness so moon can be fully yellow
        ctx.drawImage(moon, 10,-320)
        ctx.filter = 'brightness(.2)';
    }

    //mountains
    ctx.drawImage(mountainback,
        500 + (mousePos.x /25),
        160 + (mousePos.y /25),
        mountainback.width,
        mountainback.height)

    ctx.drawImage(mountainfront,
        -200 + (mousePos.x /22),
        200 + (mousePos.y /22),
        mountainfront.width,
        mountainfront.height)

    ctx.drawImage(backhill,
        (canvas.width - backhill.width) + (mousePos.x /18),
        (canvas.height - backhill.height) + 200 + (mousePos.y /18), 
        backhill.width,
        backhill.height)

    ctx.drawImage(fronthill,
        (-fronthill.width + canvas.width)  + (mousePos.x /14),
        (canvas.height - fronthill.height) + 150 + (mousePos.y /14), 
        fronthill.width,
        fronthill.height)

    

    

    //clouds

    clouds.forEach( cloud =>{
        ctx.drawImage(cloud,
            cloud.posX + (mousePos.x /22),
            cloud.randomY,
            180,
            110
        )
        cloud.posX--

        if(cloud.posX <= -700){
            cloud.posX += canvas.width + 1000
        }
    })

    //animation

    

    //loop
    requestAnimationFrame(animate);
}

animate()

function updatePos(e){
    mousePos.x = e.clientX;   
    mousePos.y = e.clientY; 
}



function konami(e) {

    //console.log(e);
    //The konami code
    var kode = [38,38,40,40,37,39,37,39,66,65,13];

    //every key pressed will go into the buffer
    keyBuffer.push(e.keyCode);

    //we check the buffer each press to see if it matches 
    //the code so far, if not clear it
    keyBuffer.forEach((key, index) => {
        if (kode[index] !== key) {
            keyBuffer = [];
        }
    })

    //if the keybuffer is the same length, we must have gotten the code right
    if(keyBuffer.length === kode.length) {
        console.log("YEET");
        //fires off dark mode
        submitNewCoffee.style.background = "#7f2996"
        submitNewCoffee.style.borderColor = "#7f2996"

        var style = document.createElement("style");
        style.innerHTML = `
            .vis-font{
                color: #d257f2;
            }
 
        `
        document.body.appendChild(style)
        darkMode()
        dMode = true;
    } else if (keyBuffer.length > kode.length) {
        keyBuffer = [];
    }

}

document.addEventListener("keydown", konami);



document.addEventListener("mousemove",updatePos)