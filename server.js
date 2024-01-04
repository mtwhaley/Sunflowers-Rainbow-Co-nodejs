
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()

}
const express=require('express')
const fs=require('fs')
const path=require('path');
const http=require('http')
const request=require('request')


const app=express()
const port=3000;


const stripeSecretKey=process.env.STRIPE_SECRET_KEY
const stripePublicKey=process.env.STRIPE_PUBLIC_KEY
const apiLink=process.env.API_LINK
const taxRate="0.065"
const shippingFee=5

const stripe=require('stripe')(stripeSecretKey)

app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'public/views'));

app.listen(port)

app.post('/test', function(req, res) {

    sendOrderInfo()
})

app.post('/purchase', function(req, res) {

    fs.readFile('items.json', function(error, data) {
        if (error) {
            res.status(500).end()
        }
        else {
            const itemsJSON=JSON.parse(data)
            const itemsArray=itemsJSON.Products
            var subtotal=0
            
            
            req.body.items.forEach(item => {
                
                const completeItem=itemsArray.find(function(i) {
                    return i.Item_Number==Number(item.id)
                })
                
                subtotal+=(completeItem.Price * item.quantity)
            });
            const total=(calcTotal(subtotal))*100
            
            stripe.charges.create({
                amount: total,
                source: req.body.stripeTokenId,
                currency: 'usd'
            }).then(function(d) {
                console.log("Charge successful")
                const order={
                    paymentID: d.source.id,
                    purchaserEmail: d.source.name,
                    last4: d.payment_method_details.card.last4,
                    amount: d.payment_method_details.card.amount_authorized,
                    shipping1: req.body.shippingInfo.ShippingLine1,
                    shipping2: req.body.shippingInfo.ShippingLine2,
                    shipping3: req.body.shippingInfo.ShippingLine3,
                    items: req.body.items
                }
                
                sendOrderInfo(order)

                res.json({message: "Successfully purchased items"})
            }).catch(function() {
                console.log("Charge error")
                res.status(500).end()
            }) 
        }
    })
    
    
})

async function sendOrderInfo(order) {

    const orderArray=[order.paymentID, order.shipping1, order.shipping2, order.shipping3, order.purchaserEmail, order.amount, order.last4, order.items]

    console.log(orderArray[7])

    request.post(apiLink, {
        json: {
            data: JSON.stringify(orderArray)
        }, function (err, res, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    })


    console.log("order details sent")
    
}

function calcTotal(subtotal) {
    const taxes=Number(((subtotal) * taxRate).toFixed(2))
    
    const total=subtotal + shippingFee + taxes
    return total.toFixed(2)
}


app.get("/store", function(req, res) {
    res.render('store.ejs')
})

app.get("/cart", function(req, res) {
    res.render("ShoppingCart.ejs", {
        pubKey: stripePublicKey,
        taxRate: taxRate,
        shipFee: shippingFee
    })
})

app.get("/custom", function(req, res) {
    res.render('CustomJob.ejs')
})
app.get("/shop", function(req, res) {
    res.render('index.ejs')
})

app.get("/result", function(req, res) {
    const d=new Date()
    const t=d.getSeconds()
    var s=false
    if (t%2==0) {s=true}


    res.render('Result.ejs', {
        successful: s
    })
})

