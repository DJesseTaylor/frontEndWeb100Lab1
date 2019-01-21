import './styles.css';
import { ready } from './utils';

let tipButtons, bill, tipPercent, currentTip, output, amountOfTip = "", totalBill = "";

function setUp() {
    bill = document.querySelector(".form-control");
    bill.oninput = updateTip;

    tipButtons = document.querySelectorAll(".btn.btn-secondary");
    tipButtons[0].disabled = true;
    tipPercent = tipButtons[0].innerText.slice(0,2);
    tipButtons.forEach(b => {
        b.addEventListener('click', tipPercentSelected);
    });

    currentTip = document.querySelector(".current-tip");
    currentTip.innerHTML = `You are tipping ${tipPercent}%`;

    output = document.querySelectorAll(".list-group-item");
    updateOutput();
}

ready(setUp);

function updateTip(){
    if(isNaN(parseFloat(bill.value)) || parseFloat(bill.value) < 0)
    {
        if(bill.value !== ""){
            bill.classList.add('error');
        }
        else{
            bill.classList.remove('error');
        }
        amountOfTip = "";
        totalBill = ""
    }
    else    {
        bill.classList.remove('error');
        amountOfTip = (parseFloat(bill.value) * (parseInt(tipPercent)/100)).toFixed(2);
        totalBill = (parseFloat(amountOfTip) + parseFloat(bill.value)).toFixed(2);

    }
    updateOutput();
}

function updateOutput() {
    let formatBill = parseFloat(bill.value).toFixed(2);
    if(isNaN(formatBill)){
        formatBill = "";
    }
    output.item(0).innerHTML =  `Bill Amount: $${formatBill}`;
    output.item(1).innerHTML =  `Tip Percentage: ${tipPercent}%`;
    output.item(2).innerHTML =  `Amount of tip: $${amountOfTip}`;
    output.item(3).innerHTML =  `Total to be Paid: $${totalBill}`;
}

function tipPercentSelected(){
    tipButtons.forEach(b=>{
        b.disabled = false;
    });
    this.disabled = true;
    tipPercent = this.innerText.slice(0,2);
    currentTip.innerHTML = `You are tipping ${tipPercent}%`;

    updateTip()
}