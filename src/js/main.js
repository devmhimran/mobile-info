// Search ID
const searchInput = searchId => {
    const searchInput = document.getElementById(searchId);
    const searchInputValue = searchInput.value;
    searchInput.value = '';
    return searchInputValue;
}
// Preloader
const preloader = (displayStyle) =>{
    const preloaderId = document.getElementById('preloader');
    preloaderId.style.display = displayStyle;
}
// Search Input
document.getElementById('search-button').addEventListener('click', function(){
    const searchInputText = searchInput('search-input');
    // console.log(searchInputText);
    const inputUrl = `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`;
    fetch(inputUrl)
    .then(res => res.json())
    .then(data => displaySearchPhone(data));
    preloader('block');
});
// Error Message Display
const errorMessage = (displayStyle) =>{
    const errorMessageId = document.getElementById('error-message');
    errorMessageId.style.display = displayStyle;
}
errorMessage('none');
const displaySearchPhone = searchPhoneData => {
    const searchPhone = document.getElementById('search-phone');
    searchPhone.innerHTML = '';
    if( searchPhoneData.data.length == 0 ){
        console.log('Not Found');
        errorMessage('block');
        preloader('none');
    }else{
        preloader('none');
        for(const searchData of searchPhoneData.data){
        // console.log(searchData);
        errorMessage('none');
        
        const divCreate = document.createElement('div');
        divCreate.classList.add('col-md-4');
        divCreate.innerHTML = `
                    <div class="card m-3 phone-card">
                        <div class="card-body p-4">
                            <div class="phone-img text-center mt-3">
                                <img  data-bs-toggle="modal" href="#exampleModalToggle" role="button" src="${searchData.image}" alt="">
                            </div>
                            <div class="phone-name mt-4">
                                <h4>${searchData.phone_name}</h4>
                            </div>
                            <div class="release-date">
                                <p>Released 2021, September 24</p>
                            </div>
                            <div class="view-button">
                                <button id="view-button" onclick="viewPhoneDetail('${searchData.slug}')" class="btn btn-outline-primary btn-sm" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">View</button>
                            </div>
                        </div>
                    </div>
        `;
        searchPhone.appendChild(divCreate);
        }
        
        
    }
    
}

const viewPhoneDetail = (phoneSlug) =>{
    const phoneDetailSlug = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
    fetch(phoneDetailSlug)
    .then(res => res.json())
    .then(phoneData => displaySinglePhone(phoneData.data))
}

const displaySinglePhone = singlePhoneDetail => {
    // console.log(singlePhoneDetail.mainFeatures.sensors.splice(0));
    const modalDiv = document.getElementById('modal-content');
    modalDiv.innerHTML = '';
    const createModal = document.createElement('div');
    createModal.classList.add('modal-body');
    createModal.innerHTML = `

    <div class="close-button text-end">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
        <div class="row">
            <div class="col-md-5">
                <img src="${singlePhoneDetail.image}" alt="">
            </div>
            <div class="col-md-7">
                <h3>${singlePhoneDetail.name}</h3>
                <div class="phone-short-detail">
                    <p class="brand">Brand: <span>${singlePhoneDetail.brand}</span></p>
                    <p class="release-date">Release Date: <span>${singlePhoneDetail.releaseDate}</span></p>
                </div>
            </div>
        </div>
    <hr class="my-3">
    <div class="mainFeatures">
        <h4>Main Features</h4>
        <p>Display Size: <span>${singlePhoneDetail.mainFeatures.displaySize}</span></p>
        <p>Chip Set: <span>${singlePhoneDetail.mainFeatures.chipSet}</span></p>
        <p>Memory: <span>${singlePhoneDetail.mainFeatures.memory}</span></p>
        <p>Storage: <span>${singlePhoneDetail.mainFeatures.storage}</span></p>
        <p class="sensor">Sensors: 
            <span>
                ${singlePhoneDetail.mainFeatures.sensors[0]}
                ${singlePhoneDetail.mainFeatures.sensors[1]}
                ${singlePhoneDetail.mainFeatures.sensors[2]}
                ${singlePhoneDetail.mainFeatures.sensors[3]}
                ${singlePhoneDetail.mainFeatures.sensors[4]}
                ${singlePhoneDetail.mainFeatures.sensors[4]}
            </span>
        </p> 

    </div>
    `;

    modalDiv.appendChild(createModal);
}
