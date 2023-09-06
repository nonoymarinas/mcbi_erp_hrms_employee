async function newEmployee() {
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
        button.setAttribute('data-issavedmode',false)
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
    //enable edit button
    e.target.removeEventListener('click', handleClickSaveInputBtn);
    e.target.addEventListener('click', handleClickEditInputBtn);
    e.target.classList.remove('new-emp-save-btn')
    e.target.textContent = 'edit';
    e.target.setAttribute('data-issavedmode', false)

    //disable input
    if (e.target.classList.contains('jsSelectInputEditBtn')) {
        const jsNewEmpIndItemCont = e.target.closest('.jsNewEmpIndItemCont');

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
        const input = e.target.closest('.jsNewEmpIndItemCont').querySelector('input')
        input.setAttribute('disabled', true);
        input.classList.add('new-emp-input-disabled');
    }

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


function checkIfThereAreAcitveInputAndSaveBtn() {
    let isThereActiveSaveButton = false;
    const buttons = Array.from(document.querySelectorAll('.jsInputEditBtn'));
    
    for (let i = 0; i < buttons.length; i++) {
        const isSavedMode = buttons[i].getAttribute('data-issavedmode');
        if (isSavedMode == 'true') {
            isThereActiveSaveButton = true;
            const input =buttons[i].closest('.jsNewEmpIndItemCont').querySelector('input');
            input.focus();
            break;
        }
    }

    return isThereActiveSaveButton;
}