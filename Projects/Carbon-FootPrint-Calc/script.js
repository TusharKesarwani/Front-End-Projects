
const result = document.querySelector('.result'); 
const form = document.querySelector('form');
const newButton = document.querySelector('#btn');
const answerBox = document.querySelector('.answer-box');

console.log(form)
form.addEventListener('submit',(e)=>{
        e.preventDefault();
    let { bill, vehicle, mileage, distance, ac} = e.target;

    let gas = e.target.gas;

    let answer = calculateFootPrint(bill.value, vehicle.value, mileage.value, distance.value, ac.value, (gas) ? gas.value : null);

    bill.value = '';
    vehicle.value = '';
    mileage.value = '';
    distance.value = '';
    ac.value = '';
    if(gas){
        gas.value = '';
    }
    answerBox.style.display = 'flex';
    form.style.display = 'none';
    result.innerHTML = "You carbon emission is: " + answer.toFixed(4);
})


newButton.addEventListener('click',()=>{
    // answerBox.style.display = 'none';
    location.reload();  
    // form.style.display = 'block';
})

function calculateFootPrint(bill, vehicle, mileage, distance, ac, gas){
    let emission = 0;

        if (vehicle == 'petrol'){
            emissions_factor = 2.31;  
        }else if (vehicle == 'diesel'){
            emissions_factor = 2.68; 
        } 
        
        emission += (distance / mileage) * emissions_factor 
        console.log(emission); 
        emissions_factor2 = 0.93
        emission = emission + bill*emissions_factor2
        console.log(emission);
        
        if(gas){  
        emissions_factor3 = 2.983
        emission = emission + emissions_factor3*gas
        }

    return emission;
}


// emission = 0
//         current = float(request.POST['electricity'])   # In units = KWH
//         gas = float(request.POST['gas'])   # In grams
//         vehicle = request.POST['vehicle']   # Car , Bus
//         milage = float(request.POST['mileage'])
//         distance =float( request.POST['distance'])
//         emissions_factor = 0

//         if (vehicle == "Car"):
//             car_fuel = request.POST['fuel']     # Data is shared in the group
//             if car_fuel == 'gasoline':
//                 emissions_factor = 2.31  # in kg CO2 per liter
//             elif car_fuel == 'diesel':
//                 emissions_factor = 2.68  # in kg CO2 per liter
//         elif (vehicle == "Bus"):
//             car_fuel = request.POST['fuel']     # Data is shared in the group
//             emissions_factor = 0.68  # in kg CO2 per km

//         # Fuel

//         if vehicle == 'car':
//             emission = (distance / milage) * emissions_factor
//         elif vehicle == 'bus':
//             emission = distance * emissions_factor
//         # Electricity
//         emissions_factor = 0.93
//         emission = emission + current*emissions_factor
        
//         #LPG
//         emissions_factor = 2.983
//         emission = emission + emissions_factor*gas