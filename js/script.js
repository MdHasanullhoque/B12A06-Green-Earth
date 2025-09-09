const allCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories") //all categories list adding in left div
        .then(res => res.json())
        .then((json) => displayCategories(json.categories));
};



const plantsLoadInDisplay = (id) => {

    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    // const url=`https://openapi.programming-hero.com/api/category/1`; //
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLoadPlants(data.plants));

}








const displayLoadPlants = (plants) => {
    // console.log(plants)

    const plantsContainer = document.getElementById("all-plants-container")
    plantsContainer.innerHTML = "";

    plants.forEach(plant => {
        // console.log(plant)



        //     "id": 1,
        // "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
        // "name": "Mango Tree",
        // "description": "A fast-growing tropical tree that produces delicious,
        //  juicy mangoes during summer. Its dense green canopy offers shade,
        //  while its sweet fruits are rich in vitamins and minerals.",
        // "category": "Fruit Tree",
        // "price": 500


        //card section with all plants data

        const card = document.createElement("div");
        card.innerHTML = `
                     <div class="bg-white w-auto p-3 rounded-md flex flex-col">
                        <img src="${plant.image}" alt="${plant.name}" class="w-full h-40 object-cover rounded-md">

                        <h2 onclick="loadPlantsDetailsModal(${plant.id})" class="font-semibold py-2 text-lg ">${plant.name}</h2>
                        <p class="text-sm line-clamp-4 ">${plant.description}</p>

                        <div class="flex  items-center justify-between mt-2 ">

                            <button class="btn rounded-2xl h-8 bg-[#DCFCE7] bg-[-#15803D] ">${plant.category}</button>
                            <p class=""><span><i class="fa-solid fa-bangladeshi-taka-sign">
                                    </i></span><span class="font-semibold">${plant.price}</span></p>

                        </div>

                        <button onclick='addToCart(${JSON.stringify(plant)})' class="btn w-full h-10 mt-5 rounded-2xl bg-[#15803D] text-white ">Add to Cart</button>

                    </div>
    
    
    `;
        plantsContainer.append(card);
    })

}






//#demo 1- for practice .........

//const loadPlantsDetailsModal = (id) => { 
//     fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data.plant); // সব detail console এ
//             // এখানে modal fill করে open করবে
//         });
// };



// // // modal attached with async and await, showing on card

const loadPlantsDetailsModal = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    console.log(url)
    const res = await fetch(url)
    const details = await res.json()
    showPlantsModal(details.plants)

};

//need the modal show to display

const showPlantsModal = (plant) => {
    //  console.log(showPlantsModal);
    const modalDisplayBox = document.getElementById("modal-details-container");
    modalDisplayBox.innerHTML = `
                            <div>
                            <h2 class="font-bold ">${plant.name}</h2>
                            <img src="${plant.image}" alt="" class="w-full max-w-xs md:max-w-md h-[280px] mx-auto mt-4 object-cover rounded-lg">
                            <p>
                                <span class="font-semibold">Category : </span>${plant.category}
                            </p>

                            <p>
                                <span class="font-semibold">Price : </span> <i
                                    class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}
                            </p>

                            <p>
                                <span class="font-semibold">Description : </span> ${plant.description}
                            </p>
                        </div>`;
    document.getElementById("plant-modal").showModal();
};


//categori adding and styles aadding

const displayCategories = (categoriList) => {
    // console.log(categoriList)
    const allCategoriList = document.getElementById("all-categori-list")
    allCategoriList.innerHTML = "";

    for (let categori of categoriList) {
        // console.log(categoriList)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
       <button onclick="plantsLoadInDisplay('${categori.id}')" 
       class="btn btn-wide my-2 justify-start hover:bg-green-700 hover:text-white">${categori.category_name}</button>


        `
        allCategoriList.append(btnDiv)



        // active color handeling

        document.querySelectorAll("#all-categori-list button").forEach(btn => {
            btn.addEventListener("click", () => {

                //  color remove from all buttons
                document.querySelectorAll("#all-categori-list button").forEach(b => b.classList.remove("bg-[#15803D]", "text-white"));

                // adding color in clicked buttons
                btn.classList.add("bg-[#15803D]", "text-white");


            });
        });


    }

}

allCategories();





// Deafult card section,, all card showing here

fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(async (data) => {
        const allPlants = []; // all plants adding in the arry

        // category fetch for id and card links
        for (const categori of data.categories) {
            const url = `https://openapi.programming-hero.com/api/category/${categori.id}`;
            const res = await fetch(url);
            const plantsData = await res.json();
            allPlants.push(...plantsData.plants); // all plants push for showing in display
        }

        // 
        displayLoadPlants(allPlants, true);
    });








// cart item total box showing on the display function

let cart = {};
let total = 0;

const addToCart = (plant) => {



    // alert massage for added  to cart for clicked
    alert(`${plant.name.toUpperCase()} : has been added to the cart`);


    //total value and qty added in maths //plants id is card identity for showing each card 

    if (cart[plant.id]) {
        cart[plant.id].quantity += 1;
    } else {
        cart[plant.id] = { ...plant, quantity: 1 };
    }

    total += plant.price;
    updateCartDisplay();
};

const updateCartDisplay = () => {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = ""; //formate inner div cart



    Object.values(cart).forEach(item => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center my-2";

        li.innerHTML = `
            <div class="flex flex-col bg-[#F0FDF4] p-3 gap-1 w-[200px] rounded-md">
            <span>${item.name} (x${item.quantity}) - ${item.price * item.quantity}৳</span></div>
            <button class="text-red-500" onclick="removeFromCart(${item.id})">❌</button>
        `;




        cartList.appendChild(li);
    });

    document.getElementById("cart-total").innerText = total;
};
//remove button creat
const removeFromCart = (id) => {
    if (cart[id]) {
        total -= cart[id].price;
        cart[id].quantity -= 1;

        if (cart[id].quantity === 0) {
            delete cart[id];
        }

        updateCartDisplay();
    }
};
