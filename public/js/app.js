const weatherForm=document.querySelector('form')
const search=document.querySelector('input')

const messageOne=document.querySelector('#message-1')  //message-1 ki id fetch krne k liye
const messageTwo=document.querySelector('#message-2')

// messageOne.textContent='error'

// messageOne.textContent='data'
weatherForm.addEventListener('submit',(e)=>{

	e.preventDefault()

	const location=search.value

	messageOne.textContent="Loading....."
	messageTwo.textContent=""

	fetch("/weather?address="+location).then((response)=>{
		response.json().then((data)=>{

			if (data.error){

				messageOne.textContent=data.error
			}else{
				

				messageOne.textContent=data.location
				messageTwo.textContent=data.forecast
				
				
			
			}
		})
	})
	
})