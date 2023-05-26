
const catFactsList = document.getElementById("cat-facts-list");
let catFactsData = [];

// Krijo një funksion për të shtuar faktet e maceve në vektor
function addCatFactToArray(catFact) {
    catFactsData.push(catFact);
}

// Hap faqen me numrin e klikuar
function openPage (url){
    fetchData(url)
}

// Fshin elementin nga lista
function deleteFact(index){
    $('#fact_'+index).remove()
}

// Merrni të dhënat nga API
function fetchData(url){
    $('#cat-facts-list').html('')
    let index = 0
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const catFacts = data.data;
        data.data.forEach(catFact => {
            addCatFactToArray(catFact);
        });

        // Shto çdo fakt mace në listë
        data.data.forEach(catFact => {
            $(`#cat-facts-list`).append(`<li id="fact_${++index}">${catFact.fact} <button type="button" class="btn btn-danger" onclick="deleteFact(${index})">Fshi</button> </li>`)
        });

        $(`#paginate`).html('')
        data.links.forEach(link=>{
            $(`#paginate`).append(`<li class="page-item"><a class="page-link" onclick="openPage('${link.url}')">${link.label}</a></li>`)
        })
       
        // Vendosim një dëgjues ngjarjesh për ndryshimin e input-it të kërkimit
        const searchInput = document.getElementById("search-input");
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase();
            const catFactItems = catFactsList.getElementsByTagName("li");

            // Përdor loop për të kontrolluar secilin element të listës
            for (let i = 0; i < catFactItems.length; i++) {
                const catFact = catFactItems[i];
                const factText = catFact.innerText.toLowerCase();

                // Kontrolloni nëse teksti i faktit përputhet me termin e kërkimit
                if (factText.includes(searchTerm)) {
                    catFact.style.display = "block";  // Trego elementin nëse përputhet
                } else {
                    catFact.style.display = "none";   // Fshij elementin nëse nuk përputhet
                }
            }
        });

    })
    .catch(error => {
        console.log("Gabim në marrjen e të dhënave nga API: ", error);
    });

}

// Funksion qe ekzekutohet pasi eshte ngarkuar i gjithe dokumenti
document.addEventListener("DOMContentLoaded", function () {
    fetchData("https://catfact.ninja/facts")
});
