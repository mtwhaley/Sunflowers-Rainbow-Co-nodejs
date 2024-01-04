
function ResetCategoryBackgrounds() {
    const div=document.getElementById("categoryText")
    const elements=div.childNodes
    elements.forEach(child => {
        if (child.nodeName=="BUTTON") {
            child.style.backgroundColor=""
        }
    });
    const melements=document.getElementById("mobileCategoryDiv").childNodes
    melements.forEach(child => {
        if (child.nodeName=="BUTTON") {
            child.style.backgroundColor=""
        }
    });
}

async function filterCategories(catID=undefined) {
    ResetCategoryBackgrounds()
    if (catID!=undefined) {
        const categoryClicker=document.getElementById(catID)
        const mobileButtonId="m"+catID
        const categoryClicker2=document.getElementById(mobileButtonId)

        categoryClicker.style.backgroundColor="var(--buttonColor)"
        categoryClicker2.style.backgroundColor="var(--buttonColor)"

    }
    else {
        document.getElementById("All").style.backgroundColor="var(--buttonColor)"
        document.getElementById("mAll").style.backgroundColor="var(--buttonColor)"
    }
    const productDiv=document.getElementById("productSpace")
    const elements=productDiv.childNodes
    for (var i=0;i<elements.length;i++) {
        if(elements[i].nodeName=="DIV") {   //cards
            if (catID!=undefined) {
                let itemNumber= await getCardNumber(elements[i])
                const item=await searchJSON(itemNumber)
                let check=itemCategoryCheck(item, catID)
                if (check==true) {
                    elements[i].style.display="block"
                }
                else {
                    elements[i].style.display="none"
                }
            }
            else {
                elements[i].style.display="block"
            }
        }
    };
    console.log("Here")

}