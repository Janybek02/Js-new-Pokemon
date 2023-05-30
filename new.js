



const page = document.querySelector(".main__div");
const mainBtn = document.querySelector(".main__btn");
const mainTypes = document.querySelector(".main__types");
const modalBtn = document.querySelector(".modal_btn")
const closeModal = document.querySelector(".slose_modal")
const modal = document.querySelector(".modal")
const modalPage = document.querySelector(".modal_page")
// pokemons
let array = []


async function allPokemons(array) {
 
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/`;
    const response = await fetch(url);
    const result = await response.json();
    allCard(result, array);
  } catch (e) {
    console.log(e.error);
  }
}
allPokemons(array);



function allCard ( result, array) {
  btnsResult(result)
  const main = document.createElement("div");
  main.className = "main__item";
  page.append(main);
  console.log(result);
  result.results.map((item) => {
  fetch(item.url)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      const mainBody = document.createElement("div");
      mainBody.className = "main__body";
      main.appendChild(mainBody);
      const btn = document.createElement("button");
      const img = document.createElement("img");
      const text = document.createElement("p");
      // p.className = "";
      text.className = "main__text";
      btn.className = "main__id";
      img.className = "main__img"  
      mainBody.appendChild(text);
      mainBody.appendChild(img);
      mainBody.appendChild(btn);
      text.innerText = `${data.name}`
      img.src = `${data.sprites.front_default || data.sprites.other.front_default }`
      btn.innerText = `${data.id}`;
      btn.addEventListener("click", () => {
        modalPage.innerHTML = ""
        modalFunc(data, array)
      })
      
    });
  });
  
  }

const btnsResult = (result) => {
  const btnPrev = document.createElement("button");
  btnPrev.className = "prev";
  btnPrev.innerText = "Prev";
  mainBtn.appendChild(btnPrev);
  const btnNext = document.createElement("button");
  btnNext.className = "next";
  btnNext.innerText = "Next";
  mainBtn.appendChild(btnNext);
  let next = result.next;
  let nextUrl = [];
  let prevUrl = [result.previous];
  btnNext.addEventListener("click", () => {
    // console.log(array);
    page.innerHTML = "";
    mainBtn.innerHTML =""
    const url = nextUrl.length ? nextUrl : next;
    nextUrl = [];
    prevUrl = [];
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        nextUrl += [data.next];
        prevUrl += [data.previous];
        allCard(data)
      });
  });

  btnPrev.addEventListener("click", () => {
    page.innerHTML = "";
    mainBtn.innerHTML =""
    fetch(prevUrl)
      .then((data) => data.json())
      .then((data) => {
        prevUrl = [];
        nextUrl = [];
        nextUrl += [data.next];
        prevUrl += [data.previous];
        allCard(data)
      });
  });
 
};







// pokemons

// basket



// basket

// types
async function allTypes(array) {
  try {
    const url = `https://pokeapi.co/api/v2/type/`;
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result);
    allTypesResult(result.results, array);
  } catch (e) {
    console.log(e.error);
  }
}
allTypes(array);

const allTypesResult = (result, array) => {
  
  result.map((item) => {
    btnTypes = document.createElement("button");
    btnTypes.classList = "button__types";
    mainTypes.appendChild(btnTypes);
    btnTypes.textContent = `${item.name}`;
    btnItem(btnTypes, array);
  });
};

const btnItem = (type, array) => {
 
  type.addEventListener("click", (e) => {
    page.innerHTML = ""
    mainBtn.innerHTML = ""
    const str = e.target.innerText;
    const url = `https://pokeapi.co/api/v2/type/`;
    fetch(url + str)
      .then((data) => data.json())
      .then((data) => {
        func(data.pokemon, array);
      });
  });
};

// types


function func ( result, array) {
  // console.log(result);
const main = document.createElement("div");
main.className = "main__item";
page.append(main);
// console.log(result);
result.map((item) => {
console.log(item);
fetch(item.pokemon.url)
  .then((data) => data.json())
  .then((data) => {
    console.log(data);
    const mainBody = document.createElement("div");
    mainBody.className = "main__body";
    main.appendChild(mainBody);
    const btn = document.createElement("button");
    const img = document.createElement("img");
    const text = document.createElement("p");
    // p.className = "";
    text.className = "main__text";
    btn.className = "main__id";
    img.className = "main__img"  
    mainBody.appendChild(text);
    mainBody.appendChild(img);
    mainBody.appendChild(btn);
    text.innerText = `${data.name}`
    img.src = `${data.sprites.front_default || data.sprites.other.front_default }`
    btn.innerText = `${data.id}`;
    btn.addEventListener("click", () => {
      modalPage.innerHTML = ""
      modalFunc(data, array)

    })
    
  });
});

}


const modalFunc = (result,array ) => {
  const modalDiv = document.createElement("div")
  modalPage.append(modalDiv)
  const find = array.some(el => el.id === result.id)
  const modalLengtch = document.querySelector(".modal_btn")
  if (find) {
    array
  } else array.push(result) 
  localStorage.setItem("card", JSON.stringify(array))
  modalLengtch.innerText = array.length
  console.log(array);
    array.map((data) => {
      const btn = document.createElement("button");
      const img = document.createElement("img");
      const text = document.createElement("p");
      text.className = "modal__text";
      btn.className = "modal__id";
      img.className = "modal__img" 
      modalDiv.appendChild(text);
      modalDiv.appendChild(img);
      modalDiv.appendChild(btn);
      text.innerText = `${data.name}`
      img.src = `${data.sprites.front_default || data.sprites.other.front_default | data.sprites.home.front_default}`
      btn.innerText = `${data.id}`;

    })
    
}
  
  
  
    


modalBtn.addEventListener("click" , () => {
    
    modal.style.display = "block"
    window.style.background = "white"
})

closeModal.addEventListener("click" , () =>{

    modal.style.display = "none"
})
