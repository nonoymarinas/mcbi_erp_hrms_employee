
async function editableEmployeeDetails(data) {
    //fetch view for display
    const jsSublayout01ContentSubCont = document.querySelector('.jsSublayout01ContentSubCont');
    const view = await fetchData.viewData('single-employee-display-view');
    const jsEmployeeDetailsMainCont = view.querySelector('.jsEmployeeDetailsMainCont');
    jsSublayout01ContentSubCont.innerHTML = '';
    jsSublayout01ContentSubCont.appendChild(jsEmployeeDetailsMainCont);

    populatePersonalInfo(data)

    populateBenifits(data)

    populateContacts(data)

    await populateAddress(data)

    populateJobDescription(data)

    populateCompensation(data)

    await employeeDetailsFunctions(data)
}

function populatePersonalInfo(data) {
    //first name
    const firstName = document.querySelector('.jsPerInfoFirstName');
    firstName.value = data.personalInfo.firstName;

    //middle name
    const middleName = document.querySelector('.jsPerInfoMiddleName');
    middleName.value = data.personalInfo.middleName;

    //last name
    const lastName = document.querySelector('.jsPerInfoLastName');
    lastName.value = data.personalInfo.lastName;

    //date of birth
    const dateOfBirth = document.querySelector('.jsPerInfoDateOfBirth')
    dateOfBirth.value = data.personalInfo.dateOfBirth

    //gender
    const gender = document.querySelector('.jsCustomSelectInputGender');
    gender.value = data.personalInfo.gender;
    gender.setAttribute('data-id', data.personalInfo.gender);
}

function populateBenifits(data) {
    //sss number
    const sssNumber = document.querySelector('.jsBenifitsSssNo')
    sssNumber.value = data.benifits.sssNumber

    //philhealth number
    const philhealthNumber = document.querySelector('.jsBenifitsPhilHealthNo')
    philhealthNumber.value = data.benifits.philHealthNumber

    //pagibig number
    const pagibigNumber = document.querySelector('.jsBenifitsPagIbigNo')
    pagibigNumber.value = data.benifits.pagIbigNumber

    //tin number
    const tinNumber = document.querySelector('.jsBenifitsTinNo')
    tinNumber.value = data.benifits.tinNumber
}

function populateContacts(data) {
    //mobile number
    const mobileNumber = document.querySelector('.jsContactsMobileNo');
    mobileNumber.value = data.contacts.mobileNumber

    //landline number
    const landlineNumber = document.querySelector('.jsContactsLandlineNo');
    landlineNumber.value = data.contacts.landLineNumber

    //email add
    const emailAddress = document.querySelector('.jsContactsEmailAdd');
    emailAddress.value = data.contacts.emailAddress;
}

async function populateAddress(data) {

    if (data.employeeAddressCountry != null) {
        //set country id attr, this will be use to determine the edit mode at preceeeding function
        document.querySelector('.jsCustomSelectInputCountry').setAttribute('data-id', data.employeeAddressCountry.countryID)

        const jsEmpDetSubAddressTypeCont = document.querySelector('.jsEmpDetSubAddressTypeCont');
        jsEmpDetSubAddressTypeCont.innerHTML = '';
        if (data.employeeAddressCountry.countryID == 1) {//meaning it is phillippines
            const view = await fetchData.viewData('philippine-address-view');
            const jsEmpDetSubPhilAddressCont = view.querySelector('.jsEmpDetSubPhilAddressCont');
            jsEmpDetSubAddressTypeCont.appendChild(jsEmpDetSubPhilAddressCont);

        } else {
            htmlString = `<div class="emp-det-sub-phil-address-cont jsEmpDetSubForeignAddressCont">
                                <div class="emp-det-address-sub-ind-cont jsEmpDetIndCont">
                                    <label class="emp-det-label">Complete Address:</label>
                                    <textarea name="CompleteAddress" class="emp-det-ind-item-input jsInput jsInputAddressComplete"></textarea>
                                </div>
                            </div>`;

            const jsEmpDetSubForeignAddressCont = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsEmpDetSubForeignAddressCont');
            jsEmpDetSubAddressTypeCont.appendChild(jsEmpDetSubForeignAddressCont);

        }

    }

    //postal addres
    if (data.employeeAddressCountry != null) {
        if (data.employeeAddressCountry.countryID == 1) {
            populatePhilAddressCountry()
        } else {
            populateForeignAddressCountry()
        }
    }

    function populatePhilAddressCountry() {
        //country
        const jsCustomSelectInputCountry = document.querySelector('.jsCustomSelectInputCountry');
        jsCustomSelectInputCountry.value = data.employeeAddressCountry.countryName;
        jsCustomSelectInputCountry.setAttribute('data-id', data.employeeAddressCountry.countryID)

        //region
        const jsCustomSelectInputRegion = document.querySelector('.jsCustomSelectInputRegion');
        jsCustomSelectInputRegion.value = data.philippineAddress.regionName;
        jsCustomSelectInputRegion.setAttribute('data-id', data.philippineAddress.regionID)
        jsCustomSelectInputRegion.setAttribute('data-topid', data.philippineAddress.countryID)

        //province
        const jsCustomSelectInputProvince = document.querySelector('.jsCustomSelectInputProvince');
        jsCustomSelectInputProvince.value = data.philippineAddress.provinceName;
        jsCustomSelectInputProvince.setAttribute('data-id', data.philippineAddress.provinceID)
        jsCustomSelectInputProvince.setAttribute('data-topid', data.philippineAddress.regionID)

        //city
        const jsCustomSelectInputCity = document.querySelector('.jsCustomSelectInputCity');
        jsCustomSelectInputCity.value = data.philippineAddress.cityOrMunicipalName;
        jsCustomSelectInputCity.setAttribute('data-id', data.philippineAddress.cityOrMunicipalityID)
        jsCustomSelectInputCity.setAttribute('data-topid', data.philippineAddress.provinceID)

        //barangay
        const jsCustomSelectInputBarangay = document.querySelector('.jsCustomSelectInputBarangay');
        jsCustomSelectInputBarangay.value = data.philippineAddress.barangayName;
        jsCustomSelectInputBarangay.setAttribute('data-id', data.philippineAddress.barangayID)
        jsCustomSelectInputBarangay.setAttribute('data-topid', data.philippineAddress.cityOrMunicipalityID)

        //line1
        const jsInputAddressLine1 = document.querySelector('.jsInputAddressLine1');
        jsInputAddressLine1.value = data.philippineAddress.addressLine1;

        //line2
        const jsInputAddressLine2 = document.querySelector('.jsInputAddressLine2');
        jsInputAddressLine2.value = data.philippineAddress.addressLine2;
    }

    function populateForeignAddressCountry() {
        //country
        const jsCustomSelectInputCountry = document.querySelector('.jsCustomSelectInputCountry');
        jsCustomSelectInputCountry.value = data.employeeAddressCountry.countryName;
        jsCustomSelectInputCountry.setAttribute('data-id', data.employeeAddressCountry.countryID)

        //complete address
        const jsInputAddressComplete = document.querySelector('.jsInputAddressComplete');
        jsInputAddressComplete.value = data.foreignAddress.foreignCompleteAddress;
    }
}

