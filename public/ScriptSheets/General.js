

function itemCategoryCheck(item,category) {
    switch (category) {
        case "Decor":
            return item.Decor
        case "Apparel":
            return item.Apparel
        case "Stuffed":
            return item.Stuffed
        case "Misc":
            return item.Misc
        case "Seasonal":
            return item.Seasonal
        case "Themed":
            return item.Themed
        case "Slime":
            return item.Slime
        
        default:
            return false
    }
}






async function LookupByNumber() {
    let itemNumber=document.getElementById("ItemNumber").value

    let item=await searchJSON(itemNumber)
    if (item!=null) {
        createProductCard(item)

    }
}

function searchJSON(number) {
    return new Promise((resolve, reject)=> {
        JSONData.forEach(item => {
            if (item.Item_Number==number) {
                resolve(item)
            }
        });
       resolve(null)
    })
}

