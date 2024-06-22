
//Get the Bus Routes list
async function getBusRoutes() {
    try {
        const response = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/route/");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const BusRoutes = await response.json();
        return BusRoutes.data;
    } catch (error) {
        console.error('Error fetching bus routes:', error);
        return null; // or handle the error as needed
    }
}



// ProcessBusRoutes list and filter out the input
async function processBusRoutes(){
    const busRoutesData = await getBusRoutes();
    if (!busRoutesData) {
        console.error('Failed to fetch bus routes data.');
        return;
    }


    const displayContainer = document.getElementById("displayContainer");
    const buttonElement = document.getElementById("submitbtn");
    buttonElement.addEventListener("click", function(){
    let BusNumberInput = document.getElementById('BusNumber');
    let BusValue = BusNumberInput.value.toUpperCase();
    console.log(BusValue);

    const CheckRoutes = busRoutesData.filter((Broutes)=>Broutes.route === BusValue );
    console.log(CheckRoutes);

     // Clear previous results
    displayContainer.innerHTML = '';

    for(let i =0; i<CheckRoutes.length; i++){
        const Routes = CheckRoutes[i];

        if(Routes.bound === "I"){

            const x = document.createElement("button");
            const routeDisplay = document.createTextNode(`${Routes.orig_tc} "<-->" ${Routes.dest_tc}`);
            x.appendChild(routeDisplay);
            displayContainer.appendChild(x);
            x.id = `${Routes.route}${Routes.bound}${Routes.service_type}`
            x.style.color = "red";
            const ST = Routes.service_type;
            if(ST == 1){
                x.style.backgroundColor = "";
                
        
            }else if (ST >= 2){

                x.style.backgroundColor = "yellow";
                

            }
            


        } else if (Routes.bound === "O"){

            const x = document.createElement("button");
            const routeDisplay = document.createTextNode(`${Routes.orig_tc} "<-->" ${Routes.dest_tc}`);
            x.appendChild(routeDisplay);
            displayContainer.appendChild(x);
            x.id = `${Routes.route}${Routes.bound}${Routes.service_type}`
            x.style.color = "blue";
            const ST = Routes.service_type;
            if(ST == 0){
                x.style.backgroundColor = "red";
            }

        }

        if(Routes.bound == "O"){
            Routes.bound = "outbound"
        } else {Routes.bound = "inbound"};


        //Get the Bus Routes list
        async function getBusRoutesStop() {
            try {
                const response = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/route-stop/${Routes.route}/${Routes.bound}/${Routes.service_type}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const BusRoutesStop = await response.json();
                return BusRoutesStop.data;
            } catch (error) {
                console.error('Error fetching bus routes:', error);
                return null; // or handle the error as needed
            }
        }

        console.log(getBusRoutesStop());


    }

    })  
}

processBusRoutes();





// // Bus ROUTE-STOP LIST API
// fetch(`https://data.etabus.gov.hk/v1/transport/kmb/route-stop`)
// .then(response =>{
//     if(!response.ok){
//       throw new Error("Could not fetch response")
//     }
//     return response.json()
// })
// .then(database => {

//     console.log(database.data)

// } )
// .catch(error => console.error(error));




// // Bus stop data
// fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop/7C16C33063484D0E")
//     .then(response =>{
//         if(!response.ok){
//           throw new Error("Could not fetch response")
//         }
//         return response.json()
//     })
//     .then(database => console.log(database.data))
//     .catch(error => console.error(error));


// // ETA API
// fetch("https://data.etabus.gov.hk//v1/transport/kmb/eta/A60AE774B09A5E44/40/1")
//     .then(response =>{
//         if(!response.ok){
//           throw new Error("Could not fetch response")
//         }
//         return response.json()
//     })
//     .then(database => console.table(database.data))
//     .catch(error => console.error(error));

    
    