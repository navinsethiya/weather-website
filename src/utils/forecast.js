const request=require("request")



const forecast=(latitude,longitude,callback)=> {
	const url='https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude+'&lon='+longitude+'&units=metric&appid=8515ae9a88ad79fb108cfdf1b6762ee6'

	request({url,json:true},(error,{body})=>{
		if (error){
			callback("Unable to connect weather service",undefined)
		
		} else if(body.message) {

			callback("Unable to find location, Try another search",undefined)

		} else {

			callback(undefined,(body.current.weather[0].description+" Out there. "  + " it is currently " + body.current.temp + " degree out. " + "There are  "+body.current.clouds+ "% clouds. " )
				
				
				
				
			)
				
			
		}



	})

}


module.exports=forecast

// The request module is by far the most popular (non-standard) Node package
// for making HTTP requests. Actually,
// it is really just a wrapper around Node's built in http module,
// so you can achieve all of the same functionality on your own with http ,
// but request just makes it a whole lot easier.