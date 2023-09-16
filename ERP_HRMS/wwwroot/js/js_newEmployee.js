async function newEmployee(newEmpData) {

    //civil status linkedlist
    let civilStatusLinkedList = new LinkedList(newEmpData.civilStatusList[0])
    for (let i = 1; i < newEmpData.civilStatusList.length; i++) {
        civilStatusLinkedList.push(newEmpData.civilStatusList[i])
    }

    //gender linkedlist
    let genderLinkedList = new LinkedList(newEmpData.genderList[0])
    for (let i = 1; i < newEmpData.genderList.length; i++) {
        genderLinkedList.push(newEmpData.genderList[i])
    }

    //country linkedlist
    let countryLinkedList = new LinkedList(newEmpData.countryList[0])
    for (let i = 1; i < newEmpData.countryList.length; i++) {
        countryLinkedList.push(newEmpData.countryList[i])
    }

    //region linkedlist
    let regionLinkedList = new LinkedList(newEmpData.regionList[0])
    for (let i = 1; i < newEmpData.regionList.length; i++) {
        regionLinkedList.push(newEmpData.regionList[i])
    }

    //province linkedlist
    let provinceLinkedList = new LinkedList(newEmpData.provinceList[0])
    for (let i = 1; i < newEmpData.provinceList.length; i++) {
        provinceLinkedList.push(newEmpData.provinceList[i])
    }
    let provinceSelectedLinkedList = null;

    //city linkedlist
    let cityLinkedList = new LinkedList(newEmpData.cityList[0])
    for (let i = 1; i < newEmpData.cityList.length; i++) {
        cityLinkedList.push(newEmpData.cityList[i])
    }
    let citySelectedLinkedList = null;

    //barangay linkedlist
    let barangaySelectedLinkedList = null;

    //position linkedlist
    let positionLinkedList = new LinkedList(newEmpData.positionList[0])
    for (let i = 1; i < newEmpData.positionList.length; i++) {
        positionLinkedList.push(newEmpData.positionList[i])
    }

    //department linkedlist
    let departmentLinkedList = new LinkedList(newEmpData.departmentList[0])
    for (let i = 1; i < newEmpData.departmentList.length; i++) {
        departmentLinkedList.push(newEmpData.departmentList[i])
    }

    //rate period linkedlist
    let ratePeriodLinkedList = new LinkedList(newEmpData.ratePeriodList[0])
    for (let i = 1; i < newEmpData.ratePeriodList.length; i++) {
        ratePeriodLinkedList.push(newEmpData.ratePeriodList[i])
    }

    //salary condition linkedlist
    let salaryConditionLinkedList = new LinkedList(newEmpData.salaryConditionList[0])
    for (let i = 1; i < newEmpData.salaryConditionList.length; i++) {
        salaryConditionLinkedList.push(newEmpData.salaryConditionList[i])
    }




    let persInfoDataObj = {
        masterPersonID: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        civilStatusID: '',
        civilStatus: '',
        genderID: '',
        gender: '',
        employeeNumber: '',
        isPersonalInfoSaved: false,
    }

    let benifitsDataObj = {
        sssNo: '',
        philHealthNo: '',
        pagibigNo: '',
        tinNo: '',
    }

    let contactsDataObj = {
        mobileNo: '',
        landlineNo: '',
        emailAdd: '',
    }

    let addressDataObj = {
        countryID: '',
        countryName: '',
        regionID: '',
        regionName: '',
        provinceID: '',
        provinceName: '',
        cityID: '',
        cityName: '',
        barangayID: '',
        barangayName: '',
        addressLine1: '',
        addressLine2: '',
    }

    let jobDescriptionDataObj = {
        position: '',
        positionID: '',
        department: '',
        departmentID: '',
        remarks: '',
    }

    let compensationDataObj = {
        ratePeriod: '',
        ratePeriodID: '',
        basicSalary: '',
        allowance: '',
        salaryConditionID: '',
        salaryCondition: '',
    };

    let defaultValueSelectLi = {
        value: '-Select-',
        dataID: 0,
    };

    (function defaultSelection() {
        //civil status default
        const jsSelectInputCivilStatus = document.querySelector('.jsSelectInputCivilStatus');
        jsSelectInputCivilStatus.value = defaultValueSelectLi.value;
        jsSelectInputCivilStatus.setAttribute('data-id', defaultValueSelectLi.dataID)

        //gender default
        const jsSelectInputGender = document.querySelector('.jsSelectInputGender');
        jsSelectInputGender.value = defaultValueSelectLi.value;
        jsSelectInputGender.setAttribute('data-id', defaultValueSelectLi.dataID)

        //position default
        const jsSelectInputPosition = document.querySelector('.jsSelectInputPosition');
        jsSelectInputPosition.value = defaultValueSelectLi.value;
        jsSelectInputPosition.setAttribute('data-id', defaultValueSelectLi.dataID)

        //department default
        const jsSelectInputDepartment = document.querySelector('.jsSelectInputDepartment');
        jsSelectInputDepartment.value = defaultValueSelectLi.value;
        jsSelectInputDepartment.setAttribute('data-id', defaultValueSelectLi.dataID)

        //rate period default
        const jsSelectInputRatePeriod = document.querySelector('.jsSelectInputRatePeriod');
        jsSelectInputRatePeriod.value = defaultValueSelectLi.value;
        jsSelectInputRatePeriod.setAttribute('data-id', defaultValueSelectLi.dataID)

        //salary default
        const jsSelectInputSalaryCondition = document.querySelector('.jsSelectInputSalaryCondition');
        jsSelectInputSalaryCondition.value = defaultValueSelectLi.value;
        jsSelectInputSalaryCondition.setAttribute('data-id', defaultValueSelectLi.dataID)
    })();


    const jsNewEmpGroupTitleSaveEditBtns = document.querySelectorAll('.jsNewEmpGroupTitleSaveEditBtn');
    jsNewEmpGroupTitleSaveEditBtns.forEach(button => {
        if (button.getAttribute('name') == 'persinfo') {
            button.addEventListener('click', handleClickSavePersonalInfo)
        } else if (button.getAttribute('name') == 'benifit') {
            button.addEventListener('click', handleClickSaveBenifits)
        } else if (button.getAttribute('name') == 'contact') {
            button.addEventListener('click', handleClickSaveContacts)
        } else if (button.getAttribute('name') == 'jobdescription') {
            button.addEventListener('click', handleClickSaveJobDescriptions)
        } else if (button.getAttribute('name') == 'compensation') {
            button.addEventListener('click', handleClickSaveCompensations)
        } else if (button.getAttribute('name') == 'address') {
            button.addEventListener('click', handleClickSaveAddress)
        }
    })


    const jsNewEmpSelectArrowConts = document.querySelectorAll('.jsNewEmpSelectArrowCont');
    jsNewEmpSelectArrowConts.forEach(arrow => {
        if (arrow.getAttribute('name') == 'CivilStatus') {
            arrow.addEventListener('click', handleClickArrowCivilStatusSelect)
        } else if (arrow.getAttribute('name') == 'Gender') {
            arrow.addEventListener('click', handleClickArrowGenderSelect)
        } else if (arrow.getAttribute('name') == 'Position') {
            arrow.addEventListener('click', handleClickArrowPositionSelect)
        } else if (arrow.getAttribute('name') == 'Department') {
            arrow.addEventListener('click', handleClickArrowDepartmentSelect)
        } else if (arrow.getAttribute('name') == 'RatePeriod') {
            arrow.addEventListener('click', handleClickArrowRatePeriodSelect)
        } else if (arrow.getAttribute('name') == 'SalaryCondition') {
            arrow.addEventListener('click', handleClickArrowSalaryConditionSelect)
        }
    })

    const jsNewEmpSelectArrowContAdresses = document.querySelectorAll('.jsNewEmpSelectArrowContAdress');
    jsNewEmpSelectArrowContAdresses.forEach(arrow => {
        if (arrow.getAttribute('name') == 'country') {
            arrow.addEventListener('click', handleClickArrowAddressCountry)
        } else if (arrow.getAttribute('name') == 'region') {
            arrow.addEventListener('click', handleClickArrowAddressRegion)
        } else if (arrow.getAttribute('name') == 'province') {
            arrow.addEventListener('click', handleClickArrowAddressProvince)
        } else if (arrow.getAttribute('name') == 'city') {
            arrow.addEventListener('click', handleClickArrowAddressCity)
        } else if (arrow.getAttribute('name') == 'barangay') {
            arrow.addEventListener('click', handleClickArrowAddressBarangay)
        }
    })

    const jsSelectInputAddresses = document.querySelectorAll('.jsSelectInputAddress');
    jsSelectInputAddresses.forEach(arrow => {
        if (arrow.getAttribute('name') == 'Country') {
            arrow.addEventListener('input', handleInputAddressCountry)
        } else if (arrow.getAttribute('name') == 'City') {
            arrow.addEventListener('input', handleInputAddressCity)
        }
    })

    function handleClickArrowAddressCountry(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');

        jsNewEmpSelectUl.innerHTML = '';

        jsNewEmpSelectUl.classList.toggle('display-none');

        let arr = countryLinkedList.getAll();
        let htmlString;

        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.countryID}">${item.countryName}<li/>`
            jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })
    }

    function handleClickArrowAddressRegion(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');

        jsNewEmpSelectUl.innerHTML = '';

        jsNewEmpSelectUl.classList.toggle('display-none');

        let arr = regionLinkedList.getAll();
        let htmlString;

        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.regionID}" data-topid="${item.countryID}" data-lisource="arrow">${item.regionName}<li/>`
            jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLiRegion)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })


    }

    function handleClickArrowAddressProvince(e) {
        if (provinceSelectedLinkedList == null) return

        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');
        jsNewEmpSelectUl.innerHTML = '';
        jsNewEmpSelectUl.classList.toggle('display-none');
        let arr = provinceSelectedLinkedList.getAll();
        let htmlString;
        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.provinceID}" data-topid="${item.regionID}" data-lisource="arrow">${item.provinceName}<li/>`
            jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLiProvince)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })

    }

    function handleClickArrowAddressCity(e) {
        if (citySelectedLinkedList == null) return

        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');
        jsNewEmpSelectUl.innerHTML = '';
        jsNewEmpSelectUl.classList.toggle('display-none');
        let arr = citySelectedLinkedList.getAll();
        let htmlString;
        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.cityID}" data-topid="${item.provinceID}" data-lisource="arrow">${item.cityName}<li/>`
            jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLiCity)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })
    }

    function handleClickArrowAddressBarangay(e) {
        if (barangaySelectedLinkedList == null) return

        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');
        jsNewEmpSelectUl.innerHTML = '';
        jsNewEmpSelectUl.classList.toggle('display-none');
        let arr = barangaySelectedLinkedList.getAll();
        let htmlString;
        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.barangayID}" data-topid="${item.cityID}" data-lisource="arrow">${item.barangayName}<li/>`
            jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLiBarangay)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })
    }

    function handleInputAddressCountry(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');

        jsNewEmpSelectUl.innerHTML = '';

        jsNewEmpSelectUl.classList.remove('display-none');
        console.log(countryLinkedList)
        const SearchString = e.target.value.trim()
        const arr = countryLinkedList.linkedListIndexOf('countryName', SearchString);
        let htmlString;

        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.countryID}" data-lisource="input">${item.countryName}<li/>`
            jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })
    }

    function handleInputAddressCity(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');

        jsNewEmpSelectUl.innerHTML = '';

        jsNewEmpSelectUl.classList.remove('display-none');

        const SearchString = e.target.value.trim()
        const arr = cityLinkedList.linkedListIndexOf('cityName', SearchString);

        let htmlString;

        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.cityID}" data-topid="${item.provinceID}" data-lisource="input">${item.cityName}<li/>`
            jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLiCity)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })
    }

    async function handleClickSavePersonalInfo(e) {
        //validate inputs
        if (!validateInputInformation(e)) return;

        //save actual data
        const formData = new FormData();
        formData.append('UserMasterPersonID', 1);

        const inputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('input');
        inputs.forEach(input => {
            if (input.getAttribute('name') != 'EmployeeNumber') { //employee number is not included
                if (input.classList.contains('jsSelectInput')) {
                    formData.append(input.getAttribute('name'), input.getAttribute('data-id'));
                } else {
                    formData.append(input.getAttribute('name'), input.value.trim());
                }
            }
        })

        const opitons = {
            method: 'POST',
            body: formData
        }

        //actual fetch to database
        const persInfoReturnData = await fetchData.postData('save-new-employee-personalinfo', opitons);
        if (persInfoReturnData == null) return;

        //update local data if save is successfull
        persInfoDataObj.masterPersonID = persInfoReturnData.masterPersonID
        persInfoDataObj.firstName = persInfoReturnData.firstName
        persInfoDataObj.middleName = persInfoReturnData.middleName
        persInfoDataObj.lastName = persInfoReturnData.lastName
        persInfoDataObj.dateOfBirth = persInfoReturnData.dateOfBirth
        persInfoDataObj.civilStatus = persInfoReturnData.civilStatusName
        persInfoDataObj.civilStatusID = persInfoReturnData.civilStatusID
        persInfoDataObj.gender = persInfoReturnData.genderName
        persInfoDataObj.genderID = persInfoReturnData.genderID
        persInfoDataObj.employeeNumber = persInfoReturnData.employeeNumber
        persInfoDataObj.isPersonalInfoSaved = true


        //populate employee number
        const jsPureInputEmployeeNumber = e.target.closest('.jsNewEmpSubContentCont').querySelector('.jsPureInputEmployeeNumber');
        jsPureInputEmployeeNumber.value = persInfoDataObj.employeeNumber

        //disable button
        e.target.removeEventListener('click', handleClickSavePersonalInfo);
        e.target.classList.add('new-emp-btn-disabled');

        const jsInputEditBtns = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsInputEditBtn');
        jsInputEditBtns.forEach(button => {
            button.addEventListener('click', handleClickEditInputBtn);
            button.classList.remove('new-emp-btn-disabled');
            button.setAttribute('data-issavedmode', false)
        })

        //disable pure inputs - all
        const jsPureInputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsPureInput');
        jsPureInputs.forEach(input => {
            input.setAttribute('disabled', true);
            input.classList.add('new-emp-input-disabled');
        });

        //disable select input - civil status
        (function () {
            const jsNewEmpSelectMainContCivilStatus = document.querySelector('.jsNewEmpSelectMainContCivilStatus');

            const jsNewEmpSelectInputArrowCont = jsNewEmpSelectMainContCivilStatus.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.add('new-emp-input-disabled');

            const jsNewEmpSelectArrowCont = jsNewEmpSelectMainContCivilStatus.querySelector('.jsNewEmpSelectArrowCont');
            jsNewEmpSelectArrowCont.removeEventListener('click', handleClickArrowCivilStatusSelect)
            jsNewEmpSelectArrowCont.classList.add('arrow-cont-disabled');

            const jsSelectInput = jsNewEmpSelectMainContCivilStatus.querySelector('.jsSelectInput');
            jsSelectInput.setAttribute('disabled', true);

            const jsNewEmpSelectUl = jsNewEmpSelectMainContCivilStatus.querySelector('.jsNewEmpSelectUl');
            jsNewEmpSelectUl.classList.add('display-none')
        })();

        //disable select input - gender
        (function () {
            const jsNewEmpSelectMainContGender = document.querySelector('.jsNewEmpSelectMainContGender');

            const jsNewEmpSelectInputArrowCont = jsNewEmpSelectMainContGender.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.add('new-emp-input-disabled');

            const jsNewEmpSelectArrowCont = jsNewEmpSelectMainContGender.querySelector('.jsNewEmpSelectArrowCont');
            jsNewEmpSelectArrowCont.removeEventListener('click', handleClickArrowGenderSelect)
            jsNewEmpSelectArrowCont.classList.add('arrow-cont-disabled');

            const jsSelectInput = jsNewEmpSelectMainContGender.querySelector('.jsSelectInput');
            jsSelectInput.setAttribute('disabled', true);

            const jsNewEmpSelectUl = jsNewEmpSelectMainContGender.querySelector('.jsNewEmpSelectUl');
            jsNewEmpSelectUl.classList.add('display-none')
        })();

        //enable and attached event listener to cancel button
        const jsNewEmpCancelBtnPersInfo = document.querySelector('.jsNewEmpCancelBtnPersInfo');
        jsNewEmpCancelBtnPersInfo.addEventListener('click', handleClickCancelBtn)
    }

    async function handleClickSaveBenifits(e) {
        //check if personal info is already saved
        if (persInfoDataObj.isPersonalInfoSaved == false) {
            alertCustom.isConfirmedOk(alertContainer.warningAlert, 'Save personal information first!')
            return;
        }

        //validate inputs
        if (!validateInputInformation(e)) return

        //save actual data
        const formData = new FormData();
        formData.append('UserMasterPersonID', 1);
        formData.append('MasterPersonID', persInfoDataObj.masterPersonID);

        const inputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('input');
        inputs.forEach(input => {
            formData.append(input.getAttribute('name'), input.value.trim());
        })

        const options = {
            method: 'POST',
            body: formData
        }

        //actual fetch to database
        const benifitsReturnData = await fetchData.postData('save-new-employee-benifits', options);
        if (benifitsReturnData == null) return;


        //update local data if save is successfull
        benifitsDataObj.sssNo = benifitsReturnData.sssNumber
        benifitsDataObj.philHealthNo = benifitsReturnData.philHealthNumber
        benifitsDataObj.pagibigNo = benifitsReturnData.pagIbigNumber
        benifitsDataObj.tinNo = benifitsReturnData.tinNumber


        //disable button
        e.target.removeEventListener('click', handleClickSaveBenifits);
        e.target.classList.add('new-emp-btn-disabled');

        const jsInputEditBtns = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsInputEditBtn');
        jsInputEditBtns.forEach(button => {
            button.addEventListener('click', handleClickEditInputBtn);
            button.classList.remove('new-emp-btn-disabled');

        })

        //disable pure inputs - all
        const jsPureInputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsPureInput');
        jsPureInputs.forEach(input => {
            input.setAttribute('disabled', true);
            input.classList.add('new-emp-input-disabled');
        })

        //enable and attached event listener to cancel button
        const jsNewEmpCancelBtnBenifits = document.querySelector('.jsNewEmpCancelBtnBenifits');
        jsNewEmpCancelBtnBenifits.addEventListener('click', handleClickCancelBtn)
    }

    async function handleClickSaveContacts(e) {
        //check if personal info is already saved
        if (persInfoDataObj.isPersonalInfoSaved == false) {
            alertCustom.isConfirmedOk(alertContainer.warningAlert, 'Save personal information first!')
            return;
        }

        //validate inputs
        if (!validateInputInformation(e)) return

        const formData = new FormData();
        formData.append('UserMasterPersonID', 1);
        formData.append('MasterPersonID', persInfoDataObj.masterPersonID);

        const inputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('input');
        inputs.forEach(input => {
            formData.append(input.getAttribute('name'), input.value.trim());
        })

        const options = {
            method: 'POST',
            body: formData
        }

        //actual fetch to database
        const contactsReturnData = await fetchData.postData('save-new-employee-contacts', options);
        if (contactsReturnData == null) return;
        console.log(contactsReturnData)

        //update local data if save is successfull
        contactsDataObj.mobileNo = contactsReturnData.mobileNumber
        contactsDataObj.landlineNo = contactsReturnData.landLineNumber
        contactsDataObj.emailAdd = contactsReturnData.emailAddress

        console.log(contactsDataObj)

        //disable button
        e.target.removeEventListener('click', handleClickSaveContacts);
        e.target.classList.add('new-emp-btn-disabled');

        const jsInputEditBtns = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsInputEditBtn');
        jsInputEditBtns.forEach(button => {
            button.addEventListener('click', handleClickEditInputBtn);
            button.classList.remove('new-emp-btn-disabled');

        })

        //disable inputs
        const jsPureInputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsPureInput');
        jsPureInputs.forEach(input => {
            input.setAttribute('disabled', true);
            input.classList.add('new-emp-input-disabled');
        })

        //enable and attached event listener to cancel button
        const jsNewEmpCancelBtnContacts = document.querySelector('.jsNewEmpCancelBtnContacts');
        jsNewEmpCancelBtnContacts.addEventListener('click', handleClickCancelBtn)
    }

    async function handleClickSaveAddress(e) {
        //check if personal info is already saved
        if (persInfoDataObj.isPersonalInfoSaved == false) {
            alertCustom.isConfirmedOk(alertContainer.warningAlert, 'Save personal information first!')
            return;
        }

        //validate inputs
        if (!validateInputInformation(e)) return

        const formData = new FormData();
        formData.append('UserMasterPersonID', 1);
        formData.append('MasterPersonID', persInfoDataObj.masterPersonID);
        formData.append('AddressTypeID', 1)

        const jsSelectInputCity = document.querySelector('.jsSelectInputCity');
        formData.append('CityID', jsSelectInputCity.getAttribute('data-id'))

        const jsSelectInputBarangay = document.querySelector('.jsSelectInputBarangay');
        formData.append('BarangayID', jsSelectInputBarangay.getAttribute('data-id'))

        const jsPureInputAddressLine1 = document.querySelector('.jsPureInputAddressLine1');
        formData.append('AddressLine1', jsPureInputAddressLine1.value)

        const jsPureInputAddressLine2 = document.querySelector('.jsPureInputAddressLine1');
        formData.append('AddressLine2', jsPureInputAddressLine2.value)

        const options = {
            method: 'POST',
            body: formData
        }

        //actual fetch to database
        const addressReturnData = await fetchData.postData('save-new-employee-address', options);
        if (addressReturnData == null) return;
        console.log(addressReturnData)

        //update local data if save is successfull
        addressDataObj.countryID = addressReturnData.countryID
        addressDataObj.countryName = addressReturnData.countryName
        addressDataObj.regionID = addressReturnData.regionID
        addressDataObj.regionName = addressReturnData.regionName
        addressDataObj.provinceID = addressReturnData.provinceID
        addressDataObj.provinceName = addressReturnData.provinceName
        addressDataObj.cityID = addressReturnData.cityID
        addressDataObj.cityName = addressReturnData.cityName
        addressDataObj.barangayID = addressReturnData.barangayID
        addressDataObj.barangayName = addressReturnData.barangayName
        addressDataObj.addressLine1 = addressReturnData.addressLine1
        addressDataObj.addressLine2 = addressReturnData.addressLine2

        console.log(addressDataObj)

        //disable button
        e.target.removeEventListener('click', handleClickSaveAddress);
        e.target.addEventListener('click', handleClickEditAddress);
        e.target.textContent = 'Edit'


        //disable inputs
        const jsPureInputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsPureInput');
        jsPureInputs.forEach(input => {
            input.setAttribute('disabled', true);
            input.classList.add('new-emp-input-disabled');
        });

        //disable select input - country
        (function () {
            const jsNewEmpSelectMainContCountry = document.querySelector('.jsNewEmpSelectMainContCountry');

            const jsNewEmpSelectInputArrowCont = jsNewEmpSelectMainContCountry.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.add('new-emp-input-disabled');

            const jsNewEmpSelectArrowContAdress = jsNewEmpSelectMainContCountry.querySelector('.jsNewEmpSelectArrowContAdress');
            jsNewEmpSelectArrowContAdress.removeEventListener('click', handleClickArrowAddressCountry)
            jsNewEmpSelectArrowContAdress.classList.add('arrow-cont-disabled');

            const jsSelectInput = jsNewEmpSelectMainContCountry.querySelector('.jsSelectInput');
            jsSelectInput.setAttribute('disabled', true);

            const jsNewEmpSelectUl = jsNewEmpSelectMainContCountry.querySelector('.jsNewEmpSelectUl');
            jsNewEmpSelectUl.classList.add('display-none')
        })();

        //disable select input - region
        (function () {
            const jsNewEmpSelectMainContRegion = document.querySelector('.jsNewEmpSelectMainContRegion');

            const jsNewEmpSelectInputArrowCont = jsNewEmpSelectMainContRegion.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.add('new-emp-input-disabled');

            const jsNewEmpSelectArrowContAdress = jsNewEmpSelectMainContRegion.querySelector('.jsNewEmpSelectArrowContAdress');
            jsNewEmpSelectArrowContAdress.removeEventListener('click', handleClickArrowAddressRegion)
            jsNewEmpSelectArrowContAdress.classList.add('arrow-cont-disabled');

            const jsSelectInput = jsNewEmpSelectMainContRegion.querySelector('.jsSelectInput');
            jsSelectInput.setAttribute('disabled', true);

            const jsNewEmpSelectUl = jsNewEmpSelectMainContRegion.querySelector('.jsNewEmpSelectUl');
            jsNewEmpSelectUl.classList.add('display-none')
        })();

        //disable select input - province
        (function () {
            const jsNewEmpSelectMainContProvince = document.querySelector('.jsNewEmpSelectMainContProvince');

            const jsNewEmpSelectInputArrowCont = jsNewEmpSelectMainContProvince.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.add('new-emp-input-disabled');

            const jsNewEmpSelectArrowContAdress = jsNewEmpSelectMainContProvince.querySelector('.jsNewEmpSelectArrowContAdress');
            jsNewEmpSelectArrowContAdress.removeEventListener('click', handleClickArrowAddressProvince)
            jsNewEmpSelectArrowContAdress.classList.add('arrow-cont-disabled');

            const jsSelectInput = jsNewEmpSelectMainContProvince.querySelector('.jsSelectInput');
            jsSelectInput.setAttribute('disabled', true);

            const jsNewEmpSelectUl = jsNewEmpSelectMainContProvince.querySelector('.jsNewEmpSelectUl');
            jsNewEmpSelectUl.classList.add('display-none')
        })();

        //disable select input - city
        (function () {
            const jsNewEmpSelectMainContCity = document.querySelector('.jsNewEmpSelectMainContCity');

            const jsNewEmpSelectInputArrowCont = jsNewEmpSelectMainContCity.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.add('new-emp-input-disabled');

            const jsNewEmpSelectArrowContAdress = jsNewEmpSelectMainContCity.querySelector('.jsNewEmpSelectArrowContAdress');
            jsNewEmpSelectArrowContAdress.removeEventListener('click', handleClickArrowAddressCity)
            jsNewEmpSelectArrowContAdress.classList.add('arrow-cont-disabled');

            const jsSelectInput = jsNewEmpSelectMainContCity.querySelector('.jsSelectInput');
            jsSelectInput.setAttribute('disabled', true);

            const jsNewEmpSelectUl = jsNewEmpSelectMainContCity.querySelector('.jsNewEmpSelectUl');
            jsNewEmpSelectUl.classList.add('display-none')
        })();

        //disable select input - barangay
        (function () {
            const jsNewEmpSelectMainContBarangay = document.querySelector('.jsNewEmpSelectMainContBarangay');

            const jsNewEmpSelectInputArrowCont = jsNewEmpSelectMainContBarangay.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.add('new-emp-input-disabled');

            const jsNewEmpSelectArrowContAdress = jsNewEmpSelectMainContBarangay.querySelector('.jsNewEmpSelectArrowContAdress');
            jsNewEmpSelectArrowContAdress.removeEventListener('click', handleClickArrowAddressBarangay)
            jsNewEmpSelectArrowContAdress.classList.add('arrow-cont-disabled');

            const jsSelectInput = jsNewEmpSelectMainContBarangay.querySelector('.jsSelectInput');
            jsSelectInput.setAttribute('disabled', true);

            const jsNewEmpSelectUl = jsNewEmpSelectMainContBarangay.querySelector('.jsNewEmpSelectUl');
            jsNewEmpSelectUl.classList.add('display-none')
        })();
 
    }

    function handleClickEditAddress() {
        //enable and attached event listener to cancel button
        const jsNewEmpCancelBtnAddress = document.querySelector('.jsNewEmpCancelBtnAddress');
        jsNewEmpCancelBtnAddress.addEventListener('click', handleClickCancelBtn)
    }

    async function handleClickSaveJobDescriptions(e) {
        //check if personal info is already saved
        if (persInfoDataObj.isPersonalInfoSaved == false) {
            alertCustom.isConfirmedOk(alertContainer.warningAlert, 'Save personal information first!')
            return;
        }

        //validate inputs
        if (!validateInputInformation(e)) return

        const formData = new FormData();
        formData.append('UserMasterPersonID', 1);
        formData.append('MasterPersonID', persInfoDataObj.masterPersonID);

        const inputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('input');
        inputs.forEach(input => {
            if (input.classList.contains('jsSelectInput')) {
                formData.append(input.getAttribute('name'), input.getAttribute('data-id'));
            } else {
                formData.append(input.getAttribute('name'), input.value.trim());
            }
        })

        const options = {
            method: 'POST',
            body: formData
        }

        //actual fetch to database
        const jobdescReturnData = await fetchData.postData('save-new-employee-jobdescriptions', options);
        if (jobdescReturnData == null) return;
        console.log(jobdescReturnData)

        jobDescriptionDataObj.position = jobdescReturnData.positionName
        jobDescriptionDataObj.positionID = jobdescReturnData.positionID
        jobDescriptionDataObj.department = jobdescReturnData.departmentName
        jobDescriptionDataObj.departmentID = jobdescReturnData.departmentID
        jobDescriptionDataObj.remarks = jobdescReturnData.remarks

        //disable button
        e.target.removeEventListener('click', handleClickSaveJobDescriptions);
        e.target.classList.add('new-emp-btn-disabled');

        const jsInputEditBtns = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsInputEditBtn');
        jsInputEditBtns.forEach(button => {
            button.addEventListener('click', handleClickEditInputBtn);
            button.classList.remove('new-emp-btn-disabled');

        })

        //disable inputs
        const jsPureInputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsPureInput');
        jsPureInputs.forEach(input => {
            input.setAttribute('disabled', true);
            input.classList.add('new-emp-input-disabled');
        });

        //disable select input - position
        (function () {
            const jsNewEmpSelectMainContPosition = document.querySelector('.jsNewEmpSelectMainContPosition');

            const jsNewEmpSelectInputArrowCont = jsNewEmpSelectMainContPosition.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.add('new-emp-input-disabled');

            const jsNewEmpSelectArrowCont = jsNewEmpSelectMainContPosition.querySelector('.jsNewEmpSelectArrowCont');
            jsNewEmpSelectArrowCont.removeEventListener('click', handleClickArrowPositionSelect)
            jsNewEmpSelectArrowCont.classList.add('arrow-cont-disabled');

            const jsSelectInput = jsNewEmpSelectMainContPosition.querySelector('.jsSelectInput');
            jsSelectInput.setAttribute('disabled', true);

            const jsNewEmpSelectUl = jsNewEmpSelectMainContPosition.querySelector('.jsNewEmpSelectUl');
            jsNewEmpSelectUl.classList.add('display-none')
        })();

        //disable select input - department
        (function () {
            const jsNewEmpSelectMainContDepartment = document.querySelector('.jsNewEmpSelectMainContDepartment');

            const jsNewEmpSelectInputArrowCont = jsNewEmpSelectMainContDepartment.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.add('new-emp-input-disabled');

            const jsNewEmpSelectArrowCont = jsNewEmpSelectMainContDepartment.querySelector('.jsNewEmpSelectArrowCont');
            jsNewEmpSelectArrowCont.removeEventListener('click', handleClickArrowDepartmentSelect)
            jsNewEmpSelectArrowCont.classList.add('arrow-cont-disabled');

            const jsSelectInput = jsNewEmpSelectMainContDepartment.querySelector('.jsSelectInput');
            jsSelectInput.setAttribute('disabled', true);

            const jsNewEmpSelectUl = jsNewEmpSelectMainContDepartment.querySelector('.jsNewEmpSelectUl');
            jsNewEmpSelectUl.classList.add('display-none')
        })();

        //enable and attached event listener to cancel button
        const jsNewEmpCancelBtnJobDesc = document.querySelector('.jsNewEmpCancelBtnJobDesc');
        jsNewEmpCancelBtnJobDesc.addEventListener('click', handleClickCancelBtn)
    }

    async function handleClickSaveCompensations(e) {

        //check if personal info is already saved
        if (persInfoDataObj.isPersonalInfoSaved == false) {
            alertCustom.isConfirmedOk(alertContainer.warningAlert, 'Save personal information first!')
            return;
        }

        //validate inputs
        if (!validateInputInformation(e)) return;

        //save actual data


        const formData = new FormData();
        formData.append('UserMasterPersonID', 1);
        formData.append('MasterPersonID', persInfoDataObj.masterPersonID);
        const inputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('input');
        inputs.forEach(input => {
            if (input.classList.contains('jsSelectInput')) {
                formData.append(input.getAttribute('name'), input.getAttribute('data-id'));
            } else {
                formData.append(input.getAttribute('name'), input.value.trim());
            }
        })

        const options = {
            method: 'POST',
            body: formData
        }

        //actual fetch to database
        const compensationReturnData = await fetchData.postData('save-new-employee-compensation', options);
        if (compensationReturnData == null) return;

        console.log(compensationReturnData)

        compensationDataObj.ratePeriod = compensationReturnData.ratePeriodName
        compensationDataObj.ratePeriodID = compensationReturnData.ratePeriodID
        compensationDataObj.basicSalary = compensationReturnData.basicSalary
        compensationDataObj.allowance = compensationReturnData.allowance
        compensationDataObj.salaryCondition = compensationReturnData.salaryConditionName
        compensationDataObj.salaryConditionID = compensationReturnData.salaryConditionID

        console.log(compensationDataObj);



        //disable button
        (function () {
            e.target.removeEventListener('click', handleClickSaveCompensations);
            e.target.classList.add('new-emp-btn-disabled');

            const jsInputEditBtns = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsInputEditBtn');
            jsInputEditBtns.forEach(button => {
                button.addEventListener('click', handleClickEditInputBtn);
                button.classList.remove('new-emp-btn-disabled');
            })
        })();

        //disable inputs
        (function () {
            const jsPureInputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsPureInput');
            jsPureInputs.forEach(input => {
                input.setAttribute('disabled', true);
                input.classList.add('new-emp-input-disabled');
            });
        })();


        //disable select input - rate period
        (function () {
            const jsNewEmpSelectMainContRatePeriod = document.querySelector('.jsNewEmpSelectMainContRatePeriod');

            const jsNewEmpSelectInputArrowCont = jsNewEmpSelectMainContRatePeriod.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.add('new-emp-input-disabled');

            const jsNewEmpSelectArrowCont = jsNewEmpSelectMainContRatePeriod.querySelector('.jsNewEmpSelectArrowCont');
            jsNewEmpSelectArrowCont.removeEventListener('click', handleClickArrowRatePeriodSelect)
            jsNewEmpSelectArrowCont.classList.add('arrow-cont-disabled');

            const jsSelectInput = jsNewEmpSelectMainContRatePeriod.querySelector('.jsSelectInput');
            jsSelectInput.setAttribute('disabled', true);

            const jsNewEmpSelectUl = jsNewEmpSelectMainContRatePeriod.querySelector('.jsNewEmpSelectUl');
            jsNewEmpSelectUl.classList.add('display-none')
        })();

        //disable select input - salary condition
        (function () {
            const jsNewEmpSelectMainContSalaryCondition = document.querySelector('.jsNewEmpSelectMainContSalaryCondition');

            const jsNewEmpSelectInputArrowCont = jsNewEmpSelectMainContSalaryCondition.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.add('new-emp-input-disabled');

            const jsNewEmpSelectArrowCont = jsNewEmpSelectMainContSalaryCondition.querySelector('.jsNewEmpSelectArrowCont');
            jsNewEmpSelectArrowCont.removeEventListener('click', handleClickArrowSalaryConditionSelect)
            jsNewEmpSelectArrowCont.classList.add('arrow-cont-disabled');

            const jsSelectInput = jsNewEmpSelectMainContSalaryCondition.querySelector('.jsSelectInput');
            jsSelectInput.setAttribute('disabled', true);

            const jsNewEmpSelectUl = jsNewEmpSelectMainContSalaryCondition.querySelector('.jsNewEmpSelectUl');
            jsNewEmpSelectUl.classList.add('display-none')
        })();

        //enable and attached event listener to cancel button
        const jsNewEmpCancelBtnCompensation = document.querySelector('.jsNewEmpCancelBtnCompensation');
        jsNewEmpCancelBtnCompensation.addEventListener('click', handleClickCancelBtn)
    }

    function handleClickEditInputBtn(e) {

        //check if has already active inputs
        if (checkIfThereAreAcitveInputAndSaveBtn()) return;

        //enable edit button
        e.target.removeEventListener('click', handleClickEditInputBtn);
        e.target.addEventListener('click', handleClickSaveInputBtn);
        e.target.classList.add('new-emp-save-btn')
        e.target.textContent = 'save';
        e.target.setAttribute('data-issavedmode', true)

        //enable input
        if (e.target.classList.contains('jsSelectInputEditBtn')) {
            const jsNewEmpIndItemCont = e.target.closest('.jsNewEmpIndItemCont');

            const jsNewEmpSelectInputArrowCont = jsNewEmpIndItemCont.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.remove('new-emp-input-disabled');

            const jsNewEmpSelectArrowCont = jsNewEmpIndItemCont.querySelector('.jsNewEmpSelectArrowCont');
            jsNewEmpSelectArrowCont.classList.remove('arrow-cont-disabled');

            if (jsNewEmpSelectArrowCont.getAttribute('name') == 'CivilStatus') {
                jsNewEmpSelectArrowCont.addEventListener('click', handleClickArrowCivilStatusSelect)
            } else if (jsNewEmpSelectArrowCont.getAttribute('name') == 'Gender') {
                jsNewEmpSelectArrowCont.addEventListener('click', handleClickArrowGenderSelect)
            } else if (jsNewEmpSelectArrowCont.getAttribute('name') == 'Position') {
                jsNewEmpSelectArrowCont.addEventListener('click', handleClickArrowPositionSelect)
            } else if (jsNewEmpSelectArrowCont.getAttribute('name') == 'Department') {
                jsNewEmpSelectArrowCont.addEventListener('click', handleClickArrowDepartmentSelect)
            } else if (jsNewEmpSelectArrowCont.getAttribute('name') == 'RatePeriod') {
                jsNewEmpSelectArrowCont.addEventListener('click', handleClickArrowRatePeriodSelect)
            } else if (jsNewEmpSelectArrowCont.getAttribute('name') == 'SalaryCondition') {
                jsNewEmpSelectArrowCont.addEventListener('click', handleClickArrowSalaryConditionSelect)
            }

            const jsSelectInput = jsNewEmpIndItemCont.querySelector('.jsSelectInput');
            jsSelectInput.removeAttribute('disabled');

        } else {
            const input = e.target.closest('.jsNewEmpIndItemCont').querySelector('input')
            input.removeAttribute('disabled');
            input.classList.remove('new-emp-input-disabled');
        }

    }

    async function handleClickSaveInputBtn(e) {

        const formData = new FormData();
        formData.append('MasterPersonID', persInfoDataObj.masterPersonID);
        formData.append('UserMasterPersonID', 1)
        if (e.target.classList.contains('jsSelectInputEditBtn')) {
            const input = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsSelectInput');
            if (input.hasAttribute('required')) {
                if (input.getAttribute('data-id') == 'undefined' || input.getAttribute('data-id') == 0 || input.getAttribute('data-id') == null) {
                    input.closest('.jsNewEmpSelectInputArrowCont').classList.add('invalid');
                    return;
                } else {
                    input.closest('.jsNewEmpSelectInputArrowCont').classList.remove('invalid');
                    formData.append('Name', input.getAttribute('name'))
                    formData.append('Value', input.getAttribute('data-id'))
                }

            } else {
                formData.append('Name', input.getAttribute('name'))
                formData.append('Value', input.getAttribute('data-id'))
            }
        } else {
            const input = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsPureInput');
            if (input.hasAttribute('required')) {
                if (isNullOrWhiteSpace(input.value.trim())) {
                    input.classList.add('invalid');
                    return;
                } else {
                    input.classList.remove('invalid');
                    formData.append('Name', input.getAttribute('name'))
                    formData.append('Value', input.value)
                }
            } else {
                formData.append('Name', input.getAttribute('name'))
                formData.append('Value', input.value)
            }
        }

        const options = {
            method: 'POST',
            body: formData
        }

        const updateData = await fetchData.postData('update-new-employee-ind-info', options)
        if (updateData == null) return;

        //update local data
        saveIndInfoToLocalDataObjectAfterUpdate(updateData)


        //change button and disable input
        disableInputAndTurnButtonToEdit(e.target)
    }

    function handleClickArrowCivilStatusSelect(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');

        jsNewEmpSelectUl.innerHTML = '';

        jsNewEmpSelectUl.classList.toggle('display-none');

        let arr = civilStatusLinkedList.getAll();
        let htmlString;

        htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id=${defaultValueSelectLi.dataID}>${defaultValueSelectLi.value}<li/>`
        let jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
        jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
        jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);

        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.civilStatusID}">${item.civilStatusName}<li/>`
            jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })
    }

    function handleClickArrowGenderSelect(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');

        jsNewEmpSelectUl.innerHTML = '';

        jsNewEmpSelectUl.classList.toggle('display-none');

        let arr = genderLinkedList.getAll();
        let htmlString;

        htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id=${defaultValueSelectLi.dataID}>${defaultValueSelectLi.value}<li/>`
        let jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
        jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
        jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);

        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.genderID}">${item.genderName}<li/>`
            jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })
    }

    function handleClickArrowPositionSelect(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');

        jsNewEmpSelectUl.innerHTML = '';

        jsNewEmpSelectUl.classList.toggle('display-none');

        let arr = positionLinkedList.getAll();
        let htmlString;

        htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id=${defaultValueSelectLi.dataID}>${defaultValueSelectLi.value}<li/>`
        let jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
        jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
        jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);

        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.positionID}">${item.positionName}<li/>`
            jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })
    }

    function handleClickArrowDepartmentSelect(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');

        jsNewEmpSelectUl.innerHTML = '';

        jsNewEmpSelectUl.classList.toggle('display-none');

        let arr = departmentLinkedList.getAll();
        let htmlString;

        htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id=${defaultValueSelectLi.dataID}>${defaultValueSelectLi.value}<li/>`
        let jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
        jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
        jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);

        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.departmentID}">${item.departmentName}<li/>`
            jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })
    }

    function handleClickArrowRatePeriodSelect(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');

        jsNewEmpSelectUl.innerHTML = '';

        jsNewEmpSelectUl.classList.toggle('display-none');

        let arr = ratePeriodLinkedList.getAll();
        let htmlString;

        htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id=${defaultValueSelectLi.dataID}>${defaultValueSelectLi.value}<li/>`
        const jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
        jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
        jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);

        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.ratePeriodID}">${item.ratePeriodName}<li/>`
            const jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })
    }

    function handleClickArrowSalaryConditionSelect(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');

        jsNewEmpSelectUl.innerHTML = '';

        jsNewEmpSelectUl.classList.toggle('display-none');

        let arr = salaryConditionLinkedList.getAll();
        let htmlString;

        htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id=${defaultValueSelectLi.dataID}>${defaultValueSelectLi.value}<li/>`
        let jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
        jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
        jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);

        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.salaryConditionID}">${item.salaryConditionName}<li/>`
            jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
            jsNewEmpSelectLi.addEventListener('click', handleClickNewEmpSelectLi)
            jsNewEmpSelectUl.appendChild(jsNewEmpSelectLi);
        })

    }

    function handleClickNewEmpSelectLi(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpSelectUl');
        jsNewEmpSelectUl.classList.toggle('display-none');

        const jsSelectInput = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsSelectInput');
        jsSelectInput.value = e.target.textContent;
        jsSelectInput.setAttribute('data-id', e.target.getAttribute('data-id'));

        //for addresses
        if (e.target.hasAttribute('data-topid')) {
            jsSelectInput.setAttribute('data-topid', e.target.getAttribute('data-topid'));
        }
    }

    function handleClickNewEmpSelectLiRegion(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpSelectUl');
        jsNewEmpSelectUl.classList.toggle('display-none');

        const jsSelectInput = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsSelectInput');
        jsSelectInput.value = e.target.textContent;
        jsSelectInput.setAttribute('data-id', e.target.getAttribute('data-id'));

        if (e.target.hasAttribute('data-topid')) {
            jsSelectInput.setAttribute('data-topid', e.target.getAttribute('data-topid'));
        }

        //update provinceSelectedLinkedList
        const regionID = e.target.getAttribute('data-id')
        const arr = provinceLinkedList.getSelectedValueArr('regionID', regionID)
        provinceSelectedLinkedList = new LinkedList(arr[0]);
        for (let i = 1; i < arr.length; i++) {
            provinceSelectedLinkedList.push(arr[i])
        }

        //clear down elements
        const jsSelectInputProvince = document.querySelector('.jsSelectInputProvince');
        jsSelectInputProvince.value = '';
        jsSelectInputProvince.removeAttribute('data-id');

        const jsSelectInputCity = document.querySelector('.jsSelectInputCity');
        jsSelectInputCity.value = '';
        jsSelectInputCity.removeAttribute('data-id');

        const jsSelectInputBarangay = document.querySelector('.jsSelectInputBarangay');
        jsSelectInputBarangay.value = '';
        jsSelectInputBarangay.removeAttribute('data-id');
    }

    function handleClickNewEmpSelectLiProvince(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpSelectUl');
        jsNewEmpSelectUl.classList.toggle('display-none');

        const jsSelectInput = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsSelectInput');
        jsSelectInput.value = e.target.textContent;
        jsSelectInput.setAttribute('data-id', e.target.getAttribute('data-id'));

        if (e.target.hasAttribute('data-topid')) {
            jsSelectInput.setAttribute('data-topid', e.target.getAttribute('data-topid'));
        }

        //update citySelectedLinkedList
        const provinceID = e.target.getAttribute('data-id')
        const arr = cityLinkedList.getSelectedValueArr('provinceID', provinceID)
        citySelectedLinkedList = new LinkedList(arr[0]);
        for (let i = 1; i < arr.length; i++) {
            citySelectedLinkedList.push(arr[i])
        }

        //clear down elements
        const jsSelectInputCity = document.querySelector('.jsSelectInputCity');
        jsSelectInputCity.value = '';
        jsSelectInputCity.removeAttribute('data-id');

        const jsSelectInputBarangay = document.querySelector('.jsSelectInputBarangay');
        jsSelectInputBarangay.value = '';
        jsSelectInputBarangay.removeAttribute('data-id');
    }

    async function handleClickNewEmpSelectLiCity(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpSelectUl');
        jsNewEmpSelectUl.classList.toggle('display-none');

        const jsSelectInput = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsSelectInput');
        jsSelectInput.value = e.target.textContent;
        jsSelectInput.setAttribute('data-id', e.target.getAttribute('data-id'));

        if (e.target.hasAttribute('data-topid')) {
            jsSelectInput.setAttribute('data-topid', e.target.getAttribute('data-topid'));
        }

        //update barangaySelectedLinkedList
        const cityID = e.target.getAttribute('data-id')
        const formData = new FormData();
        formData.append('cityID', cityID)

        const options = {
            method: 'POST',
            body: formData
        }

        const barangayData = await fetchData.postData('get-new-employee-barangay-list', options)
        console.log(barangayData)

        let arr = Array.from(barangayData.barangayList)

        barangaySelectedLinkedList = new LinkedList(arr[0]);
        for (let i = 1; i < arr.length; i++) {
            barangaySelectedLinkedList.push(arr[i])
        }

        //clear down elements
        const jsSelectInputBarangay = document.querySelector('.jsSelectInputBarangay');
        jsSelectInputBarangay.value = '';
        jsSelectInputBarangay.removeAttribute('data-id');

        //change province value
        const provinceID = e.target.getAttribute('data-topid');
        const province = provinceLinkedList.getByPropertyNameAndValue('provinceID', provinceID);
        const provinceName = province.provinceName;
        const jsSelectInputProvince = document.querySelector('.jsSelectInputProvince');
        jsSelectInputProvince.value = provinceName;
        jsSelectInputProvince.setAttribute('data-id', provinceID);
        jsSelectInputProvince.setAttribute('data-topid', province.regionID);

        //update citySelectedLinkedList value
        arr = cityLinkedList.getSelectedValueArr('provinceID', provinceID)
        citySelectedLinkedList = new LinkedList(arr[0])
        for (let i = 1; i < arr.length; i++) {
            citySelectedLinkedList.push(arr[i])
        }

        //change region value
        const regionID = province.regionID;
        const region = regionLinkedList.getByPropertyNameAndValue('regionID', regionID);
        const regionName = region.regionName;
        const jsSelectInputRegion = document.querySelector('.jsSelectInputRegion');
        jsSelectInputRegion.value = regionName;
        jsSelectInputRegion.setAttribute('data-id', regionID);
        jsSelectInputRegion.setAttribute('data-topid', region.countryID);

        //update provinceSelectedLinkedList value
        arr = provinceLinkedList.getSelectedValueArr('regionID', regionID)
        provinceSelectedLinkedList = new LinkedList(arr[0])
        for (let i = 1; i < arr.length; i++) {
            provinceSelectedLinkedList.push(arr[i])
        }

        //change country value
        const countryID = region.countryID
        const country = countryLinkedList.getByPropertyNameAndValue('countryID', countryID);
        const countryName = country.countryName

        const jsSelectInputCountry = document.querySelector('.jsSelectInputCountry');
        jsSelectInputCountry.value = countryName;
        jsSelectInputCountry.setAttribute('data-id', countryID)
    }

    async function handleClickNewEmpSelectLiBarangay(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpSelectUl');
        jsNewEmpSelectUl.classList.toggle('display-none');

        const jsSelectInput = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsSelectInput');
        jsSelectInput.value = e.target.textContent;
        jsSelectInput.setAttribute('data-id', e.target.getAttribute('data-id'));

        if (e.target.hasAttribute('data-topid')) {
            jsSelectInput.setAttribute('data-topid', e.target.getAttribute('data-topid'));
        }

    }

    function handleClickCancelBtn(e) {
        const jsInputEditBtns = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsInputEditBtn');
        jsInputEditBtns.forEach(button => {
            disableInputAndTurnButtonToEdit(button);
        })

        //restore data
        if (e.target.getAttribute('name') == 'persinfo') {
            restoreDataPersonalInfo()
        } else if (e.target.getAttribute('name') == 'benifit') {
            restoreDataBenifits()
        } else if (e.target.getAttribute('name') == 'contact') {
            restoreDataContacts()
        } else if (e.target.getAttribute('name') == 'jobdescription') {
            restoreDataJobDescription()
        } else if (e.target.getAttribute('name') == 'compensation') {
            restoreDataCompensation()
        } else if (e.target.getAttribute('name') == 'address') {
            restoreDataAddresses()
        }
    }

    function restoreDataPersonalInfo() {

        const jsPureInputFirstName = document.querySelector('.jsPureInputFirstName');
        jsPureInputFirstName.value = persInfoDataObj.firstName;

        const jsPureInputMiddleName = document.querySelector('.jsPureInputMiddleName');
        jsPureInputMiddleName.value = persInfoDataObj.middleName;

        const jsPureInputLastName = document.querySelector('.jsPureInputLastName');
        jsPureInputLastName.value = persInfoDataObj.lastName;

        const jsPureInputDateOfBirth = document.querySelector('.jsPureInputDateOfBirth');
        jsPureInputDateOfBirth.value = persInfoDataObj.dateOfBirth;

        const jsSelectInputCivilStatus = document.querySelector('.jsSelectInputCivilStatus');
        jsSelectInputCivilStatus.value = persInfoDataObj.civilStatus;
        jsSelectInputCivilStatus.setAttribute('data-id', persInfoDataObj.civilStatusID)

        const jsSelectInputGender = document.querySelector('.jsSelectInputGender');
        jsSelectInputGender.value = persInfoDataObj.gender;
        jsSelectInputGender.setAttribute('data-id', persInfoDataObj.genderID)

    }

    function restoreDataBenifits() {
        const jsPureInputSssNumber = document.querySelector('.jsPureInputSssNumber');
        jsPureInputSssNumber.value = benifitsDataObj.sssNo;

        const jsPureInputPhilhealthNumber = document.querySelector('.jsPureInputPhilhealthNumber');
        jsPureInputPhilhealthNumber.value = benifitsDataObj.philHealthNo;

        const jsPureInputPagibigNumber = document.querySelector('.jsPureInputPagibigNumber');
        jsPureInputPagibigNumber.value = benifitsDataObj.pagibigNo;

        const jsPureInputTinNumber = document.querySelector('.jsPureInputTinNumber');
        jsPureInputTinNumber.value = benifitsDataObj.tinNo;
    }

    function restoreDataContacts() {
        const jsPureInputMobileNumber = document.querySelector('.jsPureInputMobileNumber');
        jsPureInputMobileNumber.value = contactsDataObj.mobileNo;

        const jsPureInputLandlineNumber = document.querySelector('.jsPureInputLandlineNumber');
        jsPureInputLandlineNumber.value = contactsDataObj.landlineNo;

        const jsPureInputEmailAddress = document.querySelector('.jsPureInputEmailAddress');
        jsPureInputEmailAddress.value = contactsDataObj.emailAdd;

    }

    function restoreDataJobDescription() {
        const jsSelectInputPosition = document.querySelector('.jsSelectInputPosition');
        jsSelectInputPosition.value = jobDescriptionDataObj.position;
        jsSelectInputPosition.setAttribute('data-id', jobDescriptionDataObj.positionID)

        const jsSelectInputDepartment = document.querySelector('.jsSelectInputDepartment');
        jsSelectInputDepartment.value = jobDescriptionDataObj.department;
        jsSelectInputDepartment.setAttribute('data-id', jobDescriptionDataObj.departmentID)

        const jsPureInputRemarks = document.querySelector('.jsPureInputRemarks');
        jsPureInputRemarks.value = jobDescriptionDataObj.remarks;

    }

    function restoreDataCompensation() {
        const jsSelectInputRatePeriod = document.querySelector('.jsSelectInputRatePeriod');
        jsSelectInputRatePeriod.value = compensationDataObj.ratePeriod;
        jsSelectInputRatePeriod.setAttribute('data-id', compensationDataObj.ratePeriodID)

        const jsPureInputBasicSalary = document.querySelector('.jsPureInputBasicSalary');
        jsPureInputBasicSalary.value = compensationDataObj.basicSalary;

        const jsPureInputAllowance = document.querySelector('.jsPureInputAllowance');
        jsPureInputAllowance.value = compensationDataObj.allowance;

        const jsSelectInputSalaryCondition = document.querySelector('.jsSelectInputSalaryCondition');
        jsSelectInputSalaryCondition.value = compensationDataObj.salaryCondition;
        jsSelectInputSalaryCondition.setAttribute('data-id', compensationDataObj.salaryConditionID)
    }

    async function restoreDataAddresses() {
        const jsSelectInputCountry = document.querySelector('.jsSelectInputCountry');
        jsSelectInputCountry.value = addressDataObj.countryName;
        jsSelectInputCountry.setAttribute('data-id', countryID);

        const jsSelectInputRegion = document.querySelector('.jsSelectInputRegion');
        jsSelectInputRegion.value = addressDataObj.regionName;
        jsSelectInputRegion.setAttribute('data-id', addressDataObj.regionID);

        if (addressDataObj.regionID == '') {
            provinceSelectedLinkedList = null;
        } else {
            let arr = provinceLinkedList.getSelectedValueArr('regionID', addressDataObj.regionID)
            provinceSelectedLinkedList = new LinkedList(arr[0])
            for (let i = 1; i < arr.length; i++) {
                provinceSelectedLinkedList.push(arr[i])
            }
        }


        const jsSelectInputProvince = document.querySelector('.jsSelectInputProvince');
        jsSelectInputProvince.value = addressDataObj.provinceName;
        jsSelectInputProvince.setAttribute('data-id', addressDataObj.provinceID);

        if (addressDataObj.provinceID == '') {
            citySelectedLinkedList = null;
        } else {
            let arr = cityLinkedList.getSelectedValueArr('regionID', addressDataObj.provinceID)
            citySelectedLinkedList = new LinkedList(arr[0])
            for (let i = 1; i < arr.length; i++) {
                citySelectedLinkedList.push(arr[i])
            }
        }

        const jsSelectInputCity = document.querySelector('.jsSelectInputCity');
        jsSelectInputCity.value = addressDataObj.cityName;
        jsSelectInputCity.setAttribute('data-id', addressDataObj.cityID);

        if (addressDataObj.cityID == '') {
            barangaySelectedLinkedList = null;
        } else {
            const cityID = addressDataObj.cityID
            const formData = new FormData();
            formData.append('cityID', cityID)

            const options = {
                method: 'POST',
                body: formData
            }

            const barangayData = await fetchData.postData('get-new-employee-barangay-list', options)
            console.log(barangayData)

            let arr = Array.from(barangayData.barangayList)

            barangaySelectedLinkedList = new LinkedList(arr[0]);
            for (let i = 1; i < arr.length; i++) {
                barangaySelectedLinkedList.push(arr[i])
            }
        }


        const jsSelectInputBarangay = document.querySelector('.jsSelectInputBarangay');
        jsSelectInputBarangay.value = addressDataObj.barangayName;
        jsSelectInputBarangay.setAttribute('data-id', addressDataObj.barangayID);

        const jsPureInputAddressLine1 = document.querySelector('.jsPureInputAddressLine1');
        jsPureInputAddressLine1.value = addressDataObj.addressLine1;

        const jsPureInputAddressLine2 = document.querySelector('.jsPureInputAddressLine2');
        jsPureInputAddressLine2.value = addressDataObj.addressLine2;

    }

    function checkIfThereAreAcitveInputAndSaveBtn() {
        let isThereActiveSaveButton = false;
        const buttons = Array.from(document.querySelectorAll('.jsInputEditBtn'));

        for (let i = 0; i < buttons.length; i++) {
            const isSavedMode = buttons[i].getAttribute('data-issavedmode');
            if (isSavedMode == 'true') {
                isThereActiveSaveButton = true;
                const input = buttons[i].closest('.jsNewEmpIndItemCont').querySelector('input');
                input.focus();
                break;
            }
        }

        return isThereActiveSaveButton;
    }

    function disableInputAndTurnButtonToEdit(button) {
        //enable edit button
        button.removeEventListener('click', handleClickSaveInputBtn);
        button.addEventListener('click', handleClickEditInputBtn);
        button.classList.remove('new-emp-save-btn')
        button.textContent = 'edit';
        button.setAttribute('data-issavedmode', false)


        //disable input
        if (button.classList.contains('jsSelectInputEditBtn')) {
            const jsNewEmpIndItemCont = button.closest('.jsNewEmpIndItemCont');

            const jsNewEmpSelectInputArrowCont = jsNewEmpIndItemCont.querySelector('.jsNewEmpSelectInputArrowCont');
            jsNewEmpSelectInputArrowCont.classList.add('new-emp-input-disabled');
            jsNewEmpSelectInputArrowCont.classList.remove('invalid');

            const jsNewEmpSelectUl = button.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');
            jsNewEmpSelectUl.classList.add('display-none');

            const jsNewEmpSelectArrowCont = jsNewEmpIndItemCont.querySelector('.jsNewEmpSelectArrowCont');
            jsNewEmpSelectArrowCont.classList.add('arrow-cont-disabled');

            if (jsNewEmpSelectArrowCont.getAttribute('name') == 'CivilStatus') {
                jsNewEmpSelectArrowCont.removeEventListener('click', handleClickArrowCivilStatusSelect)
            } else if (jsNewEmpSelectArrowCont.getAttribute('name') == 'Gender') {
                jsNewEmpSelectArrowCont.removeEventListener('click', handleClickArrowGenderSelect)
            } else if (jsNewEmpSelectArrowCont.getAttribute('name') == 'Position') {
                jsNewEmpSelectArrowCont.removeEventListener('click', handleClickArrowPositionSelect)
            } else if (jsNewEmpSelectArrowCont.getAttribute('name') == 'Department') {
                jsNewEmpSelectArrowCont.removeEventListener('click', handleClickArrowDepartmentSelect)
            } else if (jsNewEmpSelectArrowCont.getAttribute('name') == 'RatePeriod') {
                jsNewEmpSelectArrowCont.removeEventListener('click', handleClickArrowRatePeriodSelect)
            } else if (jsNewEmpSelectArrowCont.getAttribute('name') == 'SalaryCondition') {
                jsNewEmpSelectArrowCont.removeEventListener('click', handleClickArrowSalaryConditionSelect)
            }

            const jsSelectInput = jsNewEmpIndItemCont.querySelector('.jsSelectInput');
            jsSelectInput.setAttribute('disabled', true);

        } else {
            const input = button.closest('.jsNewEmpIndItemCont').querySelector('input')
            input.setAttribute('disabled', true);
            input.classList.add('new-emp-input-disabled');
            input.classList.remove('invalid');
        }
    }

    function validateInputInformation(e) {
        let isValid = true;
        //check if required
        const inputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('input');
        inputs.forEach(input => {
            if (input.hasAttribute('required')) {
                if (isNullOrWhiteSpace(input.value.trim()) == true) {
                    if (input.classList.contains('jsSelectInput')) {
                        input.closest('.jsNewEmpSelectInputArrowCont').classList.add('invalid')
                        isValid = false;
                    } else {
                        input.classList.add('invalid')
                        isValid = false;
                    }

                } else {
                    if (input.classList.contains('jsSelectInput')) {
                        input.closest('.jsNewEmpSelectInputArrowCont').classList.remove('invalid')
                    } else {
                        input.classList.remove('invalid')
                    }
                }
            }

        })

        return isValid;
    }

    function saveIndInfoToLocalDataObjectAfterUpdate(returnData) {
        if (returnData.name == 'FirstName') {
            persInfoDataObj.firstName = returnData.value
        } else if (returnData.name == 'MiddleName') {
            persInfoDataObj.middleName = returnData.value
        } else if (returnData.name == 'LastName') {
            persInfoDataObj.lastName = returnData.value
        } else if (returnData.name == 'DateOfBirth') {
            persInfoDataObj.dateOfBirth = returnData.value
        } else if (returnData.name == 'Gender') {
            persInfoDataObj.genderID = returnData.value
            const arr = genderLinkedList.getAll();
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].genderID == returnData.value) {
                    persInfoDataObj.gender = arr[i].genderName;
                    break;
                }
            }
        } else if (returnData.name == 'CivilStatus') {
            persInfoDataObj.civilStatusID = returnData.value
            const arr = civilStatusLinkedList.getAll();
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].civilStatusID == returnData.value) {
                    persInfoDataObj.civilStatus = arr[i].civilStatusName;
                    break;
                }
            }
        } else if (returnData.name == 'SssNumber') {
            benifitsDataObj.sssNo = returnData.value
        } else if (returnData.name == 'PhilHealthNumber') {
            benifitsDataObj.philHealthNo = returnData.value
        } else if (returnData.name == 'PagIbigNumber') {
            benifitsDataObj.pagibigNo = returnData.value
        } else if (returnData.name == 'TinNumber') {
            benifitsDataObj.tinNo = returnData.value
        } else if (returnData.name == 'MobileNumber') {
            contactsDataObj.mobileNo = returnData.value
        } else if (returnData.name == 'LandLineNumber') {
            contactsDataObj.landlineNo = returnData.value
        } else if (returnData.name == 'EmailAddress') {
            contactsDataObj.emailAdd = returnData.value
        } else if (returnData.name == 'Position') {
            jobDescriptionDataObj.positionID = returnData.value
            const arr = positionLinkedList.getAll();
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].positionID == returnData.value) {
                    jobDescriptionDataObj.position = arr[i].positionName;
                    break;
                }
            }
        } else if (returnData.name == 'Department') {
            jobDescriptionDataObj.departmentID = returnData.value
            const arr = departmentLinkedList.getAll();
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].departmentID == returnData.value) {
                    jobDescriptionDataObj.department = arr[i].departmentName;
                    break;
                }
            }
        } else if (returnData.name == 'Remarks') {
            jobDescriptionDataObj.remarks = returnData.value
        } else if (returnData.name == 'RatePeriod') {
            compensationDataObj.ratePeriodID = returnData.value
            const arr = ratePeriodLinkedList.getAll();
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].ratePeriodID == returnData.value) {
                    compensationDataObj.ratePeriod = arr[i].ratePeriodName;
                    break;
                }
            }
        } else if (returnData.name == 'BasicSalary') {
            compensationDataObj.basicSalary = returnData.value
        } else if (returnData.name == 'Allowance') {
            compensationDataObj.allowance = returnData.value
        } else if (returnData.name == 'SalaryCondition') {
            compensationDataObj.salaryConditionID = returnData.value
            const arr = salaryConditionLinkedList.getAll();
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].salaryConditionID == returnData.value) {
                    compensationDataObj.salaryCondition = arr[i].salaryConditionName;
                    break;
                }
            }
        }
    }
}
