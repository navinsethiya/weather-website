const express=require("express")

const port=process.env.PORT || 3000

const path=require("path")

const hbs=require("hbs")

const app=express()

const geocode=require("./utils/geocode")

const forecast=require("./utils/forecast")


// console.log(path.join(__dirname))
// console.log(path.join(__dirname,"../public"))

// Define Path for Express Config

const publicDirPath=path.join(__dirname,"../public")

const viewsPath=path.join(__dirname,"../templates/views")


const partialsPath=path.join(__dirname,"../templates/partials")

// setup handlebars engine and view location

app.set("view engine",'hbs')
app.set("views",viewsPath)

hbs.registerPartials(partialsPath)


// setup static dir to serve


app.use(express.static(publicDirPath)) //use is used to customize your server //static method takes as path to folder

app.get('',(req,res) =>{
	res.render("index.hbs",{
		title:"Weather App",
		name:"Navin Sethiya"
	})
})


app.get('/about',(req,res) =>{
	res.render("about",{
		title:"About Me",
		name:"Navin Sethiya"
	})
})


app.get('/help',(req,res) =>{
	res.render("help",{
		title:"Help",
		name:"Navin Sethiya"
	})
})

app.get('/game',(req,res) =>{
	res.send(
		{link:"http://facebook.com/profile.php?=73322363",
		 you:"The above link is your facebook link and i know that because i am Hacker ...ohhhhhhhhhhhhhhohhhhhhhhhhhh "})
})

// we create the endpoints of url
// 1.

app.get('/products',(req,res)=>{
	if (!req.query.search){
		return(res.send({
			error:"You must provide a search term"
		}))
	}
	console.log(req.query.search)
	res.send({
		p:[]
	})
})

// 2.

app.get('/weather',(req,res)=>{
 	if (!req.query.address){
		return(res.send({
			error:"You must provide an address"
		}))
	}

    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

	if(error){

		return res.send({error})
	}
	forecast(latitude,longitude,(error,forecastData)=>{

		if (error){
			return console.log({error})
		}
		res.send({
			forecast:forecastData,
			location:location,
			address:req.query.address
		})
	})
 })
 })

// 	console.log(req.query.address)
// 	res.send({
// 		location:"kota",
// 		address:req.query.address
// 	})
// })



app.get('/help/*',(req,res)=>{
 	res.render("404",{
 		title: "404",
 		name:"Navin Sethiya",
 		ErrorMessage:"help article not found"

 	})
})
app.get('*',(req,res)=>{
 	res.render("404",{
 		title:"404",
 		name:"Navin Sethiya",
 		ErrorMessage:"Page not found"

 	})
})
//get function takes two arg,one url and second function(req,data)

// app.get('',(req,res)=>{
// 	res.send("<h1>weather</h1>")
// } )

// app.get('/about',(req,res)=>{
// 	res.send("<h1>weather help</h1>")
// } )

// app.get('/help',(req,res)=>{
// 	res.send("help,i am being surronded")
// } )



app.listen(3000,()=>{
	console.log("server is up on port " + port)
})                   