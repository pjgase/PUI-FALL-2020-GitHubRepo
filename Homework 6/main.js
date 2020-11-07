
// Create Product Class 
class Product {

    constructor(name, animal, size, color, quantity){
        this.name = name;
        this.animal = animal;
        this.size = size;
        this.color = color;
        this.quantity = quantity;
    }
    
    load_name(item_name){
        this.name = item_name;
    }

    choose_animal(animal_element){
        this.animal = animal_element.getAttribute('data-animal-type');
        //change element styling when selected
        let animal_list = document.getElementsByClassName('animal_option');
        for (let i=0; i<animal_list.length; i++){

             // Reset Animal Options if Selected Option is Clicked Again
             if (this.animal === animal_list[i].getAttribute('data-animal-type') && (animal_list[i].classList.contains('selected'))){
                this.animal = '';
                for (let j=0; j<animal_list.length; j++){
                    animal_list[j].classList.remove('selected');
                    animal_list[j].classList.remove('unselected');
                    animal_list[j].classList.add('start');
                }
                break;
            }
            
            // A New Selection Has Been Made
            else if (this.animal === animal_list[i].getAttribute('data-animal-type') && !(animal_list[i].classList.contains('selected'))){
                animal_list[i].classList.add('selected');
                animal_list[i].classList.remove('unselected')
                animal_list[i].classList.remove('start');
            }
            
            // Options Not Selected When a New Selection is Made
            else{
                animal_list[i].classList.remove('selected');
                animal_list[i].classList.add('unselected');
                animal_list[i].classList.remove('start');
            }
        }
    }

    choose_size(size_element){
        this.size = size_element.getAttribute('data-size-type');
        //change element styling when selected
        let size_list = document.getElementsByClassName('size_option');
        for (let i=0; i<size_list.length; i++){
            
            // Reset Size Options if Selected Option is Clicked Again
            if (this.size === size_list[i].getAttribute('data-size-type') && (size_list[i].classList.contains('selected'))){
                this.size = '';
                for (let j=0; j<size_list.length; j++){
                    size_list[j].classList.remove('selected');
                    size_list[j].classList.remove('unselected');
                    size_list[j].classList.add('start');
                    console.log('hi');
                }
                break;
            }
            
            // A New Selection Has Been Made
            else if (this.size === size_list[i].getAttribute('data-size-type') && !(size_list[i].classList.contains('selected'))){
                size_list[i].classList.add('selected');
                size_list[i].classList.remove('unselected')
                size_list[i].classList.remove('start');
            }
            
            // Options Not Selected When a New Selection is Made
            else{
                size_list[i].classList.remove('selected');
                size_list[i].classList.add('unselected');
                size_list[i].classList.remove('start');
            }
        }
    }

    choose_color(color_element){
        this.color = color_element.getAttribute('data-color-type');
        //change element styling when selected
        let color_list = document.getElementsByClassName('color_option');
        for (let i=0; i<color_list.length; i++){

             // Reset Color Options if Selected Option is Clicked Again
             if (this.color === color_list[i].getAttribute('data-color-type') && (color_list[i].classList.contains('selected'))){
                this.color = '';
                for (let j=0; j<color_list.length; j++){
                    color_list[j].classList.remove('selected');
                    color_list[j].classList.remove('unselected');
                    color_list[j].classList.add('start');
                    console.log('hi');
                }
                break;
            }
            
            // A New Selection Has Been Made
            else if (this.color === color_list[i].getAttribute('data-color-type') && !(color_list[i].classList.contains('selected'))){
                color_list[i].classList.add('selected');
                color_list[i].classList.remove('unselected')
                color_list[i].classList.remove('start');
            }
            
            // Options Not Selected When a New Selection is Made
            else{
                color_list[i].classList.remove('selected');
                color_list[i].classList.add('unselected');
                color_list[i].classList.remove('start');
            }
        }
    }

    choose_quantity(){
        this.quantity = parseInt(document.getElementById('quantity').value);
    }

}

// Initialize Item
var item = new Product('','','','','');

// Function to Retrieve Product Name When Page Loads
function get_name(){
    window.product_element = document.querySelector('#item');
    if (window.product_element !== null){
        window.product_name = window.product_element.getAttribute('data-name-type');
        item.load_name(window.product_name);
    }
}

