
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
    const stopDisplayContainer = document.getElementById("stopDisplayContainer");
    const buttonElement = document.getElementById("submitbtn");
    buttonElement.addEventListener("click", function(){

    // Clear previous results
    stopDisplayContainer.innerHTML = '';
    displayContainer.innerHTML = '';

    let BusNumberInput = document.getElementById('BusNumber');
    let BusValue = BusNumberInput.value.toUpperCase();
    console.log(BusValue);

    const CheckRoutes = busRoutesData.filter((Broutes)=>Broutes.route === BusValue );
    console.log(CheckRoutes);


    for(let i =0; i<CheckRoutes.length; i++){
        const Routes = CheckRoutes[i];

        

        if(Routes.bound === "I"){

            const x = document.createElement("button");
            const routeDisplay = document.createTextNode(`${Routes.orig_tc} "-->" ${Routes.dest_tc}`);
            x.appendChild(routeDisplay);
            displayContainer.appendChild(x);
            x.id = `${Routes.route}${Routes.bound}${Routes.service_type}`

            //click function
            const routesclicked = document.getElementById(`${Routes.route}${Routes.bound}${Routes.service_type}`)
            routesclicked.addEventListener("click", async function(){
               
                stopDisplayContainer.innerHTML = '';
                
                let routestoplis = await getBusRoutesStop();
               

                for(let i =0; i<routestoplis.length; i++){
                    const Routesstops = routestoplis[i];
                    let busStop = await getBusStop();

                    const x = document.createElement("button");
                    const routeDisplay = document.createTextNode(busStop.name_tc);
                    x.appendChild(routeDisplay);
                    stopDisplayContainer.appendChild(x);


                async function getBusStop() {
                        try {
                            const response = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/stop/${Routesstops.stop}`);
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            const BusStop = await response.json();
                            return BusStop.data;
                        } catch (error) {
                            console.error('Error fetching bus routes:', error);
                            return null; // or handle the error as needed
                        }
                    }

                    console.log(Routesstops);


                }

            })
            
            x.onclick = "getBusRoutesStop()"
            const ST = Routes.service_type;
            if(ST == 1){
                x.style.backgroundColor = "";
                
        
            }else if (ST >= 2){

                x.style.backgroundColor = "yellow";
                

            }
            


        } else if (Routes.bound === "O"){

            const x = document.createElement("button");
            const routeDisplay = document.createTextNode(`${Routes.orig_tc} "-->" ${Routes.dest_tc}`);
            x.appendChild(routeDisplay);
            displayContainer.appendChild(x);
            x.id = `${Routes.route}${Routes.bound}${Routes.service_type}`

            //click function
            const routesclicked = document.getElementById(`${Routes.route}${Routes.bound}${Routes.service_type}`)
            routesclicked.addEventListener("click", async function(){

     
        

                stopDisplayContainer.innerHTML = '';

                let routestoplis = await getBusRoutesStop();

                for(let i =0; i<routestoplis.length; i++){
                    const Routesstops = routestoplis[i];
                    let busStop = await getBusStop();

                    const x = document.createElement("button");
                    const routeDisplay = document.createTextNode(busStop.name_tc);
                    x.appendChild(routeDisplay);
                    stopDisplayContainer.appendChild(x);
                    x.id = (`${busStop.name_en}`)

                    


                    console.log(busStop.name_tc);

                    async function getBusStop() {
                        try {
                            const response = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/stop/${Routesstops.stop}`);
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            const BusStop = await response.json();
                            return BusStop.data;
                        } catch (error) {
                            console.error('Error fetching bus routes:', error);
                            return null; // or handle the error as needed
                        }
                    }



                    async function getBusRoutesETA() {
                        try {
                            const response = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/eta/${Routesstops.stop}/${Routes.route}/${Routes.service_type}`);
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            const BusRoutesStopETA = await response.json();
                            return BusRoutesStopETA.data;
                        } catch (error) {
                            console.error('Error fetching bus routes:', error);
                            return null; // or handle the error as needed
                        }
                    }
                    
                    let BusRoutesETA = await getBusRoutesETA();
                    let Eta = BusRoutesETA;         
                    for(let i =0; i<3; i++){
                        console.log(Eta[i]);
                    }
                    

                }
                

            })


            x.style.color = "blue";
            const ST = Routes.service_type;
            if(ST == 0){
                x.style.backgroundColor = "red";
            }

        

        }
        

        if(Routes.bound == "O"){
            Routes.bound = "outbound"
        } else {Routes.bound = "inbound"};


        //Get the Bus Routes stop list
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













    }

    })  
}

processBusRoutes();





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

    
    