function getJSONCartItems() {
    const table=document.getElementById("cartItems")
    const images=table.getElementsByTagName("img")
    const quantities=table.getElementsByTagName("input")
    var arr=[]
    for (var i=0;i<images.length;i++) {
        const itemID=images[i].id
        const qty=quantities[i].value
        const JSONitem={
            id: itemID,
            quantity: qty
        }
        arr.push(JSONitem)
    }


    return arr
}

function ConvertCartToMessage(message) {
    const cartDisplay=document.getElementById("cartTable")
    cartDisplay.style.display="none"
    const messageArea=document.getElementById("paymentMessage")
    messageArea.style.display="block"

    const messageSpace=document.getElementById("paymentStatus")

    messageSpace.innerHTML=message

    document.getElementById(cartItemsID).style.display="none"
}

