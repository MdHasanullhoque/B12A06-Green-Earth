const allCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then((json) => displayCategories(json.categories));
};

//bg-[#15803D]

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

        const card = document.createElement("div");
        card.innerHTML = `
                     <div class="bg-white w-auto p-3 rounded-md flex flex-col">
                        <img src="${plant.image}" alt="${plant.name}" class="w-full h-40 object-cover rounded-md">

                        <h2 class="font-semibold py-2 text-lg ">${plant.name}</h2>
                        <p class="text-sm line-clamp-4 ">${plant.description}</p>

                        <div class="flex  items-center justify-between mt-2 ">

                            <button class="btn rounded-2xl h-8 bg-[#DCFCE7] bg-[-#15803D]">${plant.category}</button>
                            <p class=""><span><i class="fa-solid fa-bangladeshi-taka-sign">
                                    </i></span><span class="font-semibold">${plant.price}</span></p>

                        </div>

                        <button class="btn w-full h-10 mt-5 rounded-2xl bg-[#15803D] text-white ">Add to Cart</button>

                    </div>
    
    
    `;
        plantsContainer.append(card);
    })

}

const displayCategories = (categoriList) => {
    // console.log(categoriList)
    const allCategoriList = document.getElementById("all-categori-list")
    allCategoriList.innerHTML = "";

    for (let categori of categoriList) {
        // console.log(categoriList)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
       <button onclick="plantsLoadInDisplay('${categori.id}')" 
       class="btn btn-wide my-2 justify-start ">${categori.category_name}</button>


        `
        allCategoriList.append(btnDiv)
    }

}

allCategories();


