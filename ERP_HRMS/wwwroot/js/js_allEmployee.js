
async function allEmployee(linkedList) {
    //load reference data
    const jsSearchInput = document.querySelector('.jsSearchInput');
    jsSearchInput.addEventListener('input', inputSearchName)
    let jsSearchCont = document.querySelector('.jsSearchCont');
    function inputSearchName(e) {
        if (e.target.value == '') {
            jsSearchCont.classList.add('display-none');
        } else if (jsSearchCont.classList.contains('display-none')) {
            jsSearchCont.classList.remove('display-none');
        }

        jsSearchCont.innerHTML = '';
        let searchDataArray = linkedList.linkedListIndexOf('fullName', e.target.value)
        for (let i = 0; i < searchDataArray.length; i++) {
            let htmlString = `<li class="search-item-result-li jsSearchResultLi" data-id=${searchDataArray[i].masterPersonID}>${searchDataArray[i].fullName}</li>`
            let jsSearchResultLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsSearchResultLi');

            jsSearchResultLi.addEventListener('click', clickSearchResultLi)

            function clickSearchResultLi(e) {
                jsSearchInput.setAttribute('data-id', e.target.getAttribute('data-id'));
                jsSearchInput.value = e.target.textContent;
                jsSearchCont.classList.add('display-none');
            }

            jsSearchCont.appendChild(jsSearchResultLi);
        }

    }

    const jsAllEmpSearchBtn = document.querySelector('.jsAllEmpSearchBtn');
    jsAllEmpSearchBtn.addEventListener('click', clickSearchBtn);
    async function clickSearchBtn() {
        const MasterPersonID = document.querySelector('.jsSearchInput').getAttribute('data-id');
        const formData = new FormData();
        formData.append('MasterPersonID', MasterPersonID)
        const options = {
            method: 'POST',
            body: formData
        }

        const singleEmployeeData = await fetchData.postData('single-employee-data', options)
        if (singleEmployeeData == null) return;
        console.log(singleEmployeeData)

        //fetch data needed for new employee form
        let newEmpData = await fetchData.getData('new-employee-ref-data')
        if (newEmpData == null) return;


        const view = await fetchData.viewData('new-employee-main-page');
        const jsNewEmpMainCont = view.querySelector('.jsNewEmpMainCont');

        const jsSublayout01ContentSubCont = document.querySelector('.jsSublayout01ContentSubCont');
        jsSublayout01ContentSubCont.innerHTML = '';

        jsSublayout01ContentSubCont.appendChild(jsNewEmpMainCont);


        const baseUrl = 'https://speedxstorageaccount.blob.core.windows.net/speedxcontainer/'
        const imageUrl = baseUrl + singleEmployeeData.personalInfo.photoImageFileName
        const img = new Image();
        img.classList.add('jsNewEmpImagePhoto');
        img.src = imageUrl;
        document.querySelector('.jsNewEmpPhotoCont').innerHTML = '';
        document.querySelector('.jsNewEmpPhotoCont').appendChild(img);

        img.onload = function () {
            if (parseFloat(img.clientHeight) >= parseFloat(img.clientWidth)) {
                img.classList.remove('max-height-100');
                img.classList.add('max-width-100');
            } else {
                img.classList.add('max-height-100');
                img.classList.remove('max-width-100');
            }
        }



        //personal information
        persInfoDataObj.masterPersonID = singleEmployeeData.personalInfo.masterPersonID;
        persInfoDataObj.employeeNumber = singleEmployeeData.personalInfo.employeeNumber;
        persInfoDataObj.firstName = singleEmployeeData.personalInfo.firstName;
        persInfoDataObj.middleName = singleEmployeeData.personalInfo.middleName;
        persInfoDataObj.lastName = singleEmployeeData.personalInfo.lastName;
        persInfoDataObj.dateOfBirth = singleEmployeeData.personalInfo.dateOfBirth;
        persInfoDataObj.civilStatusName = singleEmployeeData.personalInfo.civilStatusName;
        persInfoDataObj.civilStatusID = singleEmployeeData.personalInfo.civilStatusID;
        persInfoDataObj.genderName = singleEmployeeData.personalInfo.genderName;
        persInfoDataObj.genderID = singleEmployeeData.personalInfo.genderID;
        persInfoDataObj.isPersonalInfoSaved = true;
        persInfoDataObj.isAllEmployeeFunction = true;


        document.querySelector('.jsPureInputFirstName').value = persInfoDataObj.firstName
        document.querySelector('.jsPureInputMiddleName').value = persInfoDataObj.middleName
        document.querySelector('.jsPureInputLastName').value = persInfoDataObj.lastName
        document.querySelector('.jsPureInputDateOfBirth').value = persInfoDataObj.dateOfBirth
        document.querySelector('.jsSelectInputCivilStatus').value = persInfoDataObj.civilStatusName
        document.querySelector('.jsSelectInputCivilStatus').setAttribute('data-id', persInfoDataObj.civilStatusID)
        document.querySelector('.jsSelectInputGender').value = persInfoDataObj.genderName
        document.querySelector('.jsSelectInputGender').setAttribute('data-id', persInfoDataObj.genderID)
        document.querySelector('.jsPureInputEmployeeNumber').value = persInfoDataObj.employeeNumber

        //benifits
        benifitsDataObj.sssNo = singleEmployeeData.benifits.sssNumber;
        benifitsDataObj.pagibigNo = singleEmployeeData.benifits.pagIbigNumber;
        benifitsDataObj.philHealthNo = singleEmployeeData.benifits.philHealthNumber;
        benifitsDataObj.tinNo = singleEmployeeData.benifits.tinNumber;

        document.querySelector('.jsPureInputSssNumber').value = benifitsDataObj.sssNo
        document.querySelector('.jsPureInputPagibigNumber').value = benifitsDataObj.pagibigNo
        document.querySelector('.jsPureInputPhilhealthNumber').value = benifitsDataObj.philHealthNo
        document.querySelector('.jsPureInputTinNumber').value = benifitsDataObj.tinNo

        //contactsDataObj
        contactsDataObj.mobileNo = singleEmployeeData.contacts.mobileNumber;
        contactsDataObj.landlineNo = singleEmployeeData.contacts.landLineNumber;
        contactsDataObj.emailAdd = singleEmployeeData.contacts.emailAddress;

        document.querySelector('.jsPureInputMobileNumber').value = contactsDataObj.mobileNo
        document.querySelector('.jsPureInputLandlineNumber').value = contactsDataObj.landlineNo
        document.querySelector('.jsPureInputEmailAddress').value = contactsDataObj.emailAdd


        await newEmployee(newEmpData);
    }
}