const submitBtn = document.getElementById("submit-btn");

const resetBtn = document.getElementById("reset-btn");
const resetNoti = document.getElementById("reset-notification");
const resetBtn_Yes = document.getElementById("yes-reset-btn");
const resetBtn_No = document.getElementById("no-reset-btn");

const initModal = document.getElementById("init-modal");
const resetModal = document.getElementById("reset-modal");


const predLoadIcon = document.getElementById("predict-loading-ico");
const inputs = document.querySelectorAll(".value-input");
const price = document.getElementById("price");


function autorun(){
  initModal.style.display = 'flex'

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

resetBtn.onclick = (e)=>{
  e.preventDefault();
  resetModal.style.display = 'flex';
}
resetBtn_Yes.onclick = (e)=>{
  e.preventDefault();
  price.innerHTML = ``;
  for(let input of inputs){
    if(input.type === 'text'){
      input.value = '';
    }else{
      if(input.name === 'color')
        input.value = 6;
      else
        input.value = 0;
    }
  }
  resetModal.style.display = 'none';
}
resetBtn_No.onclick = (e)=>{
  e.preventDefault();
  resetModal.style.display = 'none';
}
resetModal.onclick = (e)=>{
  resetModal.style.display = 'none';
}
resetNoti.onclick = (e)=>{
  e.stopPropagation();
}

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
