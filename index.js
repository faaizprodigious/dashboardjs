async function getData() {
  const url =
    "https://raw.githubusercontent.com/MrSunshyne/mauritius-dataset-electricity/refs/heads/main/data/power-outages.latest.json";
  let result = await fetch(url);
  let json = await result.json();

  return json;
}

function extractfuture(obj) {
  console.log("ex >>", obj);
  return obj["future"];
}

function addToDom(outage) {
  const output = document.getElementById("output");
  let from = outage.from

  const hasFromStartEffect = new Date().toUTCString() > new Date(outage.from).toUTCString
  console.log(hasFromStartEffect)
  const tpl = `
     <div class=" ${hasFromStartEffect ? 'bg-red': 'bg-sky-50'} border rounded-full p-10 bg-white"> 
        <div class="text-center" >${outage.date}</div>
            <div class="flex justify-between">
                <div>Localility ${outage.locality}</div>
                <div class="rounded-full" bg-color="blue" >${outage.district}</div>
            </div> 

            <div class="flex justify-between">
                <div>${outage.from}</div>
                <div>${outage.to}</div>
            </div>
            
        </div>
    </div>    
  `;
  output.innerHTML += tpl;
}

function clearOutput() {
    const output = document.getElementById('output')
    output.innerHTML = ""
}


function renderOutput (item) {
     for (let index = 0; index < item.length; index++) {
    const outage = item[index]
    console.log("loop")
    addToDom(outage);
  }
}

async function initialize() {
  const result = await getData();
  const future = extractfuture(result);
  clearOutput() 

  renderOutput(future)

 
}

document.addEventListener("DOMContentLoaded", initialize);