function populateJobDescription(data) {

    if (data.jobDescription.positionID == null) {
        const jsCustomSelectInputPosition = document.querySelector('.jsCustomSelectInputPosition');
        jsCustomSelectInputPosition.value = '';
    } else {
        const jsCustomSelectInputPosition = document.querySelector('.jsCustomSelectInputPosition');
        jsCustomSelectInputPosition.value = data.jobDescription.positionName;
        jsCustomSelectInputPosition.setAttribute('data-id', data.jobDescription.positionID);
    }


    if (data.jobDescription.departmentID == null) {
        const jsCustomSelectInputDepartment = document.querySelector('.jsCustomSelectInputDepartment');
        jsCustomSelectInputDepartment.value = '';
    } else {
        const jsCustomSelectInputDepartment = document.querySelector('.jsCustomSelectInputDepartment');
        jsCustomSelectInputDepartment.value = data.jobDescription.departmentName;
        jsCustomSelectInputDepartment.setAttribute('data-id', data.jobDescription.departmentID);
    }

    if (data.jobDescription.remarks == null) {
        const jsInputRemarks = document.querySelector('.jsInputRemarks');
        jsInputRemarks.value = '';
    } else {
        const jsInputRemarks = document.querySelector('.jsInputRemarks');
        jsInputRemarks.value = data.jobDescription.remarks;
    }
}

function populateCompensation(data) {
    const jsCustomSelectInputRatePeriod = document.querySelector('.jsCustomSelectInputRatePeriod');
    jsCustomSelectInputRatePeriod.value = data.compensation.ratePeriod
    jsCustomSelectInputRatePeriod.setAttribute('data-id', data.compensation.ratePeriodID)

    const jsInputBasicSalary = document.querySelector('.jsInputBasicSalary');
    jsInputBasicSalary.value = data.compensation.basicSalary

    const jsInputAllowance = document.querySelector('.jsInputAllowance');
    jsInputAllowance.value = data.compensation.allowance

    const jsCustomSelectInputSalaryCondition = document.querySelector('.jsCustomSelectInputSalaryCondition');
    jsCustomSelectInputSalaryCondition.value = data.compensation.salaryCondition;
    jsCustomSelectInputSalaryCondition.setAttribute('data-id', data.compensation.salaryConditionID)
}


