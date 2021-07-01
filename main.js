function MonthlyTax(amount){
    var tax;
    var remainingAmount

    if( amount <= 12298){
        tax = 10/100 * amount
    } else if (amount >= 12299 && amount <= 23885){
        remainingAmount = amount - 12298;
        tax = (remainingAmount * 15/100) + 1229.8
    } else if (amount >= 23886 && amount <= 35472 ){
        remainingAmount = amount - 23884;
        tax = (remainingAmount * 20/100) + 1229.8 + 1737.9
    } else if (amount >= 35473 && amount <= 47059){
            remainingAmount = amount - 35470
            tax = (remainingAmount * 25/100) + 1229.8 + 1737.9 + 2317.2
    }else {
        remainingAmount = amount - 47056 
        tax =(remainingAmount * 30/100) + 1229.8 + 1737.9 + 2317.2 + 2896.5 
    }
    return tax
}


function calculateNhif(amount){
    let nhifAmount;
    switch(true){
        case (amount <= 5999): nhifAmount = 150 ; return nhifAmount;
        case (amount >= 6000 && amount <= 7999 ): nhifAmount = 300; return nhifAmount;   
        case (amount >= 8000 && amount <= 11999): nhifAmount = 400; return nhifAmount;  
        case (amount >= 12000 && amount <= 14999): nhifAmount = 500 ; return nhifAmount;
        case (amount >= 15000 && amount <= 19999): nhifAmount = 600 ; return nhifAmount;
        case (amount >= 20000 && amount <= 24999): nhifAmount = 750; return nhifAmount;
        case (amount >= 25000 && amount <= 29999): nhifAmount = 850; return nhifAmount;
        case (amount >= 30000 && amount <= 34999): nhifAmount = 900; return nhifAmount;
        case (amount >= 35000 && amount <= 39999): nhifAmount = 950; return nhifAmount;
        case (amount >= 40000 && amount <= 44999): nhifAmount = 1000; return nhifAmount;
        case (amount >= 45000 && amount <= 49999): nhifAmount = 1100; return nhifAmount;
        case (amount >= 50000 && amount <= 59999): nhifAmount = 1200; return nhifAmount;
        case (amount >= 60000 && amount <= 69999): nhifAmount = 1300; return nhifAmount;
        case (amount >= 70000 && amount <= 79999):nhifAmount = 1400; return nhifAmount;
        case (amount >= 80000 && amount <= 89999): nhifAmount = 1500; return nhifAmount;
        case (amount >= 90000 && amount <= 99999): nhifAmount = 1600; return nhifAmount;
        case (amount >= 100000 ): nhifAmount = 1700; return nhifAmount;
        default: nhifAmount = 0 ; 
        }

}

function calculateNssf(grossSalary){
    nssf = grossSalary < 18000 ? 6/100 * grossSalary : 1080 ;
    return nssf
}

window.onload = function () {
    function finalResult(){
        var taxableIncome;
        let personalRelief = 2400;
        let nssf;
        var nssfAmount;
        let nhifAmount = 0;
        let paye;
        let netIncome;
    
        var nhifCheckbox = document.getElementById("nhif");
        var calcButton = document.getElementById('calculateButton');
        var taxableIncomeEl = document.getElementById("taxable-income-el")

        document.getElementById('Gross-salary').addEventListener('input', event =>
            event.target.value = (parseInt(event.target.value.replace(/[^\d]+/gi, '')) )
            );
    
      
        var nssfCheckbox = document.getElementById("nssf-checkbox");
        nssfCheckbox.addEventListener("change",  function(){
            if(this.checked){
                document.getElementById("nssf-rate").disabled = false
                nssf = true
            }else{
                document.getElementById("nssf-rate").disabled = true
                nssf = false
            }
        })

        console.log(document.getElementById("nssf-rate").value)

        
        document.getElementById('Gross-salary').addEventListener('input', event =>
            event.target.value = (parseInt(event.target.value.replace(/[^\d]+/gi, '')) || "").toLocaleString('en-US')
            );
        
       

        calcButton.addEventListener('click', function(){
            var Amount = parseInt( document.getElementById("Gross-salary").value.replace(',', ''));
            var taxableIncomeEl = document.getElementById("taxable-income-el");
            var personalReliefEl = document.getElementById("personal-relief-el");
            var taxBeforeRelief = document.getElementById("tax-before-relief");
            var payeEl = document.getElementById("paye-el");
            var nssfEl = document.getElementById("nssf-el");
            var nhifEl = document.getElementById("nhif-el");
            var netPayEl = document.getElementById("net-pay-el");

            nhifAmount = nhifCheckbox.checked ? calculateNhif(Amount) : 0 ;
            nhifEl.innerHTML = nhifAmount.toLocaleString()

            if(nssf){
                if(document.getElementById("nssf-rate").value === "New Rate"){
                    nssfAmount = calculateNssf(Amount)
                }else{
                    nssfAmount = 200
                }
            }else{
                nssfAmount = 0
            }

            nssfEl.innerHTML = nssfAmount.toLocaleString()



            taxableIncome = Amount - nssfAmount;
            taxableIncomeEl.innerHTML = taxableIncome.toLocaleString();

            personalReliefEl.innerHTML = personalRelief.toLocaleString();

            paye = MonthlyTax(taxableIncome);
            payeEl.innerHTML = paye.toLocaleString();

            netIncome = paye > personalRelief ? taxableIncome - (paye - personalRelief) : taxableIncome ;
            netIncome -= nhifAmount;
            netPayEl.innerHTML = netIncome.toLocaleString(); 
            return netIncome
        })
    }
    finalResult();
}


