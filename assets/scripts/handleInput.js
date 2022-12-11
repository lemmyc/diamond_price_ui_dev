const submitBtn = document.getElementById('submit-btn')
const inputs = document.querySelectorAll('.value-input')
const price = document.getElementById('price')
submitBtn.onclick = (e)=>{
  e.preventDefault()
  data = {}
  isValid = 1
  for(let input of inputs){
    if(input.name !== 'cut' && input.name !== 'color' && input.name !== 'clarity'){
      if((input.value == '' || parseFloat(input.value) <= 0 ||  isNaN(parseFloat(input.value)))){
        isValid = 0;
        break;
      }
    }
    data = {
      ...data,
      [input.name] : input.value
    }
    
  }

  if(isValid === 1){
    postData('https://diamond-price-prediction.onrender.com', data)
    .then((output) => {
      price.innerHTML = `Predicted price: $${output}`
    });
  }else{
    price.innerHTML = `Input is invalid`
  }
}