async function employeeDetailsFunctions(data) {
    //normal input - all edit buttons
    const jsEmpDetEditInputBtns = document.querySelectorAll('.jsEmpDetEditInputBtn');
    jsEmpDetEditInputBtns.forEach(item => {
        item.addEventListener('click', handleClickInputEditBtn)
    })

    //select input - all edit buttons
    const jsEmpDetEditSelectInputBtns = document.querySelectorAll('.jsEmpDetEditSelectInputBtn');
    jsEmpDetEditSelectInputBtns.forEach(item => {
        item.addEventListener('click', handleClickSelectInputEditBtn)
    })

    //pers info - cancel buttons
    const jsEmpDetPersInfoCancelBtn = document.querySelector('.jsEmpDetPersInfoCancelBtn');
    jsEmpDetPersInfoCancelBtn.addEventListener('click', handleClickPersInfoCancelBtn)


    //address - edit buttons 
    const jsEmpDetAddressEditBtn = document.querySelector('.jsEmpDetAddressEditBtn');
    jsEmpDetAddressEditBtn.addEventListener('click', handleClickAddressEditBtn);

    //address - cancel buttons 
    const jsEmpDetAddressCancelBtn = document.querySelector('.jsEmpDetAddressCancelBtn');
    jsEmpDetAddressCancelBtn.addEventListener('click', handleClickAddressCancelBtn);

    

    //common - disable all cancel buttons
    const jsCancelBtns = document.querySelectorAll('.jsCancelBtn');
    jsCancelBtns.forEach(button => {
        disableCancelButton(button)
    })

    //country address linkedlist
    let countryLinkedlist = new LinkedList(data.countryList[0])
    for (let i = 1; i < data.countryList.length; i++) {
        countryLinkedlist.push(data.countryList[i])
    }

    //region address linkedlist
    let allRegionLinkedlist = new LinkedList(data.regionList[0])
    for (let i = 1; i < data.regionList.length; i++) {
        allRegionLinkedlist.push(data.regionList[i])
    }
    let allRegionArr = allRegionLinkedlist.getAll()

    //province address linkedlist
    let selectedProvinceLinkedlist = null;
    let allProvinceLinkedlist = new LinkedList(data.provinceList[0])
    for (let i = 1; i < data.provinceList.length; i++) {
        allProvinceLinkedlist.push(data.provinceList[i])
    }

    //city address linkedlist
    let selectedCityLinkedlist = null;
    let allCityLinkedlist = new LinkedList(data.cityList[0])
    for (let i = 1; i < data.cityList.length; i++) {
        allCityLinkedlist.push(data.cityList[i])
    }

    //city address linkedlist
    let selectedBarangayLinkedlist = null;
    async function getSelectedBarangay(cityID) {
        let linkedlist = null
        const formData = new FormData()
        formData.append('cityID', cityID)

        const options = {
            method: 'POST',
            body: formData
        }
        const data = await fetchData.postData('address-list-barangay-by-city', options)
        if (data == null) return;

        linkedlist = new LinkedList(data.barangayList[0]);
        for (let i = 1; i < data.barangayList.length; i++) {
            linkedlist.push(data.barangayList[i]);
        }

        return linkedlist;
    }

    //cancel button functions
    function cancelAndRestorePersonalInfo(data) {

        //first name
        const jsPerInfoFirstName = document.querySelector('.jsPerInfoFirstName')
        jsPerInfoFirstName.value = data.personalInfo.firstName

        //middle name
        const jsPerInfoMiddleName = document.querySelector('.jsPerInfoMiddleName')
        jsPerInfoMiddleName.value = data.personalInfo.middleName

        //last name
        const jsPerInfoLastName = document.querySelector('.jsPerInfoLastName')
        jsPerInfoLastName.value = data.personalInfo.lastName

        //date of birth
        const jsPerInfoDateOfBirth = document.querySelector('.jsPerInfoDateOfBirth')
        jsPerInfoDateOfBirth.value = data.personalInfo.dateOfBirth

        //gender
        const jsCustomSelectInputGender = document.querySelector('.jsCustomSelectInputGender')
        jsCustomSelectInputGender.value = data.personalInfo.gender
        jsCustomSelectInputGender.setAttribute('data-id', data.personalInfo.genderID)

        //disable gender
        const jsAllEmpCustomSelectMainContGender = document.querySelector('.jsAllEmpCustomSelectMainContGender');
        disableCustomSelectInput(jsAllEmpCustomSelectMainContGender)

        //disable all select save button
        const jsEmpDetEditSelectInputBtn = document.querySelector('.jsEmpDetEditSelectInputBtn')
        jsEmpDetEditSelectInputBtn.textContent = 'edit';
        jsEmpDetEditSelectInputBtn.classList.remove('btn-text-color-red');
        jsEmpDetEditSelectInputBtn.removeEventListener('click', handleClickSelectInputSaveBtn);
        jsEmpDetEditSelectInputBtn.addEventListener('click', handleClickSelectInputEditBtn);

        //disable all input
        const jsInputPersInfos = document.querySelectorAll('.jsInputPersInfo')
        jsInputPersInfos.forEach(input => {
            input.setAttribute('disabled', true);
            input.classList.remove('input-enable');
        })

        const jsPersInfoInputEditSaveBtns = document.querySelectorAll('.jsPersInfoInputEditSaveBtn');
        jsPersInfoInputEditSaveBtns.forEach(button => {
            button.textContent = 'edit';
            button.classList.remove('btn-text-color-red');
            button.removeEventListener('click', handleClickInputSaveBtn);
            button.addEventListener('click', handleClickInputEditBtn);
        })

        
        //disable cancel button
        const jsEmpDetPersInfoCancelBtn = document.querySelector('.jsEmpDetPersInfoCancelBtn')
        disableCancelButton(jsEmpDetPersInfoCancelBtn)
    }

    function cancelAndRestoreBenifits(data) {
        //sss number
        const jsBenifitsSssNo = document.querySelector('.jsBenifitsSssNo')
        jsBenifitsSssNo.value = data.benifits.sssNumber

        //philhealth number
        const jsBenifitsPhilHealthNo = document.querySelector('.jsBenifitsPhilHealthNo')
        jsBenifitsPhilHealthNo.value = data.benifits.philHealthNumber

        //pagibig number
        const jsBenifitsPagIbigNo = document.querySelector('.jsBenifitsPagIbigNo')
        jsBenifitsPagIbigNo.value = data.benifits.pagIbigNumber

        //tin number
        const jsBenifitsTinNo = document.querySelector('.jsBenifitsTinNo')
        jsBenifitsTinNo.value = data.benifits.tinNumber

        //disable all input
        const jsBenifitsInputs = document.querySelectorAll('.jsBenifitsInput')
        jsBenifitsInputs.forEach(input => {
            input.setAttribute('disabled', true);
            input.classList.remove('input-enable');
        })

        //disable all edit buttons
        const jsBenifitsBtns = document.querySelectorAll('.jsBenifitsBtn');
        jsBenifitsBtns.forEach(button => {
            button.textContent = 'edit';
            button.classList.remove('btn-text-color-red');
            button.removeEventListener('click', handleClickInputSaveBtn);
            button.addEventListener('click', handleClickInputEditBtn);
        })

        //disable cancel button
        const jsBenifitsCancelBtn = document.querySelector('.jsBenifitsCancelBtn')
        disableCancelButton(jsBenifitsCancelBtn)
    }

    function cancelAndRestoreContacts(data) {
        //mobile number
        const jsContactsMobileNo = document.querySelector('.jsContactsMobileNo')
        jsContactsMobileNo.value = data.contacts.mobileNumber

        //landline number
        const jsContactsLandlineNo = document.querySelector('.jsContactsLandlineNo')
        jsContactsLandlineNo.value = data.contacts.landLineNumber

        //landline number
        const jsContactsEmailAdd = document.querySelector('.jsContactsEmailAdd')
        jsContactsEmailAdd.value = data.contacts.emailAddress

        //disable all input
        const jsContactsInputs = document.querySelectorAll('.jsContactsInput')
        jsContactsInputs.forEach(input => {
            input.setAttribute('disabled', true);
            input.classList.remove('input-enable');
        })

        //disable all edit buttons
        const jsContactsEditBtns = document.querySelectorAll('.jsContactsEditBtn');
        jsContactsEditBtns.forEach(button => {
            button.textContent = 'edit';
            button.classList.remove('btn-text-color-red');
            button.removeEventListener('click', handleClickInputSaveBtn);
            button.addEventListener('click', handleClickInputEditBtn);
        })

        //disable cancel button
        const jsContactsCancelBtn = document.querySelector('.jsContactsCancelBtn')
        disableCancelButton(jsContactsCancelBtn)
    }

    async function cancelAndRestoreAddress(data) {
        await populateAddress(data)
        disableAddressEditMode()
    }

    function cancelAndRestoreJobDescription(data) {
        //position
        const jsCustomSelectInputPosition = document.querySelector('.jsCustomSelectInputPosition')
        jsCustomSelectInputPosition.value = data.jobDescription.positionName
        jsCustomSelectInputPosition.setAttribute('data-id', data.jobDescription.positionID)

        //disable position
        const jsAllEmpCustomSelectMainContPosition = document.querySelector('.jsAllEmpCustomSelectMainContPosition');
        disableCustomSelectInput(jsAllEmpCustomSelectMainContPosition)

        //department
        const jsCustomSelectInputDepartment = document.querySelector('.jsCustomSelectInputDepartment')
        jsCustomSelectInputDepartment.value = data.jobDescription.departmentName
        jsCustomSelectInputDepartment.setAttribute('data-id', data.jobDescription.departmentID)

        //disable position
        const jsAllEmpCustomSelectMainContDepartment = document.querySelector('.jsAllEmpCustomSelectMainContDepartment');
        disableCustomSelectInput(jsAllEmpCustomSelectMainContDepartment)

        //disable all edit buttons for ordinary inputs
        const jsJobDescriptionInputEditBtns = document.querySelectorAll('.jsJobDescriptionInputEditBtn');
        jsJobDescriptionInputEditBtns.forEach(button => {
            button.textContent = 'edit';
            button.classList.remove('btn-text-color-red');
            button.removeEventListener('click', handleClickInputSaveBtn);
            button.addEventListener('click', handleClickInputEditBtn);
        })

        //disable all edit buttons for select inputs
        const jsJobDescriptionSelectInputEditBtns = document.querySelectorAll('.jsJobDescriptionSelectInputEditBtn');
        jsJobDescriptionSelectInputEditBtns.forEach(button => {
            button.textContent = 'edit';
            button.classList.remove('btn-text-color-red');
            button.removeEventListener('click', handleClickSelectInputSaveBtn);
            button.addEventListener('click', handleClickSelectInputEditBtn);
        })

        //disable all input
        const jsInputJobDescriptions = document.querySelectorAll('.jsInputJobDescription')
        jsInputJobDescriptions.forEach(input => {
            input.setAttribute('disabled', true);
            input.classList.remove('input-enable');
        })

        //disable select input
        const jsAllEmpCustomSelectMainContJobDescs = document.querySelectorAll('.jsAllEmpCustomSelectMainContJobDesc');
        jsAllEmpCustomSelectMainContJobDescs.forEach(item => {
            disableCustomSelectInput(item)
        })
        

        //disable cancel button
        const jsJobDescriptionCancelBtn = document.querySelector('.jsJobDescriptionCancelBtn')
        disableCancelButton(jsJobDescriptionCancelBtn)
    }

    function cancelAndRestoreCompensation(data) {

    }

    function handleClickPersInfoCancelBtn() {
        cancelAndRestorePersonalInfo(data)
    }

    function handleClickBenifitsCancelBtn() {
        cancelAndRestoreBenifits(data)
    }

    function handleClickContactsCancelBtn() {
        cancelAndRestoreContacts(data)
    }

    async function handleClickAddressCancelBtn() {
        cancelAndRestoreAddress(data)
    }

    function handleClickJobDescriptionCancelBtn() {
        cancelAndRestoreJobDescription(data)
    }

    function handleClickCompensationCancelBtn() {
        cancelAndRestoreContacts(data)
    }

    function disableCancelButton(button) {
        if (button.getAttribute('name') == 'persinfo') {
            button.classList.add('disable-cancel-button')
            button.removeEventListener('click', handleClickPersInfoCancelBtn)
        } else if (button.getAttribute('name') == 'benifit') {
            button.classList.add('disable-cancel-button')
            button.removeEventListener('click', handleClickBenifitsCancelBtn)
        } else if (button.getAttribute('name') == 'contact') {
            button.classList.add('disable-cancel-button')
            button.removeEventListener('click', handleClickContactsCancelBtn)
        } else if (button.getAttribute('name') == 'address') {
            button.classList.add('disable-cancel-button')
            button.removeEventListener('click', handleClickAddressCancelBtn)
        } else if (button.getAttribute('name') == 'jobdescription') {
            button.classList.add('disable-cancel-button')
            button.removeEventListener('click', handleClickJobDescriptionCancelBtn)
        } else if (button.getAttribute('name') == 'compensation') {
            button.classList.add('disable-cancel-button')
            button.removeEventListener('click', handleClickCompensationCancelBtn)
        }

    }

    function enableCancelButton(button) {
        if (button.getAttribute('name') == 'persinfo') {
            button.classList.remove('disable-cancel-button')
            button.addEventListener('click', handleClickPersInfoCancelBtn)
        } else if (button.getAttribute('name') == 'benifit') {
            button.classList.remove('disable-cancel-button')
            button.addEventListener('click', handleClickBenifitsCancelBtn)
        } else if (button.getAttribute('name') == 'contact') {
            button.classList.remove('disable-cancel-button')
            button.addEventListener('click', handleClickContactsCancelBtn)
        } else if (button.getAttribute('name') == 'address') {
            button.classList.remove('disable-cancel-button')
            button.addEventListener('click', handleClickAddressCancelBtn)
        } else if (button.getAttribute('name') == 'jobdescription') {
            button.classList.remove('disable-cancel-button')
            button.addEventListener('click', handleClickJobDescriptionCancelBtn)
        } else if (button.getAttribute('name') == 'compensation') {
            button.classList.remove('disable-cancel-button')
            button.addEventListener('click', handleClickCompensationCancelBtn)
        }

    }



    function disableCustomSelectInput(item) {
        //disable input
        const input = item.querySelector('.jsCustomSelectInput');
        input.setAttribute('disabled', true);
        item.classList.remove('input-enable');

        //disable hover effect
        const arrowCont = item.querySelector('.jsCutomSelectArrowCont');
        arrowCont.classList.add('arrow-cont-disabled')

        //disable arrow color
        const arrow = item.querySelector('svg');
        arrow.classList.add('arrow-disabled');

    }

    async function handleClickSelectInputSaveBtn(e) {
        const input = e.target.closest('.jsEmpDetIndCont').querySelector('.jsInput');
        //perform save operation
        const formData = new FormData();
        const value = input.value;
        const name = input.getAttribute('name');
        formData.append('MasterPersonID', data.personalInfo.masterPersonID)
        formData.append('Name', name);
        formData.append('Value', value);

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        const options = {
            method: 'POST',
            body: formData
        }

        const updateReturnData = await fetchData.postData('update-employee-info', options)

        console.log(updateReturnData);

        //change apperance here
        const jsEmpDetIndCont = e.target.closest('.jsEmpDetIndCont').querySelector('.jsAllEmpCustomSelectMainCont');
        disableCustomSelectInput(jsEmpDetIndCont)

        e.target.textContent = 'edit';
        e.target.classList.remove('btn-text-color-red');
        e.target.removeEventListener('click', handleClickSelectInputSaveBtn);
        e.target.addEventListener('click', handleClickSelectInputEditBtn);
    }

    function handleClickSelectInputEditBtn(e) {
        const jsEmpDetIndCont = e.target.closest('.jsEmpDetIndCont').querySelector('.jsAllEmpCustomSelectMainCont');

        enableCustomSelectInput(jsEmpDetIndCont)

        e.target.textContent = 'save';
        e.target.classList.add('btn-text-color-red');
        e.target.removeEventListener('click', handleClickSelectInputEditBtn);
        e.target.addEventListener('click', handleClickSelectInputSaveBtn);
    }

    function handleClickInputEditBtn(e) {
        const input = e.target.closest('.jsEmpDetIndCont').querySelector('.jsInput');
        input.removeAttribute('disabled');
        input.classList.add('input-enable');
        e.target.textContent = 'save';
        e.target.classList.add('btn-text-color-red');
        e.target.removeEventListener('click', handleClickInputEditBtn);
        e.target.addEventListener('click', handleClickInputSaveBtn);

        //enable cancel button
        const jsCancelBtn = e.target.closest('.jsEmpDetSubMainCont').querySelector('.jsCancelBtn')
        enableCancelButton(jsCancelBtn)
    }

    async function handleClickInputSaveBtn(e) {
        const input = e.target.closest('.jsEmpDetIndCont').querySelector('.jsInput');
        //perform save operation
        const formData = new FormData();
        const value = input.value;
        const name = input.getAttribute('name');
        formData.append('MasterPersonID', data.personalInfo.masterPersonID)
        formData.append('Name', name);
        formData.append('Value', value);

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        const options = {
            method: 'POST',
            body: formData
        }

        const updateReturnData = await fetchData.postData('update-employee-info', options)

        console.log(updateReturnData);

        //change apperance here
        input.setAttribute('disabled', true);
        input.classList.remove('input-enable');

        e.target.textContent = 'edit';
        e.target.classList.remove('btn-text-color-red');
        e.target.removeEventListener('click', handleClickInputSaveBtn);
        e.target.addEventListener('click', handleClickInputEditBtn);
    }

   

    
    //address function
    function handleClickAddressEditBtn(e) {
        enableAddressEditMode()
    }

    function handleClickAddressSaveBtn(e) {
        disableAddressEditMode()
    }

    function enableAddressEditMode() {
        const countryID = document.querySelector('.jsCustomSelectInputCountry').getAttribute('data-id');
        const countryInputCont = document.querySelector('.jsAllEmpCustomSelectInputArrowContCountry');
        enableCustomSelectInput(countryInputCont)

        //inputs address country
        let jsCustomSelectInputCountry = document.querySelector('.jsCustomSelectInputCountry');
        jsCustomSelectInputCountry.addEventListener('input', handleInputAddressCountry)

        //select arrow country
        const jsCutomSelectArrowContCountry = document.querySelector('.jsCutomSelectArrowContCountry');
        jsCutomSelectArrowContCountry.addEventListener('click', handleClickInputArrowCountry)

        //enable cancel btn
        const jsEmpDetAddressCancelBtn = document.querySelector('.jsEmpDetAddressCancelBtn');
        //jsEmpDetAddressCancelBtn.addEventListener('click', handleClickAddressCancelBtn);
        //jsEmpDetAddressCancelBtn.classList.remove('disbale-cancel-btn');
        enableCancelButton(jsEmpDetAddressCancelBtn)

        //change button
        const jsEmpDetAddressEditBtn = document.querySelector('.jsEmpDetAddressEditBtn');
        jsEmpDetAddressEditBtn.textContent = 'Save';
        jsEmpDetAddressEditBtn.classList.add('btn-text-color-red');
        jsEmpDetAddressEditBtn.removeEventListener('click', handleClickAddressEditBtn);
        jsEmpDetAddressEditBtn.addEventListener('click', handleClickAddressSaveBtn);

        if (countryID == null) return

        if (countryID == 1) {
            philippineEnableAddressEditMode()
        } else {
            foreignEnableAddressEditMode()
        }
    }

    function philippineEnableAddressEditMode() {
        //enable custom selection
        const jsAllEmpCustomSelectInputArrowConts = document.querySelectorAll('.jsAllEmpCustomSelectInputArrowContAddress');
        jsAllEmpCustomSelectInputArrowConts.forEach(item => {
            enableCustomSelectInput(item)
        })

        //enable line1
        const jsInputAddressLine1 = document.querySelector('.jsInputAddressLine1')
        jsInputAddressLine1.classList.add('input-enable');
        jsInputAddressLine1.removeAttribute('disabled');

        //enable line2
        const jsInputAddressLine2 = document.querySelector('.jsInputAddressLine2')
        jsInputAddressLine2.classList.add('input-enable');
        jsInputAddressLine2.removeAttribute('disabled');


        //inputs address region
        const jsCustomSelectInputRegion = document.querySelector('.jsCustomSelectInputRegion');
        jsCustomSelectInputRegion.addEventListener('input', handleInputAddressRegion)

        //inputs address province
        const jsCustomSelectInputProvince = document.querySelector('.jsCustomSelectInputProvince');
        jsCustomSelectInputProvince.addEventListener('input', handleInputAddressProvince)

        //inputs address city
        const jsCustomSelectInputCity = document.querySelector('.jsCustomSelectInputCity');
        jsCustomSelectInputCity.addEventListener('input', handleInputAddressCity)


        //select arrow region
        const jsCutomSelectArrowContRegion = document.querySelector('.jsCutomSelectArrowContRegion');
        jsCutomSelectArrowContRegion.addEventListener('click', handleClickInputArrowRegion)

        //select arrow province
        const jsCutomSelectArrowContProvince = document.querySelector('.jsCutomSelectArrowContProvince');
        jsCutomSelectArrowContProvince.addEventListener('click', handleClickInputArrowProvince)

        //select arrow city
        const jsCutomSelectArrowContCity = document.querySelector('.jsCutomSelectArrowContCity');
        jsCutomSelectArrowContCity.addEventListener('click', handleClickInputArrowCity)

        //select arrow barangay
        const jsCutomSelectArrowContBarangay = document.querySelector('.jsCutomSelectArrowContBarangay');
        jsCutomSelectArrowContBarangay.addEventListener('click', handleClickInputArrowBarangay)


    }

    function foreignEnableAddressEditMode() {
        const jsInputAddressComplete = document.querySelector('.jsInputAddressComplete')
        console.log(jsInputAddressComplete)
        jsInputAddressComplete.classList.add('input-enable');
        jsInputAddressComplete.removeAttribute('disabled');
    }

    function disableAddressEditMode() {
        const countryID = document.querySelector('.jsCustomSelectInputCountry').getAttribute('data-id');
        const countryInputCont = document.querySelector('.jsAllEmpCustomSelectInputArrowContCountry');
        disableCustomSelectInput(countryInputCont)

        //close country open ul
        document.querySelector('.jsAllEmpAddressUlCountry').classList.add('display-none')

        //select arrow country
        const jsCutomSelectArrowContCountry = document.querySelector('.jsCutomSelectArrowContCountry');
        jsCutomSelectArrowContCountry.removeEventListener('click', handleClickInputArrowCountry)

        //change button
        const jsEmpDetAddressEditBtn = document.querySelector('.jsEmpDetAddressEditBtn');
        jsEmpDetAddressEditBtn.textContent = 'Edit';
        jsEmpDetAddressEditBtn.classList.remove('btn-text-color-red');
        jsEmpDetAddressEditBtn.removeEventListener('click', handleClickAddressSaveBtn);
        jsEmpDetAddressEditBtn.addEventListener('click', handleClickAddressEditBtn);

        //disable cancel btn
        const jsEmpDetAddressCancelBtn = document.querySelector('.jsEmpDetAddressCancelBtn');
        disableCancelButton(jsEmpDetAddressCancelBtn)

        if (countryID == null) return;

        if (countryID == 1) {
            philippineDisbaleAddressEditMode()
        } else {
            foreignDisableAddressEditMode()
        }
    }

    function philippineDisbaleAddressEditMode() {
        //disable custom select
        const jsAllEmpCustomSelectInputArrowConts = document.querySelectorAll('.jsAllEmpCustomSelectInputArrowCont');
        jsAllEmpCustomSelectInputArrowConts.forEach(item => {
            disableCustomSelectInput(item)
        })

        //hide selection
        const jsAllEmpAddressUls = document.querySelectorAll('.jsAllEmpAddressUl');
        jsAllEmpAddressUls.forEach(item => {
            item.classList.add('display-none')
        })

        //inputs address country
        const jsCustomSelectInputCountry = document.querySelector('.jsCustomSelectInputCountry');
        jsCustomSelectInputCountry.removeEventListener('input', handleInputAddressCountry)

        //inputs address region
        const jsCustomSelectInputRegion = document.querySelector('.jsCustomSelectInputRegion');
        jsCustomSelectInputRegion.removeEventListener('input', handleInputAddressRegion)

        //inputs address province
        const jsCustomSelectInputProvince = document.querySelector('.jsCustomSelectInputProvince');
        jsCustomSelectInputProvince.removeEventListener('input', handleInputAddressProvince)

        //inputs address city
        const jsCustomSelectInputCity = document.querySelector('.jsCustomSelectInputCity');
        jsCustomSelectInputCity.removeEventListener('input', handleInputAddressCity)


        //select arrow region
        const jsCutomSelectArrowContRegion = document.querySelector('.jsCutomSelectArrowContRegion');
        jsCutomSelectArrowContRegion.removeEventListener('click', handleClickInputArrowRegion)

        //select arrow province
        const jsCutomSelectArrowContProvince = document.querySelector('.jsCutomSelectArrowContProvince');
        jsCutomSelectArrowContProvince.removeEventListener('click', handleClickInputArrowProvince)

        //select arrow city
        const jsCutomSelectArrowContCity = document.querySelector('.jsCutomSelectArrowContCity');
        jsCutomSelectArrowContCity.removeEventListener('click', handleClickInputArrowCity)

        //select arrow barangay
        const jsCutomSelectArrowContBarangay = document.querySelector('.jsCutomSelectArrowContBarangay');
        jsCutomSelectArrowContBarangay.removeEventListener('click', handleClickInputArrowBarangay)


        //disable line1
        const jsInputAddressLine1 = document.querySelector('.jsInputAddressLine1')
        jsInputAddressLine1.classList.remove('input-enable');
        jsInputAddressLine1.setAttribute('disabled', true);

        //disable line2
        const jsInputAddressLine2 = document.querySelector('.jsInputAddressLine2')
        jsInputAddressLine2.classList.remove('input-enable');
        jsInputAddressLine2.setAttribute('disabled', true);


    }

    function foreignDisableAddressEditMode() {
        const jsInputAddressComplete = document.querySelector('.jsInputAddressComplete')
        jsInputAddressComplete.classList.remove('input-enable');
        jsInputAddressComplete.setAttribute('disabled', true);
    }

    function handleClickInputArrowCountry(e) {
        const countryID = document.querySelector('.jsCustomSelectInputCountry').getAttribute('data-id');
        //close other open ul
        if (countryID == 1) {
            document.querySelector('.jsAllEmpAddressUlRegion').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlProvince').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlCity').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlBarangay').classList.add('display-none')
        }
        const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
        ul.classList.toggle('display-none')
        ul.innerHTML = '';

        const allCountryArr = countryLinkedlist.getAll()

        if (allCountryArr.length > 0) {
            allCountryArr.forEach(item => {
                htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-id="${item.countryID}">${item.countryName}</li>`
                const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiCountry)
                ul.appendChild(jsAllEmpCustomSelectLi);
            })
        }
    }

    async function handleClickSelectLiCountry(e) {
        //hide selection dropdown
        const ul = document.querySelector('.jsAllEmpAddressUlCountry');
        ul.classList.add('display-none')

        //input
        const jsCustomSelectInputCountry = document.querySelector('.jsCustomSelectInputCountry');
        jsCustomSelectInputCountry.value = e.currentTarget.textContent;
        jsCustomSelectInputCountry.setAttribute('data-id', e.currentTarget.getAttribute('data-id'));

        const jsEmpDetSubAddressTypeCont = document.querySelector('.jsEmpDetSubAddressTypeCont');
        jsEmpDetSubAddressTypeCont.innerHTML = '';

        if (e.currentTarget.getAttribute('data-id') == 1) {
            const view = await fetchData.viewData('philippine-address-view');
            const jsEmpDetSubPhilAddressCont = view.querySelector('.jsEmpDetSubPhilAddressCont');
            jsEmpDetSubAddressTypeCont.appendChild(jsEmpDetSubPhilAddressCont);

            //turn into edit mode
            philippineEnableAddressEditMode()
        } else {
            htmlString = `<div class="emp-det-sub-phil-address-cont jsEmpDetSubPhilAddressCont">
                                <div class="emp-det-address-sub-ind-cont jsEmpDetIndCont">
                                    <label class="emp-det-label">Complete Address:</label>
                                    <textarea name="CompleteAddress" class="emp-det-ind-item-input jsInput jsInputAddressComplete"></textarea>
                                </div>
                            </div>`;

            const jsEmpDetSubPhilAddressCont = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsEmpDetSubPhilAddressCont');
            jsEmpDetSubAddressTypeCont.appendChild(jsEmpDetSubPhilAddressCont);

            //turn into edit mode
            foreignEnableAddressEditMode();
        }

    }


    //click arrow events
    function handleClickInputArrowRegion(e) {
        //close other open ul
        document.querySelector('.jsAllEmpAddressUlCountry').classList.add('display-none')
        document.querySelector('.jsAllEmpAddressUlProvince').classList.add('display-none')
        document.querySelector('.jsAllEmpAddressUlCity').classList.add('display-none')
        document.querySelector('.jsAllEmpAddressUlBarangay').classList.add('display-none')

        //empty and populate self ul dropdown
        const ul = document.querySelector('.jsAllEmpAddressUlRegion');
        ul.classList.toggle('display-none')
        ul.innerHTML = '';

        if (allRegionArr.length > 0) {
            allRegionArr.forEach(item => {
                htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-id="${item.regionID}">${item.regionName}</li>`
                const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiRegion)
                ul.appendChild(jsAllEmpCustomSelectLi);
            })
        }
    }

    function handleClickInputArrowProvince(e) {

        //get drowp down data
        const jsCustomSelectInputRegion = document.querySelector('.jsCustomSelectInputRegion')
        const regionID = jsCustomSelectInputRegion.getAttribute('data-id');
        let selectedProvinceArr = []
        data.provinceList.forEach(item => {
            if (item.regionID == regionID) {
                selectedProvinceArr.push(item)
            }
        })

        //update LinkedList
        selectedProvinceLinkedlist = new LinkedList(selectedProvinceArr[0])
        for (let i = 1; i < selectedProvinceArr.length; i++) {
            selectedProvinceLinkedlist.push(selectedProvinceArr[i])
        }

        //close other open ul
        document.querySelector('.jsAllEmpAddressUlCountry').classList.add('display-none')
        document.querySelector('.jsAllEmpAddressUlRegion').classList.add('display-none')
        document.querySelector('.jsAllEmpAddressUlCity').classList.add('display-none')
        document.querySelector('.jsAllEmpAddressUlBarangay').classList.add('display-none')

        //empty and populate ul dropdown
        const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
        ul.classList.toggle('display-none')
        ul.innerHTML = '';

        if (selectedProvinceArr.length > 0) {
            selectedProvinceArr.forEach(item => {
                htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-id="${item.provinceID}" data-topid="${item.regionID}" data-trigger="arrow">${item.provinceName}</li>`
                const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiProvince)
                ul.appendChild(jsAllEmpCustomSelectLi);
            })
        }
    }

    function handleClickInputArrowCity(e) {
        //get drowp down data
        const jsCustomSelectInputProvince = document.querySelector('.jsCustomSelectInputProvince')
        const provinceID = jsCustomSelectInputProvince.getAttribute('data-id');
        let selectedCityArr = []
        data.cityList.forEach(item => {
            if (item.provinceID == provinceID) {
                selectedCityArr.push(item)
            }
        })

        //update LinkedList
        selectedCityLinkedlist = new LinkedList(selectedCityArr[0])
        for (let i = 1; i < selectedCityArr.length; i++) {
            selectedCityLinkedlist.push(selectedCityArr[i])
        }

        //close other open ul
        document.querySelector('.jsAllEmpAddressUlCountry').classList.add('display-none')
        document.querySelector('.jsAllEmpAddressUlRegion').classList.add('display-none')
        document.querySelector('.jsAllEmpAddressUlProvince').classList.add('display-none')
        document.querySelector('.jsAllEmpAddressUlBarangay').classList.add('display-none')

        //empty and populate ul dropdown
        const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
        ul.classList.toggle('display-none')
        ul.innerHTML = '';

        if (selectedCityArr.length > 0) {
            selectedCityArr.forEach(item => {
                htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-topid="${item.provinceID}" data-id="${item.cityID}" data-trigger="arrow">${item.cityName}</li>`
                const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiCity)
                ul.appendChild(jsAllEmpCustomSelectLi);
            })
        }
    }

    async function handleClickInputArrowBarangay(e) {

        //get drowp down data
        const jsCustomSelectInputCity = document.querySelector('.jsCustomSelectInputCity')
        const cityID = jsCustomSelectInputCity.getAttribute('data-id');


        //close other open ul
        document.querySelector('.jsAllEmpAddressUlCountry').classList.add('display-none')
        document.querySelector('.jsAllEmpAddressUlRegion').classList.add('display-none')
        document.querySelector('.jsAllEmpAddressUlProvince').classList.add('display-none')

        //empty and populate ul dropdown
        const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
        ul.classList.toggle('display-none')
        ul.innerHTML = '';

        if (selectedBarangayLinkedlist == null) {
            if (cityID != 'undefined' || cityID != null) {
                selectedBarangayLinkedlist = await getSelectedBarangay(cityID)
            }
        }

        let barangayArr = [];
        if (selectedBarangayLinkedlist != null) {
            barangayArr = selectedBarangayLinkedlist.getAll()
        }

        if (barangayArr.length > 0) {
            barangayArr.forEach(item => {
                htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-topid="${item.cityID}" data-id="${item.barangayID}" data-trigger="arrow">${item.barangayName}</li>`
                const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiBarangay)
                ul.appendChild(jsAllEmpCustomSelectLi);
            })
        }
    }


    //input events
    function handleInputAddressCountry(e) {
        const ul = document.querySelector('.jsAllEmpAddressUlCountry');
        ul.innerHTML = '';

        const SearchString = e.target.value.trim();
        const arr = countryLinkedlist.linkedListIndexOf('countryName', SearchString)

        if (arr.length > 0) {
            ul.classList.remove('display-none')
            arr.forEach(item => {
                htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-id="${item.countryID}">${item.countryName}</li>`
                const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiCountry)
                ul.appendChild(jsAllEmpCustomSelectLi);
            })
        }

    }

    function handleInputAddressRegion(e) {
        const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
        ul.innerHTML = '';
        const SearchString = e.target.value.trim();
        const arr = allRegionLinkedlist.linkedListIndexOf('regionName', SearchString)

        if (arr.length > 0) {
            arr.forEach(item => {
                ul.classList.remove('display-none')
                htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-id="${item.regionID}">${item.regionName}</li>`
                const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiRegion)
                ul.appendChild(jsAllEmpCustomSelectLi);
            })
        }

    }

    function handleInputAddressProvince(e) {
        //note: input search all, while arrow only show what is inside the linkedlist
        //procedure
        //1.Update higher
        //2.Clear lower
        //3.Update linkedlist

        const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
        ul.innerHTML = '';
        const SearchString = e.target.value.trim();
        const arr = allProvinceLinkedlist.linkedListIndexOf('provinceName', SearchString)

        if (arr.length > 0) {
            arr.forEach(item => {
                ul.classList.remove('display-none')
                htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-id="${item.provinceID}" data-topid="${item.regionID}" data-trigger="input">${item.provinceName}</li>`
                const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiProvince)
                ul.appendChild(jsAllEmpCustomSelectLi);
            })
        }

    }

    function handleInputAddressCity(e) {
        const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
        ul.innerHTML = '';
        const SearchString = e.target.value.trim();
        const arr = allCityLinkedlist.linkedListIndexOf('cityName', SearchString)

        if (arr.length > 0) {
            arr.forEach(item => {
                ul.classList.remove('display-none')
                htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-topid="${item.provinceID}" data-id="${item.cityID}" data-trigger="input">${item.cityName}</li>`
                const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiCity)
                ul.appendChild(jsAllEmpCustomSelectLi);
            })
        }

    }


    //click li events
    function handleClickSelectLiRegion(e) {

        //get the region ID
        const regionID = e.currentTarget.getAttribute('data-id');

        (function regionSelfElements() {
            //hide selection dropdown
            const ul = document.querySelector('.jsAllEmpAddressUlRegion');
            ul.classList.add('display-none')

            //populate region input attribute
            const jsCustomSelectInputRegion = document.querySelector('.jsCustomSelectInputRegion');
            jsCustomSelectInputRegion.value = e.currentTarget.textContent;
            jsCustomSelectInputRegion.setAttribute('data-id', regionID);
        })();

        (function regionDownElements() {

            //update province linkedlist
            let provinceArr = []
            data.provinceList.forEach(item => {
                if (item.regionID == regionID) {
                    provinceArr.push(item)
                }
            })

            //reset province linkedlist to new data
            selectedProvinceLinkedlist = new LinkedList(provinceArr[0])
            for (let i = 1; i < provinceArr.length; i++) {
                selectedProvinceLinkedlist.push(provinceArr[i])
            }

            //reset city linkedlist data empty
            selectedCityLinkedlist = null;

            //reset barangay linkedlist data empty
            selectedBarangayLinkedlist = null;


            //clear province input attribute
            const jsCustomSelectInputProvince = document.querySelector('.jsCustomSelectInputProvince');
            jsCustomSelectInputProvince.value = '';
            jsCustomSelectInputProvince.setAttribute('data-id', 0)

            //clear city input attribute
            const jsCustomSelectInputCity = document.querySelector('.jsCustomSelectInputCity');
            jsCustomSelectInputCity.value = '';
            jsCustomSelectInputCity.setAttribute('data-id', 0)

            //clear barangay input attribute
            const jsCustomSelectInputBarangay = document.querySelector('.jsCustomSelectInputBarangay');
            jsCustomSelectInputBarangay.value = '';
            jsCustomSelectInputBarangay.setAttribute('data-id', 0)

            //clear line1 input attribute
            const jsInputAddressLine1 = document.querySelector('.jsInputAddressLine1');
            jsInputAddressLine1.value = '';

            //clear line2 input attribute
            const jsInputAddressLine2 = document.querySelector('.jsInputAddressLine2');
            jsInputAddressLine2.value = '';

        })();

    }

    function handleClickSelectLiProvince(e) {

        const provinceID = e.currentTarget.getAttribute('data-id');
        const regionID = e.currentTarget.getAttribute('data-topid');
        const dataTrigger = e.currentTarget.getAttribute('data-trigger');

        (function provinceSelfElements() {
            //hide select ul
            const ul = e.target.closest('.jsAllEmpAddressUl');
            ul.classList.add('display-none')

            //populate input attribute
            const jsCustomSelectInput = document.querySelector('.jsCustomSelectInputProvince');
            jsCustomSelectInput.value = e.currentTarget.textContent;
            jsCustomSelectInput.setAttribute('data-id', provinceID);
        })();

        (function provinceTopElements() {
            if (dataTrigger == 'input') {

                //reset region data
                let regionName = '';
                for (let i = 0; i < data.regionList.length; i++) {
                    if (data.regionList[i].regionID == regionID) {
                        regionName = data.regionList[i].regionName;
                        break;
                    }
                }

                const jsCustomSelectInputRegion = document.querySelector('.jsCustomSelectInputRegion');
                jsCustomSelectInputRegion.value = regionName;
                jsCustomSelectInputRegion.setAttribute('data-id', regionID);

                const proviceArr = [];
                for (let i = 0; i < data.provinceList.length; i++) {
                    if (data.provinceList[i].regionID == regionID) {
                        proviceArr.push(data.provinceList[i])
                    }
                }

                selectedProvinceLinkedlist = new LinkedList(proviceArr[0])
                for (let i = 1; i < proviceArr.length; i++) {
                    selectedProvinceLinkedlist.push(proviceArr[i])
                }

                //reset country data, this needs
                //just in case country is empty from the start
                let countryID = 1;
                let countryName = '';

                for (let i = 0; i < data.countryList.length; i++) {
                    if (data.countryList[i].countryID == countryID) {
                        countryName = data.countryList[i].countryName.trim()
                    }
                }

                const jsCustomSelectInputCountry = document.querySelector('.jsCustomSelectInputCountry');
                jsCustomSelectInputCountry.value = countryName;
                jsCustomSelectInputCountry.setAttribute('data-id', countryID);
            }
        })();

        (function provinceDowElements() {
            //update city linkedlist
            let cityArr = []
            data.cityList.forEach(item => {
                if (item.provinceID == provinceID) {
                    cityArr.push(item)
                }
            })

            //reset city linklist data to new set of data
            selectedCityLinkedlist = new LinkedList(cityArr[0])
            for (let i = 1; i < cityArr.length; i++) {
                selectedCityLinkedlist.push(cityArr[i])
            }

            //reset barangay linklist data empty
            selectedBarangayLinkedlist = null;

            //clear city input attribute
            const jsCustomSelectInputCity = document.querySelector('.jsCustomSelectInputCity');
            jsCustomSelectInputCity.value = '';
            jsCustomSelectInputCity.setAttribute('data-id', 0)

            //clear barangay input attribute
            const jsCustomSelectInputBarangay = document.querySelector('.jsCustomSelectInputBarangay');
            jsCustomSelectInputBarangay.value = '';
            jsCustomSelectInputBarangay.setAttribute('data-id', 0)

            //clear line1 input attribute
            const jsInputAddressLine1 = document.querySelector('.jsInputAddressLine1');
            jsInputAddressLine1.value = '';

            //clear line2 input attribute
            const jsInputAddressLine2 = document.querySelector('.jsInputAddressLine2');
            jsInputAddressLine2.value = '';

        })();

    }

    function handleClickSelectLiCity(e) {
        const countryID = 1;
        const cityID = e.currentTarget.getAttribute('data-id');
        const provinceID = e.currentTarget.getAttribute('data-topid');
        const dataTrigger = e.currentTarget.getAttribute('data-trigger');

        (function citySelfElements() {
            //hide select ul
            const ul = e.target.closest('.jsAllEmpAddressUl');
            ul.classList.add('display-none')

            //city input
            const jsCustomSelectInput = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsCustomSelectInput');
            jsCustomSelectInput.value = e.currentTarget.textContent;
            jsCustomSelectInput.setAttribute('data-id', cityID);



        })();

        (function cityTopElements() {
            //this function is intended only if dropdown selection is triggered by input elements
            if (dataTrigger == 'arrow') return

            //province
            let provinceName = '';
            let regionID = 0
            for (let i = 0; i < data.provinceList.length; i++) {
                if (data.provinceList[i].provinceID == provinceID) {
                    provinceName = data.provinceList[i].provinceName;
                    regionID = data.provinceList[i].regionID;
                    break;
                }
            }

            const jsCustomSelectInputProvince = document.querySelector('.jsCustomSelectInputProvince');
            jsCustomSelectInputProvince.value = provinceName;
            jsCustomSelectInputProvince.setAttribute('data-id', provinceID);

            let selectedCityArr = []
            for (let i = 0; i < data.cityList.length; i++) {
                if (data.cityList[i].provinceID == provinceID) {
                    selectedCityArr.push(data.cityList[i])
                }
            }

            selectedCityLinkedlist = new LinkedList(selectedCityArr[0])
            for (let i = 1; i < selectedCityArr.length; i++) {
                selectedCityLinkedlist.push(selectedCityArr[i])
            }

            //region
            let regionName = '';
            for (let i = 0; i < data.regionList.length; i++) {
                if (data.regionList[i].regionID == regionID) {
                    regionName = data.regionList[i].regionName;
                    break;
                }
            }
            console.log(regionID, regionName)

            const jsCustomSelectInputRegion = document.querySelector('.jsCustomSelectInputRegion');
            jsCustomSelectInputRegion.value = regionName;
            jsCustomSelectInputRegion.setAttribute('data-id', regionID);

            let selectedProvinceArr = []
            for (let i = 0; i < data.provinceList.length; i++) {
                if (data.provinceList[i].regionID == regionID) {
                    selectedProvinceArr.push(data.provinceList[i])
                }
            }

            selectedProvinceLinkedlist = new LinkedList(selectedProvinceArr[0])
            for (let i = 1; i < selectedProvinceArr.length; i++) {
                selectedProvinceLinkedlist.push(selectedProvinceArr[i])
            }

            //reset country data, this needs
            //just in case country is empty from the start
            let countryID = 1;
            let countryName = '';

            for (let i = 0; i < data.countryList.length; i++) {
                if (data.countryList[i].countryID == countryID) {
                    countryName = data.countryList[i].countryName.trim()
                }
            }

            const jsCustomSelectInputCountry = document.querySelector('.jsCustomSelectInputCountry');
            jsCustomSelectInputCountry.value = countryName;
            jsCustomSelectInputCountry.setAttribute('data-id', countryID);

        })();

        (async function cityDownElements() {


            //get barangay linkedList by fetching to database
            //this is intentional to make data processing not heavy from start
            selectedBarangayLinkedlist = await getSelectedBarangay(cityID)

            //clear barangay input attribute
            const jsCustomSelectInputBarangay = document.querySelector('.jsCustomSelectInputBarangay');
            jsCustomSelectInputBarangay.value = '';
            jsCustomSelectInputBarangay.setAttribute('data-id', 0)

            //clear line1 input attribute
            const jsInputAddressLine1 = document.querySelector('.jsInputAddressLine1');
            jsInputAddressLine1.value = '';

            //clear line2 input attribute
            const jsInputAddressLine2 = document.querySelector('.jsInputAddressLine2');
            jsInputAddressLine2.value = '';

        })();

    }

    function handleClickSelectLiBarangay(e) {
        const barangayID = e.currentTarget.getAttribute('data-id');
        const cityID = e.currentTarget.getAttribute('data-topid');

        (function barangaySelfElements() {
            //hide select ul
            const ul = e.target.closest('.jsAllEmpAddressUl');
            ul.classList.add('display-none')

            //barangay input
            const jsCustomSelectInput = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsCustomSelectInput');
            jsCustomSelectInput.value = e.currentTarget.textContent;
            jsCustomSelectInput.setAttribute('data-id', barangayID);
            jsCustomSelectInput.setAttribute('data-topid', cityID);
        })();

        (async function barangayDownElements() {
            //clear line1 input attribute
            const jsInputAddressLine1 = document.querySelector('.jsInputAddressLine1');
            jsInputAddressLine1.value = '';

            //clear line2 input attribute
            const jsInputAddressLine2 = document.querySelector('.jsInputAddressLine2');
            jsInputAddressLine2.value = '';
        })();
    }

    //misc function
    function enableCustomSelectInput(item) {
        //enable inputs
        const input = item.querySelector('.jsCustomSelectInput');
        input.removeAttribute('disabled');
        item.classList.add('input-enable');

        //enable hover effect
        const arrowCont = item.querySelector('.jsCutomSelectArrowCont');
        arrowCont.classList.remove('arrow-cont-disabled')

        //enable arrow color
        const arrow = item.querySelector('svg');
        arrow.classList.remove('arrow-disabled')
    }

   
}
