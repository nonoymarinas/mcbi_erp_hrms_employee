async function newEmployee(newEmpData) {
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
    let salarConditionLinkedList = new LinkedList(newEmpData.salaryConditionList[0])
    for (let i = 1; i < newEmpData.salaryConditionList.length; i++) {
        salarConditionLinkedList.push(newEmpData.salaryConditionList[i])
    }
    
    let persInfoDataObj = {
        firsName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        genderID: '',
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
        remarks:'',
    }

    let compensationDataObj = {
        ratePeriod: '',
        ratePeriodID: '',
        basicSalary: '',
        allowance: '',
        salaryCondition: '',
    }



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
        if (arrow.getAttribute('name') == 'Gender') {
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
}



async function handleClickSavePersonalInfo(e) {

    //disable button
    e.currentTarget.removeEventListener('click', handleClickSavePersonalInfo);
    e.currentTarget.classList.add('new-emp-btn-disabled');

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
    })();

    //enable and attached event listener to cancel button
    const jsNewEmpCancelBtnPersInfo = document.querySelector('.jsNewEmpCancelBtnPersInfo');
    jsNewEmpCancelBtnPersInfo.addEventListener('click', handleClickCancelBtn)
}

async function handleClickSaveBenifits(e) {

    //disable button
    e.currentTarget.removeEventListener('click', handleClickSaveBenifits);
    e.currentTarget.classList.add('new-emp-btn-disabled');

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

    //disable button
    e.currentTarget.removeEventListener('click', handleClickSaveContacts);
    e.currentTarget.classList.add('new-emp-btn-disabled');

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

    //disable button
    e.currentTarget.removeEventListener('click', handleClickSaveJobDescriptions);
    e.currentTarget.classList.add('new-emp-btn-disabled');

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
    })();

    //enable and attached event listener to cancel button
    const jsNewEmpCancelBtnJobDesc = document.querySelector('.jsNewEmpCancelBtnJobDesc');
    jsNewEmpCancelBtnJobDesc.addEventListener('click', handleClickCancelBtn)
}

async function handleClickSaveCompensations(e) {

    //disable button
    e.currentTarget.removeEventListener('click', handleClickSaveCompensations);
    e.currentTarget.classList.add('new-emp-btn-disabled');

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

        if (jsNewEmpSelectArrowCont.getAttribute('name') == 'Gender') {
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
    const button = e.target;
    disableInputAndTurnButtonToEdit(button)
}

function handleClickArrowGenderSelect() {
    alert('gender')

}

function handleClickArrowPositionSelect() {
    alert('position')
}

function handleClickArrowDepartmentSelect() {
    alert('Department')
}

function handleClickArrowRatePeriodSelect() {
    alert('RatePeriod')
}

function handleClickArrowSalaryConditionSelect() {
    alert('SalaryCondition')
}

function handleClickCancelBtn(e) {
    const jsInputEditBtns = e.target.closest('.jsNewEmpSubContentCont').querySelectorAll('.jsInputEditBtn');
    jsInputEditBtns.forEach(button => {
        disableInputAndTurnButtonToEdit(button);
    })
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

        const jsNewEmpSelectArrowCont = jsNewEmpIndItemCont.querySelector('.jsNewEmpSelectArrowCont');
        jsNewEmpSelectArrowCont.classList.add('arrow-cont-disabled');
        if (jsNewEmpSelectArrowCont.getAttribute('name') == 'Gender') {
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
    }
}
