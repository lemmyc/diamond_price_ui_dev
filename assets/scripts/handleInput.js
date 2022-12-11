const submitBtn = document.getElementById("submit-btn");
const inputs = document.querySelectorAll(".value-input");
const price = document.getElementById("price");
submitBtn.onclick = (e) => {
  e.preventDefault();
  data = {};
  isValid = 1;
  for (let input of inputs) {
    if (/^[0-9.,]+$/.test(input.value)) {
      data = {
        ...data,
        [input.name]: parseFloat(input.value),
      };
    }else{
      isValid = 0;
      price.innerHTML = `'${input.name}' is invalid !!!`;
      break;
    }
  }

  if (isValid === 1) {
    postData("https://diamond-price-prediction.onrender.com", data).then(
      (output) => {
        price.innerHTML = `Predicted price: $${output}`;
      }
    );
  }
};
