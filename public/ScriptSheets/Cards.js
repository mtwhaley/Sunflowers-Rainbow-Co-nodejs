
function createAllProductCards() {
    JSONData.forEach(item => {
        createProductCard(item)
    });
}


function createProductCard(item) {
    const resultDiv=document.getElementById("productSpace")

    const card=document.createElement("div")
    card.setAttribute("class", "cardstock")


    const image=document.createElement("img")
    const source="../Images/Product Images/"+item.Photo_File_Name+".jpg"
    image.src=source
    let id="img"+item.Item_Number
    image.setAttribute("id", id)
    image.setAttribute("class","productimage")
    image.onclick=function() {
        viewImage(source)
    }

    const text=document.createElement("p")
    if (item.Price==null) {
        item.Price=0
    }
    text.innerHTML="<span class='productname'>"+item.Item_Name+
        "</span><br><br>$"+
        item.Price


    
    const addButton=document.createElement("button")
    if (isInCart(item)) {
        addButton.setAttribute("class", "checkButton")
        addButton.innerHTML="&#10003;"
        addButton.onclick=function() {
            toggleFunction(item, addButton)
        }
    }
    else {
        addButton.setAttribute("class", "addButton")
        addButton.innerText="+"
        addButton.onclick=function() {
            toggleFunction(item, addButton)


        }
    }
    


    card.appendChild(image)
    card.appendChild(text)
    card.appendChild(addButton)


    resultDiv.appendChild(card)
    resultDiv.style.width="calc(100vw - (100vw - 100%))"

}

function removeImageView() {
    const html=document.getElementsByTagName("html")[0]
    const backdrop=document.getElementsByClassName("shade")[0]
    html.removeChild(backdrop)
}

function viewImage(source) {
    const backdrop=document.createElement("div")
    backdrop.setAttribute("class","shade")
    document.getElementsByTagName("html")[0].appendChild(backdrop)

    const img=document.createElement("img")
    img.src=source
    img.setAttribute("class","largeIMG")

    const button=document.createElement("button")
    button.setAttribute("class","selfDestruct")
    button.innerText="X"
    button.onclick=function() {
        removeImageView()
    }
    
    backdrop.appendChild(img)
    backdrop.appendChild(button)



}

function getCardNumber(card) {
    return new Promise((resolve, reject)=> {
        const elements=card.childNodes
    elements.forEach(element => {
        if (element.nodeName=="IMG") {
            let id=element.id
            number=id.substring(3)
            resolve(number)
        }
    });
    })
    
}

function toggleFunction(item, button) {
    
    if (button.innerHTML=="+") {
        button.innerHTML="&#10003;"
        button.setAttribute("class","checkButton")
        addToCart(item)

    }
    else {
        button.innerHTML="+"
        button.setAttribute("class", "addButton")
        removeItemFromStorage(item)
    }
    updateCartNumber()
}


createAllProductCards()