const submitBtn = document.getElementById("submit-btn");
const initModal = document.getElementById("init-modal");
const predLoadIcon = document.getElementById("predict-loading-ico");
const inputs = document.querySelectorAll(".value-input");
const price = document.getElementById("price");


function autorun(){
  data = {
    carat: 1,
    clarity: 0,
    color: 6,
    cut: 0,
    depth: 1,
    table: 1,
    x: 1,
    y: 1,
    z: 1
  }
  postData("https://diamond-price-prediction.onrender.com", data).then(
      (output) => {
        initModal.style.display = 'none'
      }
    );

}
autorun()


submitBtn.onclick = (e) => {
  e.preventDefault();
  price.innerHTML = ``;
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
        price.style.color = 'red';
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
    predLoadIcon.style.display = 'block';
    postData("https://diamond-price-prediction.onrender.com", data).then(
      (output) => {
        predLoadIcon.style.display = 'none';
        price.style.color = '#22a6b3';
        price.innerHTML = `Predicted price: $${output}`;
      }
    );
  }
};
