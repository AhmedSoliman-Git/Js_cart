const aside = document.getElementById('aside');
const closeBtn = document.getElementById('close-btn');
const cartBtn = document.getElementById('cart-btn');
let cartItems = document.getElementById('cartItems')
let checkButton = document.getElementById('check-btn')
let carts = []
let spanIConCount = document.getElementById('counter')
let cartListItems = document.getElementById('cartListItems')
let main = document.querySelector('main')
let ItemsContainer = document.getElementById('ItemsContainer')
let Prices = []
let Price_place = document.getElementById('checkOut')


closeBtn.addEventListener('click',()=>{
    cartListItems.classList.toggle('closed')
    main.classList.toggle('moved')
    main.style.transition = 'all 0.3s ease '


    
})

cartBtn.addEventListener('click',()=>{
    cartListItems.style.cssText='transition : all 0.3s ease'
    cartListItems.classList.toggle('closed')
    main.classList.toggle('moved')
    main.style.transition = 'all 0.3s ease '




})

function addItemsToPage(Itmes){
    Itmes.forEach((item)=>{
        let newProduct = document.createElement('div')
        newProduct.className = 'item'
        newProduct.setAttribute('id', `${item.id}`)
        newProduct.innerHTML=`
        <img src=${item.image} alt="chair-image">
        <h2>${item.name}</h2>
        <p>${item.price}$</p>
        <button class='btnCart'>add to cart</button>`
        cartItems.append(newProduct)
    }
)
let Items = document.querySelectorAll('.item');
getCurrentItem(Items);
}



function fetchItems(){
    const response = fetch('./products.json').then((cur)=>{
        return cur.json();
    }).then((data)=>{
        let listItems = data
        addItemsToPage(listItems);
    })
}

fetchItems()



function getCurrentItem(Items){
    Items.forEach((item)=>{
        item.addEventListener('click', (event)=>{
            if(event.target.className == 'btnCart'){
                let ParentID = event.target.parentElement.id;
                addToCart(ParentID,Items);
            }
        })
    })
}

    cartListItems.addEventListener('click',(event)=>{
        let target = event.target
        if(event.target.className =='fa-solid fa-circle-arrow-right' || event.target.className =='fa-solid fa-circle-arrow-left') {
            let position = event.target.parentElement.parentElement.parentElement.id ;
            chnageQuantity(position,target);
        }
    })

    function chnageQuantity(position,target){
        console.log(carts)
        let findPositionQuantity  = carts.findIndex((item) => item.Project_id === position)
        if(target.className =='fa-solid fa-circle-arrow-right') {
            carts[findPositionQuantity].quantity = carts[findPositionQuantity].quantity+1
            
        } else if(target.className =='fa-solid fa-circle-arrow-left'){
            carts[findPositionQuantity].quantity = carts[findPositionQuantity].quantity-1;
            if(carts[findPositionQuantity].quantity <=0) {
            carts = carts.filter((item) => item.quantity !== 0)
            spanIConCount.innerHTML = carts.length
            }
        }
        addItemsToSide(cartItems);

    }



function addToCart(ParentId,Items) {
    let position = carts.findIndex((cart)=> cart.Project_id == ParentId) ;
    if(carts.length < 0) {
        carts=[
            {
                Project_id : ParentId ,
                quantity : 1
            }
        ]
    } else if(position  < 0) {
        carts.push({
            Project_id : ParentId ,
            quantity : 1
        })
}else {
    carts[position].quantity = carts[position].quantity + 1
}
spanIConCount.innerHTML = carts.length ;
addItemsToSide(cartItems);
}

function addItemsToSide(cartItems){
    ItemsContainer.innerHTML = ''
    if(carts.length  > 0) {
        carts.forEach((cart)=>{
            let newProduct = document.createElement('div');
            newProduct.setAttribute('id',cart.Project_id)
            let positionElement = [...cartItems.children].findIndex((item)=> item.id == cart.Project_id)
            let info = cartItems.children[positionElement].children
            newProduct.classList.add('itemList');
            newProduct.innerHTML=`
            <img src=${info[0].src} alt="chair">
            <span class="name">${info[1].innerHTML}</span>
            <span class="price">${parseInt(info[2].innerHTML) *(parseInt(cart.quantity))} $</span>
            <div class="arrowButtons">
                <span class="leftArrow"><i class="fa-solid fa-circle-arrow-left"></i></span>    
                <span class="quantity">${cart.quantity}</span>
                <span class="rightArrow"><i class="fa-solid fa-circle-arrow-right"></i></span>
            </div>
            `
            ItemsContainer.append(newProduct)

        })
    }

}

checkButton.addEventListener('click',()=>{
    totalPrice(ItemsContainer)
})


function totalPrice(ItemsContainer) {
    let ItemsArray = [...ItemsContainer.children]
    ItemsArray.forEach((item)=>{
        let price = parseInt(item.children[2].innerHTML)
        Prices.push(price)
    })
        let checkOutValue = Prices.reduce((acc,prev)=>{
            return acc + prev ;
        },0)
        Price_place.innerHTML =checkOutValue + "$";
        Prices = [];
}


