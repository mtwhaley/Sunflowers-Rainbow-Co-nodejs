const cartKey="itemsInCart"
const subtotalID="sub"

function emptyCart() {
    localStorage.clear()

}

function loadCartDisplay() {
    const cart= getCart()
    const cartDisplay=document.getElementById("cartItems")
    const cartTitle=document.getElementById("cartTitle")
    var idArray=[]
    if (cart.length==0) {
        const div=document.createElement("div")
        div.setAttribute("class","emptyCartSign")
        const p=document.createElement("p")
        p.innerText="Your cart is empty"

        div.appendChild(p)
        cartDisplay.appendChild(div)
    }
    else {
        for (var index=0;index<cart.length;index++) {
            const item=cart[index]


            const div=document.createElement("div")
            div.setAttribute("class","cartProduct")


            const image=document.createElement("img")
            let source="../Images/Product Images/"+item.Photo_File_Name+".jpg"
            image.src=source
            image.setAttribute("class","cartimage")
            const imgID=item.Item_Number
            image.setAttribute("id",imgID)
            div.appendChild(image)
            div.appendChild(getItemInfoHTML(item))
            div.appendChild(getQtyPriceHTML(item))

            cartDisplay.appendChild(div)
            idArray.push(item.Item_Number+"price")
            
            


        }
        

        const subtotalSpacer=document.createElement("p")
        subtotalSpacer.innerHTML="<span id='togglingSpacer'><br><br></span><hr><br>"

        cartDisplay.appendChild(subtotalSpacer)

        
        const totals=document.createElement("div")
        const totalsText=document.createElement("p")
        totals.setAttribute("class", "total")

        var subtotal=0
        for (var i=0;i<idArray.length;i++) {
            subtotal+=Number((document.getElementById(idArray[i]).innerText).substring(1))
        }
        totalsText.style.fontSize="calc(3px + 2vh)"
        totalsText.innerHTML="subtotal: $<span id='"+subtotalID+"'>"+(subtotal.toFixed(2))+"</span>"
        totalsText.innerHTML+="<br><br><span style='font-weight: normal; font-size: calc(3px + 1.8vh);'>shipping: $"+shippingCost.toFixed(2)+"</span>"
        totalsText.innerHTML+="<br><br><span style='font-weight: normal; font-size: calc(3px + 1.8vh)'>taxes: $<span id='taxAmount'>"+getTaxes(subtotal)+"</span></span>"
        totalsText.innerHTML+="<br><br><br>total: $<span id='totalAmount'>"+getTotal(subtotal)+"</span>"


        totals.appendChild(totalsText)
        cartDisplay.appendChild(totals)
        
        
    }
}

function updateTotals(subtotal) {
    const taxes=document.getElementById("taxAmount")
    const taxTotal=subtotal*taxRate
    taxes.innerText=taxTotal.toFixed(2)

    const total=document.getElementById("totalAmount")
    const grandTotal=subtotal+shippingCost+taxTotal
    total.innerText=grandTotal.toFixed(2)
}

function getTotal(subtotal) {
    const total=subtotal+shippingCost+Number(getTaxes(subtotal))
    return total.toFixed(2)
}

function getTaxes(subtotal) {
    const taxes=((subtotal)*taxRate).toFixed(2)
    return taxes
}

function getQtyPriceHTML(item) {
    const outerDiv=document.createElement("div")
    const div=document.createElement("div")
    outerDiv.setAttribute("class","priceDiv")
    const div2=document.createElement("div")
    div2.setAttribute("class", "secondaryDiv")
    const qty=document.createElement("input")
    const qtyid=item.Item_Number+"qty"
    const priceid=item.Item_Number+"price"
    qty.setAttribute("class", "qty")
    qty.setAttribute("id", qtyid)

    qty.setAttribute("type","number")
    qty.setAttribute("min","1")
    qty.setAttribute("max","99")
    qty.setAttribute("value", "1")
    qty.style.marginRight="5px"
    qty.onchange=function() {
        const thisQTY=document.getElementById(qtyid).value
        const itemPrice=document.getElementById(priceid)
        const previousPrice=Number((itemPrice.innerText).substring(1))
        const newPrice=item.Price*thisQTY
        itemPrice.innerText="$"+(newPrice.toFixed(2))

        const difference=newPrice-previousPrice
        const previousSubtotal=Number(document.getElementById(subtotalID).innerText)
        const newSubtotal=previousSubtotal+difference
        document.getElementById(subtotalID).innerText=newSubtotal.toFixed(2)
        updateTotals(newSubtotal)

    }
    

    const remove=document.createElement("button")
    remove.setAttribute("class", "remove")
    remove.innerHTML="&#128465;"
    remove.onclick=function() {
        removeItemFromStorage(item)
        location.reload()
    }


    const p=document.createElement("p")
    p.setAttribute("id",priceid)
    p.setAttribute("class", "productTotal")
    p.innerText="$"+(item.Price).toFixed(2)
    

    div.appendChild(qty)
    div.appendChild(remove)
    div2.appendChild(p)
    outerDiv.appendChild(div)
    outerDiv.appendChild(div2)
    return outerDiv
}

