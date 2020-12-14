"use strict"

function renderCoffee(coffee) {
    var html = '<tr class="coffee">';
    html += '<td>' + coffee.id + '</td>';
    html += '<td>' + coffee.name + '</td>';
    html += '<td>' + coffee.roast + '</td>';
    html += '</tr>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    
    //this checks if all coffee's are selected and just returns all coffees 
    if(selectedRoast == "all"){
        coffees.forEach( coffee =>{
            filteredCoffees.push(coffee);
        });
        tbody.innerHTML = renderCoffees(filteredCoffees);
        return true;
    }

    //if there is no input and you select a roast that is not "all", gets coffee's with those roasts
    if(searchInput.value == ''){

        coffees.forEach(function(coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
        tbody.innerHTML = renderCoffees(filteredCoffees);

    }else{
        //goes to the search function if there is an input
        search(e)
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
        if(roastSelection.value != coffee.roast && roastSelection.value != "all") return false;
        //check if coffee name has any part of the search term in there
        if(coffeeCase.indexOf(searchTerm) == -1){
            return false; 
        }else{
            filteredCoffees.push(coffee);
        }
    })
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

//add coffee function

function addCoffee(e) {
    e.preventDefault();
    var newCoffeeObj = {
        id: coffees.length + 1,
        name: document.querySelector('#add-coffee').value,
        roast: document.querySelector('#add-roast').value
    }
    coffees.push(newCoffeeObj);
    tbody.innerHTML = renderCoffees(coffees);
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

var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var searchInput = document.getElementById("search")
var addRoast = document.getElementById("add-roast");
var submitNewCoffee = document.getElementById("submit-new-coffee");

tbody.innerHTML = renderCoffees(coffees);

roastSelection.addEventListener('input', updateCoffees);
searchInput.addEventListener('input',search);
submitNewCoffee.addEventListener('click', addCoffee);
