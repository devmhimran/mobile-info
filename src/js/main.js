
const searchInput = searchId => {
    const searchInput = document.getElementById(searchId);
    const searchInputValue = searchInput.value;
    searchInput.value = '';
    return searchInputValue;
}

const preloader = (displayStyle) =>{
    const preloaderId = document.getElementById('preloader');
    preloaderId.style.display = displayStyle;
}

document.getElementById('search-button').addEventListener('click', function(){
    const searchInputText = searchInput('search-input');
    // console.log(searchInputText);
    const inputUrl = `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`;
    fetch(inputUrl)
    .then(res => res.json())
    .then(data => displaySearchPhone(data));
    preloader('block');
});

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
                    <div class="card m-3">
                        <div class="card-body">
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
                                <button id="view-button" onclick="viewPhoneDetail('${searchData.slug}')" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" href="#exampleModalToggle" role="button">View</button>
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
    console.log(singlePhoneDetail);
    const modalDiv = document.getElementById('phone-modal');
    const createModal = document.createElement('div');
    // createModal.classList.add()
    createModal.innerHTML = `
        <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalToggleLabel">${singlePhoneDetail.name}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4">
    
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Open second modal</button>
                </div>
              </div>
            </div>
          </div>
    `;
    modalDiv.appendChild(createModal);
}