function removeItemFromStorage(item) {
    stringItem=JSON.stringify(item)
    const qty=Number(localStorage.getItem(cartKey))
    removed=false
    for (var i=0;i<qty;i++) {
        const loadKey="item"+i
        if (!removed) {
            
            const storageItem=localStorage.getItem(loadKey)
            if (storageItem==stringItem){
                
                removed=true
            } 
        }
        if (removed&&i<qty-1) {
            const nextIndex=i+1
            const nextKey="item"+nextIndex
            localStorage.setItem(loadKey, localStorage.getItem(nextKey))
        }
        else if (removed&&i==qty-1) {
            localStorage.removeItem(loadKey)
        }
        
    }
    incrementCart(-1)
}


function getItemInfoHTML(item) {
    const div=document.createElement("div")
    const p=document.createElement("p")
    div.setAttribute("class","nameDiv")
    p.innerHTML="<span style='font-size: calc(5px + 2vh);'>"+item.Item_Name+"</span><br>"
    p.innerHTML+="&nbsp&nbsp"+item.Item_Description+"<br>"
    p.setAttribute("class","info")

    div.appendChild(p)

    return div
}

function checkForCart() {
    console.log(localStorage.getItem(cartKey))
    if (localStorage.getItem(cartKey)!=null) {return true}
    else {return false}

}


function createEmptyCart() {
    localStorage.setItem(cartKey,0)
}


function addToCart(item) {
    console.log(checkForCart())
    if (!checkForCart()) {
        createEmptyCart()
    }
    const saveIndex=(localStorage.getItem(cartKey)).toString()
    const saveKey="item"+saveIndex
    const JSONitem=JSON.stringify(item)
    localStorage.setItem(saveKey, JSONitem)
    incrementCart()

}

function incrementCart(increment=1) {
    newQty=Number(localStorage.getItem(cartKey))+increment
    localStorage.setItem(cartKey,newQty)
}


function getCart() {
    if (!checkForCart) {return undefined}
    var itemArray=[]
    const qty=Number(localStorage.getItem(cartKey))
    for (var i=0;i<qty;i++) {
        const loadKey="item"+i
        const item=JSON.parse(localStorage.getItem(loadKey))

        itemArray.push(item)
        
    }
    return itemArray
}

function isInCart(item) {
    const qty=localStorage.getItem(cartKey)
    if (qty==undefined) {return false}
    const JSONitem=JSON.stringify(item)
    for (var i=0;i<qty;i++) {
        const loadKey="item"+i
        const cartItem=localStorage.getItem(loadKey)
        if (cartItem==JSONitem) {return true}
    }
    return false
}

function setFormData() {
    document.getElementById("cost").value=document.getElementById("totalAmount").innerText
    const numItems=localStorage.getItem(cartKey)
    var arr=[]

    const products=document.querySelectorAll(".cartProduct")
    for (var i=0;i<products.length;i++) {
        const elements=products[i].children
        for (var j=0;j<elements.length;j++) {
            if (elements[j].tagName=="IMG") {
                const qtyID=elements[j].id+"qty"
                const appendage=[elements[j].id, document.getElementById(qtyID).value]
                arr.push(appendage)
            }

        }
    }
    const JSONData=JSON.stringify(arr)

    document.getElementById("order").value=JSONData
    
}




