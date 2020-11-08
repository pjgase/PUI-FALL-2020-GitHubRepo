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
var cart_list = retrieve_cart() || [];

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
        alert('Please select what type of pet you would like this for :) --- NOTE: This alert will eventually be replaced by feedforward info onscreen')
        return;
    }

    let size_list = document.getElementsByClassName('size_option');
    for (let i=0; i<size_list.length; i++){
        if (size_list[i].classList.contains('selected')){
            item.size = size_list[i].getAttribute('data-size-type')
        }
    }
    if (item.size === ''){
        alert('Please select what size you would like :) --- NOTE: This alert will eventually be replaced by feedforward info onscreen')
        return;
    }

    let color_list = document.getElementsByClassName('color_option');
    for (let i=0; i<color_list.length; i++){
        if (color_list[i].classList.contains('selected')){
            item.color = color_list[i].getAttribute('data-color-type')
        }
    }
    if (item.color === ''){
        alert('Please select what color you would like :) --- NOTE: This alert will eventually be replaced by feedforward info onscreen')
        return;
    }
    
    if (document.getElementById('quantity').value > 0){
        item.quantity = parseInt(document.getElementById('quantity').value);
    }
    else{
        alert('Please select how many you would like :) --- NOTE: This alert will eventually be replaced by feedforward info onscreen')
        return;
    }
    
    alert('You successfully added this item to your shopping cart! --- NOTE: This alert will eventually be replaced by an onscreen message indicating how many items were just added to the cart');

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

// Delete Item from Cart
function delete_item(delete_elem){
    let item_elem = delete_elem.parentElement;
    let item_elem_name = item_elem.getAttribute('data-name-type');
    let item_elem_animal = item_elem.getAttribute('data-animal-type');
    let item_elem_size = item_elem.getAttribute('data-size-type');
    let item_elem_color = item_elem.getAttribute('data-color-type');
    let item_elem_quantity = parseInt(item_elem.getAttribute('data-quantity-type'));
    let delete_item = new Product(item_elem_name, item_elem_animal, item_elem_size, item_elem_color, item_elem_quantity);
    // For Loop to Remove Cart List Items That Match the Item Deleted By User On Cart Page
    for (let i=0; i<cart_list.length; i++){
        if (delete_item.name === cart_list[i].name && delete_item.animal === cart_list[i].animal && delete_item.size === cart_list[i].size && delete_item.color === cart_list[i].color && delete_item.quantity === cart_list[i].quantity){
            cart_list.splice(i,1);
        }
    }
    // Reset Cart Display on Shopping Cart Page
    let cart_elem = item_elem.parentElement;
    while (cart_elem.firstChild){
        cart_elem.removeChild(cart_elem.firstChild);
    }
    display_cart();
    count_cart();
}