// Create Array for Storing Cart Items as They're Added (Use retrieve_cart() function to pull items previously added)
var cart_list = retrieve_cart();

// Add to Cart Function
function add_item() {
    let item = new Product('','','','','');
    
    item.load_name(window.product_name);

    let animal_list = document.getElementsByClassName('animal_option');
    for (let i=0; i<animal_list.length; i++){
        if (animal_list[i].classList.contains('selected')){
            item.animal = animal_list[i].getAttribute('data-animal-type')
        }
    }
    if (item.animal ===''){
        alert('Please select what type of pet you would like this for :)')
        return;
    }

    let size_list = document.getElementsByClassName('size_option');
    for (let i=0; i<size_list.length; i++){
        if (size_list[i].classList.contains('selected')){
            item.size = size_list[i].getAttribute('data-size-type')
        }
    }
    if (item.size === ''){
        alert('Please select what size you would like :)')
        return;
    }

    let color_list = document.getElementsByClassName('color_option');
    for (let i=0; i<color_list.length; i++){
        if (color_list[i].classList.contains('selected')){
            item.color = color_list[i].getAttribute('data-color-type')
        }
    }
    if (item.color === ''){
        alert('Please select what color you would like :)')
        return;
    }
    
    if (document.getElementById('quantity').value > 0){
        item.quantity = parseInt(document.getElementById('quantity').value);
    }
    else{
        alert('Please select how many you would like :)')
        return;
    }
    
    alert('You successfully added this item to your shopping cart! This alert will be replaced by a styled overlay for Homework 6B - let the user know how many of this item are in their cart in total and how many they just added');

    // Check for Previous Items with the Same Options Already in Cart
    let added_prev = false; 
    if (cart_list.length > 0){
        for (let i=0; i<cart_list.length; i++){
            if (item.name===cart_list[i].name && item.animal===cart_list[i].animal && item.size===cart_list[i].size && item.color===cart_list[i].color){
                cart_list[i].quantity += item.quantity;
                added_prev = true;
            }
        }
        if (!added_prev){
            cart_list.push(item);
        }
    }
    else{
        cart_list.push(item);
    }
    count_cart();
}

// Update Cart Total Quantity (used in various places)
function count_cart(){
    let total_qty = 0;
    for (i=0; i<cart_list.length; i++){
        total_qty += cart_list[i].quantity;
    }
    // Update Cart Icon in NavBar w/ Styling
    let cart_qty_elem = document.getElementById('cart-qty');
    if (total_qty > 0){
        cart_qty_elem.innerHTML = total_qty;
        cart_qty_elem.classList.add('cart-qty-visible');
    }
    else{
        cart_qty_elem.innerHTML = '';
        cart_qty_elem.classList.remove('cart-qty-visible');
    }
    return total_qty;
}

// Store Cart Items (onunload for all HTML pages)
function store_cart(){
    localStorage.setItem('cart_list', JSON.stringify(cart_list));
}

// Retrieve Cart Items (when main.js file runs, cart_list stored in global variable)
function retrieve_cart(){
    cart_list = JSON.parse(localStorage.getItem('cart_list'));
    return cart_list;
}

// Display Cart Function (Shopping Cart HTML Page)
function display_cart(){

}

// Delete Item from Cart
function delete_item(){


    count_cart();
}

//LEGACY CODE FOR REFERENCE

//let cart_element = document.createElement('div');
    //let cart_item = document.createTextNode('You have added to your cart ' + stored_items.length + ' time(s).');
    //cart_element.appendChild(cart_item);
    //document.getElementById('user-cart').appendChild(cart_element);
    //let cart_icon_qty = document.createTextNode(stored_items.length);
    //let cart_icon = document.createElement('span');
    //cart_icon.appendChild(cart_icon_qty);

    /*console.log(stored_items)
    console.log('yay')
    for (let i=0; i<stored_items.length; i++){
        let cart_element = document.createElement('div');
        let cart_item = document.createTextNode(stored_items[i]); // this will need to be changed to format the data in the cart better
        cart_element.appendChild(cart_item);
        document.getElementById('user-cart').appendChild(cart_element);
    }*/