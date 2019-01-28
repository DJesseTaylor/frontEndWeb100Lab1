import './styles.css';
import { ready } from './utils'; // Glad you used this sucker.

// JMG: THis is brilliant! *Great* idea! ;)
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
    tipInfo.bill = document.querySelector(".form-control"); // JMG This works, but is a little vague of a selector. Another form control added later could bonk you. I'd add an Id to the element.
    tipInfo.bill.oninput = updateTip;
    tipInfo.bill.addEventListener("keydown", function(c) {
        if ("e" == c.key) {
          c.preventDefault(); // JMG Well played.
        }
    });


    tipInfo.tipButtons = document.querySelectorAll(".btn.btn-secondary"); // JMG - again, selecting on bootstrap classes is kinda fragile. 
    tipInfo.tipButtons[0].disabled = true;
    tipInfo.tipPercent = tipInfo.tipButtons[0].innerText.slice(0,2); // JMG - cool hackering.
    tipInfo.tipButtons.forEach(b =>  b.addEventListener('click', tipPercentSelected)); // JMG one liner FTW

    tipInfo.currentTip = document.querySelector(".current-tip"); // the dot prefix indicates a class. If you want to select a specific thing (not a class of things), use an ID and # selector. or document.getElementById('tacos')
    tipInfo.currentTip.innerHTML = `You are tipping ${tipInfo.tipPercent}%`;

    tipInfo.output = document.querySelectorAll(".list-group-item"); // Same Same.
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
        tipInfo.amountOfTip = (parseFloat(tipInfo.bill.value) * (parseInt(tipInfo.tipPercent)/100)).toFixed(2); // this parsing and rounding thing is something I'd create a helper function for.
        tipInfo.totalBill = (parseFloat(tipInfo.amountOfTip) + parseFloat(tipInfo.bill.value)).toFixed(2);

    }
    updateOutput();
}

function updateOutput() {
    let formatBill = parseFloat(tipInfo.bill.value).toFixed(2); // See there it is again! 
    if(isNaN(formatBill)){
        formatBill = "";
    }
    // this is a nitpick, but I try to create as little content in the document from JS as possible.
    // If there was an issue that said "We should say "Total Amount to be Paid:" instead of Total to Be Paid", most people
    // would look at the html, not the JS to make that change. Here, they'd have to touch your JS.
    tipInfo.output.item(0).innerHTML =  `Bill Amount: $${formatBill}`;
    tipInfo.output.item(1).innerHTML =  `Tip Percentage: ${tipInfo.tipPercent}%`;
    tipInfo.output.item(2).innerHTML =  `Amount of tip: $${tipInfo.amountOfTip}`;
    tipInfo.output.item(3).innerHTML =  `Total to be Paid: $${tipInfo.totalBill}`;
}

function tipPercentSelected(){
    tipInfo.tipButtons.forEach(b=> b.disabled = false );
    this.disabled = true;
    tipInfo.tipPercent = this.innerText.slice(0,2);
    tipInfo.currentTip.innerHTML = `You are tipping ${tipInfo.tipPercent}%`;

    updateTip()
}
