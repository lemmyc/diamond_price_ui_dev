const submitBtn = document.getElementById("submit-btn");
const inputs = document.querySelectorAll(".value-input");
const price = document.getElementById("price");
submitBtn.onclick = (e) => {
  e.preventDefault();
  data = {};
  isValid = 1;
  for (let input of inputs) {
    if (
      input.name !== "cut" &&
      input.name !== "color" &&
      input.name !== "clarity"
    ) {
      if (
        /^[0-9.,]+$/.test(input.value) &&
        !isNaN(parseFloat(input.value)) &&
        parseFloat(input.value) > 0 &&
        (input.value.match(/,/g) || []).length <= 1 &&
        (input.value.match(/\./g) || []).length <= 1 &&
        (input.value.match(/,/g) || []).length + (input.value.match(/\./g) || []).length <= 1
      ) {
        data = {
          ...data,
          [input.name]: parseFloat(input.value),
        };
      } else {
        isValid = 0;
        price.innerHTML = `'${input.name}' is invalid !!!`;
        break;
      }
    } else {
      data = {
        ...data,
        [input.name]: parseFloat(input.value),
      };
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
