let countryMap = {
    ru: "912 345-67-89",
    ua: "50 123 4567",
    kz: "771 000 9998",
    by: "29 491-19-11",
    custom: "1 202-555-0135"
};
let input = document.querySelector('#phone');
let intlTelInput;

input.addEventListener("countrychange", function () {
    input.placeholder = countryMap[intlTelInput.getSelectedCountryData().iso2];
});


document.addEventListener('DOMContentLoaded', function () {
    window.intlTelInputGlobals.getCountryData().push({
        name: "Нет в списке",
        iso2: "custom",
        dialCode: "",
        priority: 0,
        areaCodes: null
    });
    intlTelInput = window.intlTelInput(input, {
        onlyCountries: ['ru', 'ua', 'kz', 'by', 'custom'],
        initialCountry: 'ru',
        separateDialCode: true
    });
});


document.querySelector("#main-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    document.querySelector('main').style.cssText = "animation:blur;animation-duration:0.6s;animation-fill-mode:both";
    document.querySelector('footer').style.cssText = document.querySelector('main').style.cssText;
    setTimeout(function () {
        document.querySelector('#block-ui').style.display = "block";
    }, 600);

    let formData = new FormData(document.querySelector('#main-form'));
    formData.append('phone_code', intlTelInput.getSelectedCountryData().dialCode);

    let response = await fetch("/attack/start", {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        console.log(await response.text());
    }

    setTimeout(function () {
        document.querySelector('#block-ui').style.display = "none";
    }, 600);
    document.querySelector('main').style.cssText = "animation:blur;animation-duration:0.6s;animation-fill-mode:both;animation-direction:reverse";
    document.querySelector('footer').style.cssText = document.querySelector('main').style.cssText;
});