
const searchInput = searchId => {
    const searchInput = document.getElementById(searchId);
    const searchInputValue = searchInput.value;
    searchInput.value = '';
    return searchInputValue;
}

document.getElementById('search-button').addEventListener('click', function(){
    const searchInputText = searchInput('search-input');
    // console.log(searchInputText);
    const inputUrl = `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`;
    fetch(inputUrl)
    .then(res => res.json())
    .then(data => displaySearchPhone(data));
});

const displaySearchPhone = searchPhoneData => {
    // for( const phoneData of searchPhoneData ){
    //     console.log(phoneData[0]);
    // }
    console.log(searchPhoneData.data[0]);
}