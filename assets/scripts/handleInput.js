const submitBtn = document.getElementById('submit-btn')
const inputs = document.querySelectorAll('.value-input')
const price = document.getElementById('price')
submitBtn.onclick = (e)=>{
  e.preventDefault()
  data = {}
  isValid = 1
  for(let input of inputs){
    if(input.name !== 'cut' && input.name !== 'color' && input.name !== 'clarity'){
      if((input.value == '' || parseFloat(input.value) === 0)){
        isValid = 0;
        break;
      }
    }
    if(input.name == 'depth'){
        let mean = 61.749322
        let std = 1.432626
        let scaledValue = (input.value - mean)/std
        data = {
          ...data,
          [input.name] : scaledValue
        }
    }else if(input.name == 'table'){
      let mean = 57.457251
      let std = 2.234549
      let scaledValue = (input.value - mean)/std
      data = {
        ...data,
        [input.name] : scaledValue
      }
  }else
    data = {
      ...data,
      [input.name] : input.value
    }
  }

  if(isValid === 1){
    postData('https://diamond-price-prediction.onrender.com', data)
    .then((output) => {
      price.innerHTML = `Predicted price: ${output}`
    });
  }else{
    price.innerHTML = `Input is invalid`
  }
}