
const mongoose = require("mongoose")
const pup = require("puppeteer");
const Musica = require("../api/models/musica");

const MUSICA = []

const urlInfoMusic =[{
    url: "https://www.elcorteingles.es/cd/musica/pop-rock/2/",
    kind: "Pop"},
    {
    url: "https://www.elcorteingles.es/cd/musica/hard-rock-y-metal/",
    kind: "Metal"},
    {
        url: "https://www.elcorteingles.es/cd/musica/rap-y-hip-hop/",
        kind: "HipHop"},
    {
        url:"https://www.elcorteingles.es/cd/musica/dance-y-electronica/",
        kind: "Dance"},
    {
        url:"https://www.elcorteingles.es/cd/musica/bandas-sonoras/",
        kind: "Bandas Sonoras"
    }
]

const scrap = async () =>{
    if(MUSICA.length){
        await Musica.collection.drop()  
       }
    for (const info of urlInfoMusic) {
    try {
        const browser = await pup.launch({headless:false})
        const page = await browser.newPage()

        /*pop-rock: https://www.elcorteingles.es/cd/musica/pop-rock/2/  👌*/
        /*metal: https://www.elcorteingles.es/cd/musica/hard-rock-y-metal/ 👌 */
        /* rap: https://www.elcorteingles.es/cd/musica/rap-y-hip-hop/ * 👌/
       /* dance:  https://www.elcorteingles.es/cd/musica/dance-y-electronica/ 👌 */
       /*bandas sonoras:  https://www.elcorteingles.es/cd/musica/bandas-sonoras/ 👌 */

        await page.goto(info.url)
        await page.setViewport({width:1080, height:1024})

        
        const products = await page.$$(".products_list-item")
        
        for (const product of products) {

            const musica = {
               image: "",
               singer: "",
               album: "",
               price: "",
               kind: info.kind
            }

            const image = await product.$(".js_preview_image")
            const imagesrc = (await image?.evaluate((el) => el.src)) || "";
            console.log(imagesrc);
            musica.image = imagesrc;

            const singername = await product.$(".product_preview-brand")
            const singernametext = (await singername?.evaluate((el) => el.textContent)) || "";
            console.log(singernametext);
            musica.singer = singernametext

            const album = await product.$(".product_preview-desc")
            const albumtexto = (await album?.evaluate((el) => el.textContent.split("(")))[0] || "";
            console.log(albumtexto);
            musica.album = albumtexto

            const price = await product.$(".integer-price")
            const pricetext = (await price?.evaluate((el) => el.textContent)) || "";
            console.log(pricetext);
            musica.price = pricetext;

            MUSICA.push(musica)
        }
        await mongoose.connect("mongodb+srv://nsr2020:Caribe@cluster0.ufcwhzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

  
        await Musica.insertMany(MUSICA)
        console.log("Datos agregados correctamente en la BBDD");

        await mongoose.disconnect() 

        await browser.close() 

    } catch (error) {
        console.log(error);
    }
}
}

scrap()