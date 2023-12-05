import fs from "fs"
import jsdom from "jsdom"
const {JSDOM} = jsdom

const sallingConfig = JSON.parse(await fs.promises.readFile('../sensitive.json', 'utf-8'));
const sallingToken = sallingConfig.salling.token;


async function getBilkaToGoProducts(search) {
    let url = new URL("https://api.sallinggroup.com/v1-beta/product-suggestions/relevant-products")
    url.searchParams.set("query", search)
    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + sallingToken
            }
        })
        let data = await response.json()
        data.suggestions.forEach(product => {
            product["store"] = "Bilka"
        });
        return data.suggestions
    }
    catch (error) {
        console.log("Error fetching Salling producs: " + error)
        return null
    }
    
}


//main caller function
async function getProducts(search) {
        let sallingProducts = await getBilkaToGoProducts(search)
        console.log(sallingProducts)
        return sallingProducts
    
    
}

function compileHTMLForProducts(products) {
    let html = "<div class='results-container'>"
    products.forEach(product => {
        let div = `
        <div class = "product-container" id = "${product.id}">
        <img src = "${product.img}"/>
        <h3>${product.title}</h3>
        <p>${product.price},-</p>
        <a href="${product.link}">View</a>
        </div>
        `
        html += div
    })
    html += "</div>"
    return html
}

// let products = await getProducts("milk")
// let html = compileHTMLForProducts(products)

export {
    getProducts,
    compileHTMLForProducts
}