// Update Cart Total Quantity (used in various places)
function count_cart(){
    let total_qty = 0;
    for (let i=0; i<cart_list.length; i++){
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
    // Get Parent List Element for Cart
    let list_parent = document.getElementById('user-cart');
    for (let i=0; i<cart_list.length; i++){
        // Create New List Item        
        let list_child = document.createElement('li');
        // Set Attributes for List Item (use if cart is edited)
        list_child.setAttribute('data-name-type', cart_list[i].name);
        list_child.setAttribute('data-animal-type', cart_list[i].animal);
        list_child.setAttribute('data-size-type', cart_list[i].size);
        list_child.setAttribute('data-color-type', cart_list[i].color);
        list_child.setAttribute('data-quantity-type', cart_list[i].quantity);

        // ANCHOR BOX
        // Create Item Anchor (Image + Name) Element
        let item_anchor = document.createElement('a');
        let item_img = document.createElement('img');
        if (cart_list[i].name === 'gps-collar'){
            item_anchor.href = './gps_collar.html';
            item_img.src = './images/gps-collar.png';
        }
        if (cart_list[i].name === 'cat-backpack'){
            item_anchor.href = './cat_backpack.html';
            item_img.src = './images/cat-backpack.png';
        }
        // HERE: add additional if statements for using the images of the other products
        item_anchor.appendChild(item_img);

        // ITEM BOX
        // Create Containers for ITEM BOX
        let item_container = document.createElement('div');
        item_container.classList.add('item-container');
        
            // ITEM BOX - Title Container
            let item_title_container = document.createElement('div');
            // Create Item Name Element
            let item_name = document.createElement('h3');
            let item_price = document.createElement('h4');
            if (cart_list[i].name === 'gps-collar'){
                item_name.innerHTML = 'Collar with GPS Tracker';
                item_price.innerHTML = 'Price: $39.99';
            } 
            // HERE: add additional if statements for using the images of the other products
            if (cart_list[i].name === 'cat-backpack'){
                item_name.innerHTML = 'Cat Backpack';
                item_price.innerHTML = 'Price: $85.59'; 
            } 
            // HERE: add additional if statements for using the images of the other products
            // Append to Item Title Container
            item_title_container.appendChild(item_name);
            item_title_container.appendChild(item_price);
            item_title_container.classList.add('item-title-container');     

            // ITEM BOX - Details Container
            let item_details_container = document.createElement('div');
            item_details_container.classList.add('item-details-container');
            
                // ITEM BOX - Details Container - Options Container
                let item_options_container = document.createElement('div');
                item_options_container.classList.add('item-options-container');
                
                // Create Options Title Element
                let item_options_title = document.createElement('p');
                item_options_title.innerHTML = 'Selected Options:';
                item_options_container.appendChild(item_options_title);
                
                // Create Item Options Element (Parent to animal, size, color options)
                let item_options_selected = document.createElement('div');
                item_options_selected.classList.add('item-options-selected');
                // Create Item Animal Element
                let item_animal = document.createElement('figure');
                let item_animal_icon = document.createElement('img');
                let item_animal_name = document.createElement('figcaption');
                if (cart_list[i].animal === 'dog'){
                    item_animal_icon.src = './images/dog-icon.svg';
                    item_animal_name.innerHTML = 'Dog';
                }
                else if (cart_list[i].animal === 'cat'){
                    item_animal_icon.src = './images/cat-icon.svg';
                    item_animal_name.innerHTML = 'Cat';
                }
                item_animal.appendChild(item_animal_icon);
                item_animal.appendChild(item_animal_name);
                // Create Item Size Element
                let item_size = document.createElement('p');
                if (cart_list[i].size === 'tiny'){
                    item_size.innerHTML = 'Tiny';
                }
                else if (cart_list[i].size === 'small'){
                    item_size.innerHTML = 'Small';
                }
                else if (cart_list[i].size === 'medium'){
                    item_size.innerHTML = 'Medium';
                }
                else if (cart_list[i].size === 'large'){
                    item_size.innerHTML = 'Large';
                }
                // Create Item Color Element
                let item_color = document.createElement('p');
                if (cart_list[i].color === 'strawberry'){
                    item_color.innerHTML = 'Strawberry';
                    item_color.classList.add('strawberry');
                }
                else if (cart_list[i].color === 'crazyberry'){
                    item_color.innerHTML = 'Crazyberry';
                    item_color.classList.add('crazyberry');
                }
                else if (cart_list[i].color === 'blackberry'){
                    item_color.innerHTML = 'Blackberry';
                    item_color.classList.add('blackberry');
                }
                else if (cart_list[i].color === 'fire-orange'){
                    item_color.innerHTML = 'Fire Orange';
                    item_color.classList.add('fire-orange');
                }
                // Append Options
                item_options_selected.appendChild(item_animal);
                item_options_selected.appendChild(item_size);
                item_options_selected.appendChild(item_color);
                item_options_container.appendChild(item_options_selected);

                // ITEM BOX - Details Container - Quantity Container
                let item_quantity_container = document.createElement('div');
                let item_quantity_title = document.createElement('p');
                item_quantity_title.innerHTML = 'Quantity: ' + cart_list[i].quantity;
                item_quantity_container.appendChild(item_quantity_title);
                item_quantity_container.classList.add('item-quantity-container');

            item_details_container.appendChild(item_options_container);
            item_details_container.appendChild(item_quantity_container);

        item_container.appendChild(item_title_container);
        item_container.appendChild(item_details_container);
        
        // DELETE BOX
        let item_delete = document.createElement('figure');
        let item_delete_icon = document.createElement('img');
        let item_delete_name = document.createElement('figcaption');
        item_delete_icon.src = './images/trash-icon.svg';
        item_delete_name.innerHTML = 'Remove';
        item_delete.appendChild(item_delete_icon);
        item_delete.appendChild(item_delete_name);
        item_delete.setAttribute('onclick','delete_item(this)');
        item_delete.classList.add('item-delete');

        // Append Children Elements to List Item
        list_child.appendChild(item_anchor);
        list_child.appendChild(item_container);
        list_child.appendChild(item_delete);

        // Append List Item to Parent List
        list_parent.appendChild(list_child);
    }
}

// Edit Cart

