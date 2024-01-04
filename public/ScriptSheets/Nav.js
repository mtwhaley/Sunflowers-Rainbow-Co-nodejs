const Directory=["Shop", "Custom Order", "Cart"]
const Navigation=["shop", "custom", "cart"]
const cartItemsID="cartSignifier"

function createNavigation(id=null) {
    const div=document.getElementById("navSpace")
    const table=document.createElement("table")
    const row=document.createElement("tr")
    Directory.forEach(label => {
        row.appendChild(createCell(id,label))
    });


    table.appendChild(row)   
    table.setAttribute("class", "navTable")
    if (id!=null) {
        table.setAttribute("id", id)
    }
    div.appendChild(table)
    
    

}

function createCell(setID, label) {
    const td=document.createElement("td")
    const button=document.createElement("button")
    button.innerText=label
    button.setAttribute("class", "navButton")
    const buttonID=setID+label
    button.setAttribute("id", buttonID)
    td.appendChild(button)
    return td
}

function setNavigation(currentTab) {
    for (var i=0;i<Navigation.length;i++) {
        
        const button1=document.getElementById("topNav"+Directory[i])
        const button2=document.getElementById("bottomNav"+Directory[i])
        if (Directory[i]==currentTab) {
            button1.onclick=function() {location.reload()}
            button2.onclick=function() {location.reload()}
            
        }
        else if (Navigation[i]!="") {
            const link=Navigation[i]
            button1.onclick=function() {location.href=link}
            button2.onclick=function() {location.href=link}
            
        }
    }
}

function createCartNumber() {
    const div=document.createElement("div")
    div.setAttribute("class","cartQty")
    div.setAttribute("id",cartItemsID)

    document.getElementById("navSpace").appendChild(div)
    updateCartNumber()

}

function updateCartNumber() {
    const div=document.getElementById(cartItemsID)
    const qtyString=localStorage.getItem(cartKey)
    var qty
    if (qtyString==null) {qty=0}
    else {qty=Number(qtyString)}
    div.innerText=qty

    if (qty==0) {
        div.style.visibility="hidden"
    }
    else {
        div.style.visibility="visible"
    }
    
}

createNavigation("topNav")
createNavigation("bottomNav")
createCartNumber()
