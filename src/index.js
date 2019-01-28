import './styles.css';
import { ready } from './utils';

export const tipInfo = {
    tipButtons: null,
    bill: null,
    tipPercent: "",
    currentTip: 0,
    output: "",
    amountOfTip: "",
    totalBill: ""
}

function setUp() {
    tipInfo.bill = document.querySelector(".form-control");
    tipInfo.bill.oninput = updateTip;
    tipInfo.bill.addEventListener("keydown", function(c) {
        if ("e" == c.key) {
          c.preventDefault();
        }
    });


    tipInfo.tipButtons = document.querySelectorAll(".btn.btn-secondary");
    tipInfo.tipButtons[0].disabled = true;
    tipInfo.tipPercent = tipInfo.tipButtons[0].innerText.slice(0,2);
    tipInfo.tipButtons.forEach(b => {
        b.addEventListener('click', tipPercentSelected);
    });

    tipInfo.currentTip = document.querySelector(".current-tip");
    tipInfo.currentTip.innerHTML = `You are tipping ${tipInfo.tipPercent}%`;

    tipInfo.output = document.querySelectorAll(".list-group-item");
    updateOutput();
}

ready(setUp);

function updateTip(){
    if(isNaN(parseFloat(tipInfo.bill.value)) || parseFloat(tipInfo.bill.value) < 0)
    {
        if(tipInfo.bill.value !== ""){
            tipInfo.bill.classList.add('error');
        }
        else{
            tipInfo.bill.classList.remove('error');
        }
        tipInfo.amountOfTip = "";
        tipInfo.totalBill = ""
    }
    else    {
        tipInfo.bill.classList.remove('error');
        tipInfo.amountOfTip = (parseFloat(tipInfo.bill.value) * (parseInt(tipInfo.tipPercent)/100)).toFixed(2);
        tipInfo.totalBill = (parseFloat(tipInfo.amountOfTip) + parseFloat(tipInfo.bill.value)).toFixed(2);

    }
    updateOutput();
}

function updateOutput() {
    let formatBill = parseFloat(tipInfo.bill.value).toFixed(2);
    if(isNaN(formatBill)){
        formatBill = "";
    }
    tipInfo.output.item(0).innerHTML =  `Bill Amount: $${formatBill}`;
    tipInfo.output.item(1).innerHTML =  `Tip Percentage: ${tipInfo.tipPercent}%`;
    tipInfo.output.item(2).innerHTML =  `Amount of tip: $${tipInfo.amountOfTip}`;
    tipInfo.output.item(3).innerHTML =  `Total to be Paid: $${tipInfo.totalBill}`;
}

function tipPercentSelected(){
    tipInfo.tipButtons.forEach(b=>{
        b.disabled = false;
    });
    this.disabled = true;
    tipInfo.tipPercent = this.innerText.slice(0,2);
    tipInfo.currentTip.innerHTML = `You are tipping ${tipInfo.tipPercent}%`;

    updateTip()
}

// export const tipPercentSelectedFunction = tipPercentSelected;
// export const setUpFunction = setUp;
// export const updateTipFunction = updateTip