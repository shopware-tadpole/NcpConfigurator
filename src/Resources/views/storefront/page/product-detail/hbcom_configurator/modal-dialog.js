function onConfigureClick() {
    initialize();
}

function newConfiguration() {
    $('#configuratorModal').modal('toggle');
    initialize();
}

function initialize() {
    window.location.hash = '#tab-pane-dimension';
    hashTriggerTab();

    disableClick("tab-dimension", false);

    let elProjectGroup = document.getElementById('ProjectGroup');
    let attrProjectGroupName = elProjectGroup.getAttribute("data-name");

    disableClick("tab-dimension", true);
    disableClick("tab-summary", true);

    // reset radio button selections
    let elConfiguratorModal = document.querySelector(".configurator-form");
    let elConfiguratorModalChildren = elConfiguratorModal.querySelectorAll("input");
    elConfiguratorModalChildren.forEach((el) => {
        if (el.type === 'radio') {
            el.checked = false;
            el.setAttribute("checked", "false");
        } else if (el.type === 'range') {
            el.value = el.getAttribute("min");
        } else if (el.type === 'number') {
            el.value = el.getAttribute("min");
        }
    })

    // set basePrice in the header on initialization
    let headerBase = document.querySelector('.configurator-header-price');
    let basePrice = headerBase.getAttribute('data-base-price');
    headerBase.innerHTML = basePrice;
}

function disableClick(id, disabled) {
    let el = document.getElementById(id);
    if (el) {
        if (disabled) {
            el.classList.add("disabled");
        } else {
            el.classList.remove("disabled");
        }
    } else {
        console.error("Error: id " + id + " not found!");
    }
}

