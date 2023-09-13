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

    //city linkedlist
    let cityLinkedList = new LinkedList(newEmpData.cityList[0])
    for (let i = 1; i < newEmpData.cityList.length; i++) {
        cityLinkedList.push(newEmpData.cityList[i])
    }

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


    async function handleClickSavePersonalInfo(e) {
        //validate inputs
        if (!validateInputPersonalInfo(e)) return;

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
        if (!validateInputPersonalInfo(e)) return

        //save actual data
        const formData = new FormData();
        formData.append('UserMasterPersonID', 1);
        formData.append('MasterPersonID', persInfoDataObj.masterPersonID);

        const inputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('input');
        inputs.forEach(input => {
            formData.append(input.getAttribute('name'), input.value.trim());
        })

        const opitons = {
            method: 'POST',
            body: formData
        }

        //actual fetch to database
        const benifitsReturnData = await fetchData.postData('save-new-employee-benifits', opitons);
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
        if (!validateInputPersonalInfo(e)) return

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

    async function handleClickSaveJobDescriptions(e) {
        //check if personal info is already saved
        if (persInfoDataObj.isPersonalInfoSaved == false) {
            alertCustom.isConfirmedOk(alertContainer.warningAlert, 'Save personal information first!')
            return;
        }

        //validate inputs
        if (!validateInputPersonalInfo(e)) return

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
        if (!validateInputPersonalInfo(e)) return;

        //save actual data
        (function () {

            const formData = new FormData();
            const inputs = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('input');
            inputs.forEach(input => {
                if (input.classList.contains('jsSelectInput')) {
                    formData.append(input.getAttribute('name'), input.getAttribute('data-id'));
                } else {
                    formData.append(input.getAttribute('name'), input.value.trim());
                }
            })

            for (const pair of formData.entries()) {
                console.log(`${pair[0]}, ${pair[1]}`);
            }

        })();

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
        formData.append('UserMasterPersonID',1)
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

        console.log(persInfoDataObj);

        //change button and disable input
        disableInputAndTurnButtonToEdit(e.target)
    }

    function handleClickArrowCivilStatusSelect(e) {
        const jsNewEmpSelectUl = e.target.closest('.jsNewEmpIndItemCont').querySelector('.jsNewEmpSelectUl');

        jsNewEmpSelectUl.innerHTML = '';

        jsNewEmpSelectUl.classList.toggle('display-none');

        let arr = civilStatusLinkedList.getAll();
        let htmlString;
        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.civilStatusID}">${item.civilStatusName}<li/>`
            const jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
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
        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.genderID}">${item.genderName}<li/>`
            const jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
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
        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.positionID}">${item.positionName}<li/>`
            const jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
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
        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.departmentID}">${item.departmentName}<li/>`
            const jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
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
        arr.forEach(item => {
            htmlString = `<li class="new-emp-select-li jsNewEmpSelectLi" data-id="${item.salaryConditionID}">${item.salaryConditionName}<li/>`
            const jsNewEmpSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsNewEmpSelectLi')
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
    }

    function handleClickCancelBtn(e) {
        const jsInputEditBtns = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsInputEditBtn');
        jsInputEditBtns.forEach(button => {
            disableInputAndTurnButtonToEdit(button);
        })

        //restore data
        if (e.target.getAttribute('name') == 'persinfo') {
            restoreDataPersonalInfo()
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

    }

    function restoreDataContacts() {

    }

    function restoreDataJobDescription() {

    }

    function restoreDataCompensation() {

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

    function validateInputPersonalInfo(e) {
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
