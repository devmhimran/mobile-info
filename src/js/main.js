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
    const search20Data = searchPhoneData.data.slice(0, 20);
    // console.log(searchPhoneData);
    searchPhone.innerHTML = '';
    if( searchPhoneData.data.length == 0 ){
        errorMessage('block');
        preloader('none');
    }else{
        preloader('none');
        for(const searchData of search20Data){
        errorMessage('none');
        
        const divCreate = document.createElement('div');
        divCreate.classList.add('col-lg-4');
        divCreate.classList.add('col-md-6');
        divCreate.classList.add('col-sm-12');
        divCreate.innerHTML = `
                    <div class="card m-3 phone-card">
                        <div class="card-body p-4">
                            <div class="phone-img text-center mt-3">
                                <img src="${searchData.image}" alt="">
                            </div>
                            <div class="phone-name mt-4">
                                <h4>${searchData.phone_name}</h4>
                            </div>
                            <div class="release-date">
                                <p>Brand: ${searchData.brand}</p>
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

// Phone Slug for Single Phone Data
const viewPhoneDetail = (phoneSlug) =>{
    const phoneDetailSlug = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
    fetch(phoneDetailSlug)
    .then(res => res.json())
    .then(phoneData => displaySinglePhone(phoneData.data))
}


// Single Phone Modal
const displaySinglePhone = singlePhoneDetail => {
  
    const modalDiv = document.getElementById('modal-content');
    modalDiv.innerHTML = '';
    const createModal = document.createElement('div');
    createModal.classList.add('modal-body');
    createModal.innerHTML = `

    <div class="close-button text-end">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
        <div class="row">
            <div class="modal-phone-image col-md-5 col-sm-12">
                <img src="${singlePhoneDetail.image}" alt="">
            </div>
            <div class="col-md-7">
                <h3>${singlePhoneDetail.name}</h3>
                <div class="phone-short-detail">
                    <p class="brand">Brand: <span>${singlePhoneDetail.brand}</span></p>
                    <p class="release-date">Release Date: <span>${singlePhoneDetail.releaseDate?singlePhoneDetail.releaseDate: 'No Date Found'}</span></p>
                </div>
            </div>
        </div>
        <hr class="my-3">
        <div class="mainFeatures">
            <h4>Main Features</h4>
            <p>Display Size: <span>${singlePhoneDetail.mainFeatures.displaySize?singlePhoneDetail.mainFeatures.displaySize:'No Data Found'}</span></p>
            <p>Chip Set: <span>${singlePhoneDetail.mainFeatures.chipSet?singlePhoneDetail.mainFeatures.chipSet:'No Data Found'}</span></p>
            <p>Memory: <span>${singlePhoneDetail.mainFeatures.memory?singlePhoneDetail.mainFeatures.memory:'No Data Found'}</span></p>
            <p>Storage: <span>${singlePhoneDetail.mainFeatures.storage?singlePhoneDetail.mainFeatures.storage:'No Data Found'}</span></p>
        </div>

    <div  class="sensors">
        <h4>Sensors</h4>
            <p>
                <span  class="sensor-detail">
                    ${singlePhoneDetail.mainFeatures.sensors?singlePhoneDetail.mainFeatures.sensors: 'No Sensor Data Found'}
                </span>
            </p>
            
    </div>
    <div class="others">
        <h4>Others</h4>
        <p>Bluetooth: <span>${singlePhoneDetail.others?.Bluetooth?singlePhoneDetail.others.Bluetooth:'No Data Found'}</span></p>
        <p>GPS: <span>${singlePhoneDetail.others?.GPS?singlePhoneDetail.others.GPS:'No Data Found'}</span></p>
        <p>NFC: <span>${singlePhoneDetail.others?.NFC?singlePhoneDetail.others.NFC:'No Data Found'}</span></p>
        <p>Radio: <span>${singlePhoneDetail.others?.Radio?singlePhoneDetail.others.Radio:'No Data Found'}</span></p>
        <p>USB: <span>${singlePhoneDetail.others?.USB?singlePhoneDetail.others.USB:'No Data Found'}</span></p>
        <p>WLAN: <span>${singlePhoneDetail.others?.WLAN?singlePhoneDetail.others.WLAN:'No Data Found'}</span></p>
    </div>
    `;

    modalDiv.appendChild(createModal);
}
