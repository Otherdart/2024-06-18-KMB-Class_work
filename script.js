
//Bus ROUTE LIST API
// Search Bus ROUTE BY INPUT and Using Array.prototype.filter()
fetch("https://data.etabus.gov.hk//v1/transport/kmb/route/")
    .then(response =>{
        if(!response.ok){
          throw new Error("Could not fetch response")
        }
        return response.json()
    })
    .then(database => {
        
    const buttonElement = document.getElementById("submitbtn");
    buttonElement.addEventListener("click", function(){

    let BusNumberInput = document.getElementById('BusNumber');
    let BusValue = BusNumberInput.value.toUpperCase();

    

    let BusRoutes = database.data;
    console.log(BusRoutes);

    const CheckRoutes = BusRoutes.filter((Broutes)=>Broutes.route === BusValue);
    console.log(BusValue);
    console.log(CheckRoutes);
    
    for(let i =0; i<CheckRoutes.length; i++){
        const Routes = CheckRoutes[i];

        if(Routes.bound === "I"){

            const x = document.createElement("button");
            const routeDisplay = document.createTextNode(`${Routes.orig_tc} "<-->" ${Routes.dest_tc}`);
            x.appendChild(routeDisplay);
            displayContainer.appendChild(x);
            x.id = "inbound"
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
            x.id = "outbound"
            x.style.color = "blue";
            const ST = Routes.service_type;
            if(ST == 0){
                x.style.backgroundColor = "red";
        
            }

        }
        console.log(Routes)
    }

    })

    })
    .catch(error => console.error(error));


// Bus ROUTE-STOP LIST API
fetch(`https://data.etabus.gov.hk/v1/transport/kmb/route-stop`)
.then(response =>{
    if(!response.ok){
      throw new Error("Could not fetch response")
    }
    return response.json()
})
.then(database => {

    console.log(database.data)


} )
.catch(error => console.error(error));




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

    
    