//
function checkPlausibilityAndCalculatePrice() {
    // Final price calculation of the product based on selected configuration settings

    console.log("> Product");
    let elProduct = document.getElementById('Product');
    let attrProductName = elProduct.getAttribute("data-Productname");
    console.log("attrProductName: " + attrProductName);
    let attrProductID = elProduct.getAttribute("data-id");
    console.log("attrProductID: " + attrProductID);
    let elPrice = elProduct.getAttribute("data-price");
    let price = parseFloat(elPrice)
    console.log("price: " + price);

    console.log("> ProjectGroup");
    let elProjectGroup = document.getElementById('ProjectGroup');
    // let attrProjectGroupInfo = elProjectGroup.getAttribute("data-info");
    let attrProjectGroupName = elProjectGroup.getAttribute("data-name");
    console.log("attrProjectGroupName: " + attrProjectGroupName);

    let ProjectGroupDimensionen_numeric = {};
    const elProjectGroupDimensionen = document.getElementsByClassName("dimension");
    Array.from(elProjectGroupDimensionen).forEach((element) => {
        console.log("class .dimension: " + element.id + ": " + element.value);
        ProjectGroupDimensionen_numeric[element.id] = element.value;
    });
    
    console.log("> Dimensionen");
    let dimension_numeric = {};
    const eldimension = document.getElementsByClassName("dimension");
    Array.from(eldimension).forEach((element) => {
        console.log("dimension." + element.id + ": " + element.value);
        dimension_numeric[element.id] = element.value;
    });

    let totalArea = 0;
    if (attrProjectGroupName.includes("windowGrid")) {
        let elDimension_Width = document.getElementById("Width");
        let elDimension_Height = document.getElementById("Height");
        totalArea = parseFloat(elDimension_Width.value) * parseFloat(elDimension_Height.value);
    }

    totalArea /= 1000000;    // 1 qm = 1000mm x 1000m = 1000000 mm

    let ProductPrice = price;
    if (attrProjectGroupName.includes("windowGrid")) {
        let totalAreaSwell = 0.7;
        if (totalArea > totalAreaSwell) {
            let totalAreaDelta = 0.1;
            let totalAreaRounded = Math.round((totalArea + 0.5 * totalAreaDelta) / totalAreaDelta) * totalAreaDelta;
            let totalAreaFactor = (totalAreaRounded - totalAreaSwell) / totalAreaDelta;
            let baseArea = totalAreaSwell;
            let price100Procent = price / baseArea; // Price for each 1 m²
            ProductPrice = price100Procent * totalAreaRounded;

            console.log(
                "totalArea: " + totalArea,
                ", totalAreaDelta: " + totalAreaDelta,
                ", totalAreaRounded: " + totalAreaRounded,
                ", totalAreaFactor: " + totalAreaFactor,
                ", price: " + price,
                ", price100Procent: " + price100Procent,
                ", ProductPrice: " + ProductPrice);
        }
    } else {
        console.error('ProjectGroup unknown!')
        return;
    }

    // commercial rounding
    ProductPrice = Math.round(ProductPrice * 100) / 100;

    console.log("> Total: " + ProductPrice.toString());
    let elSubmitTotal = document.getElementById('submitTotal');
    let elSubmitTotalInfo = document.querySelector('span[data-input-el="submitTotal"]');

    let ProductPriceCalcFormatiert = Number(ProductPrice).toFixed(2);
    let ProductPriceFormatiert = Number(ProductPrice).toLocaleString('de-DE', {minimumFractionDigits: 2})
    elSubmitTotal.value = ProductPriceCalcFormatiert;
    elSubmitTotalInfo.innerHTML = ProductPriceFormatiert;

    let elConfiguratorHeaderPrice = document.querySelector(".configurator-header-price");
    elConfiguratorHeaderPrice.innerHTML = "€" + ProductPrice.toString();    // todo: Währung aus dem Product holen

    // console.log("> Media");
    // let elMedia = document.getElementById('configuratorHeaderInfo');
    // let attrMediaMedia = elMedia.getAttribute("data-media");
    // let mediaMedia = JSON.parse(attrMediaMedia);

    // Transfer data to the form fields
    let elSubmitProjectGroup = document.getElementById('submitProjectGroup')
    elSubmitProjectGroup.value = attrProjectGroupName;

    console.log("SUBMIT FIELDS");

    let elConfiguratorSummaryDimensions = document.querySelectorAll(".configurator-summary-dimension");
    elConfiguratorSummaryDimensions.forEach((elConfiguratorSummaryDimension) => {
        elConfiguratorSummaryDimension.style.display = "none";
    })

    Array.from(eldimension).forEach((element) => {
        console.log("id: " + element.id + " / value: " + element.value);

        let elConfiguratorSummaryDimension = document.getElementById("configurator-summary-dimension-" + element.id);
        elConfiguratorSummaryDimension.style.display = "";

        let idSubmit = "submitDimension_" + element.id;
        let elSubmit = document.getElementById(idSubmit);
        let elInfoVal = document.querySelector('span[data-input-el="' + idSubmit + '"]');
        if (elSubmit) {
            elSubmit.value = element.value;
            elInfoVal.innerHTML = element.value;
        } else {
            console.error("Error: idSubmitElement " + idSubmit + " not found!");
        }
    });
}

/**
 * NAV Tab Control
 * Example: <a href='#tab-pane-Dimensions'>edit</a>
 */
window.onhashchange = hashTriggerTab;
window.onload = hashTriggerTab;
window.location.hash = '#tab-pane-dimension'; // Focus first tab
function hashTriggerTab() {
    let current_hash = window.location.hash;
    if (current_hash.substring(0, 1) === '#') current_hash = current_hash.substring(1);
    if (current_hash !== '') {
        let trigger = document.querySelector('.nav-tabs a[href="#' + current_hash + '"]');
        if (trigger) trigger.click();
    }
}

function gotoTab(id) {
    window.location.hash = '#' + id;
    hashTriggerTab();
}

// Input Dimension with slider
function onChangeInput(id) {
    let input = document.getElementById(id);
    let sliderTargetId = input.getAttribute('data-slider-target');
    let sliderTarget = document.getElementById(sliderTargetId);
    sliderTarget.value = parseFloat(input.value);
    input.parentElement.classList.add('active');
    console.log(input.value);
    checkPlausibilityAndCalculatePrice();
}

function setConfiguratedQuantity(element) {
    let selectedVal = element.value;
    let configuratedQuantity = document.getElementById('configuratedQuantity');
    configuratedQuantity.value = selectedVal;
}
