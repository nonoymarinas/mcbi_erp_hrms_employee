
async function allEmployee(linkedList) {
    //this will indicate that this is all employee
    persInfoDataObj.isAllEmployeeFunction = true;

    const allEmployeeArr = linkedList.getAll();
    //console.log(allEmployeeArr)

    const jsAllEmpSubContentCont = document.querySelector('.jsAllEmpSubContentCont');
    allEmployeeArr.forEach(item => {
        loadAddSingleEmployeeToList(item)
    })

    function loadAddSingleEmployeeToList(employee) {
        const imageUrl = baseUrl + employee.imageFileName
        const htmlString = `<div class="all-emp-item-main-cont jsAllEmpItemMainCont" data-id="${employee.masterPersonID}">
                        <div class="all-emp-image-id-cont">
                            <img class="all-emp-image-id" src="${imageUrl}" />
                        </div>
                        <div class="all-emp-name-det-cont">
                            <h4>${employee.firstName + ' ' + employee.lastName}</h4>
                            <label class="all-emp-item-label">${employee.position}</label>
                        </div>
                         <div class="all-emp-id-number-cont">
                             <h4 class="all-emp-id-number-text">${employee.employeeNumber}</h4>
                             <label class="all-emp-id-number-label">Employee no.</label>
                        </div>
                    </div>`

        const jsAllEmpItemMainCont = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpItemMainCont')

        jsAllEmpItemMainCont.addEventListener('click', handleClickIndividualEmployee)

        //console.log(jsAllEmpItemMainCont)
        jsAllEmpSubContentCont.appendChild(jsAllEmpItemMainCont)
    }


    //load reference data
    const jsAllEmpSearchInput = document.querySelector('.jsAllEmpSearchInput');
    jsAllEmpSearchInput.addEventListener('input', handleInputSearchName)
    function handleInputSearchName(e) {

        jsAllEmpSubContentCont.innerHTML = '';
        let searchDataArray = linkedList.linkedListIndexOf('fullName', e.target.value)
        for (let i = 0; i < searchDataArray.length; i++) {
            loadAddSingleEmployeeToList(searchDataArray[i])
        }

    }


    async function handleClickIndividualEmployee(e) {
        const MasterPersonID = e.currentTarget.getAttribute('data-id');
        const formData = new FormData();
        formData.append('MasterPersonID', MasterPersonID)
        const options = {
            method: 'POST',
            body: formData
        }

        //fetch single employee data
        const singleEmployeeData = await fetchData.postData('single-employee-data', options)
        if (singleEmployeeData == null) return;
        console.log(singleEmployeeData)

        //fetch data needed for new employee form
        let newEmpData = await fetchData.getData('new-employee-ref-data')
        
        if (newEmpData == null) return;
        console.log(newEmpData)
        
        //fetch employee data UI
        const view = await fetchData.viewData('new-employee-main-page');
        const jsNewEmpMainCont = view.querySelector('.jsNewEmpMainCont');

        const jsSublayout01ContentSubCont = document.querySelector('.jsSublayout01ContentSubCont');
        jsSublayout01ContentSubCont.innerHTML = '';

        jsSublayout01ContentSubCont.appendChild(jsNewEmpMainCont);

        //attached function for employee UI
        await newEmployee(newEmpData);


        //construct image URL and show image
        if (!isNullOrWhiteSpace(singleEmployeeData.personalInfo.photoImageFileName)) {
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
        }


        //update local employee data

        //personal information
        console.log(singleEmployeeData);
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
        persInfoDataObj.imageFileName = singleEmployeeData.personalInfo.photoImageFileName;
        persInfoDataObj.isPersonalInfoSaved = true;

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

        //contacts
        contactsDataObj.mobileNo = singleEmployeeData.contacts.mobileNumber;
        contactsDataObj.landlineNo = singleEmployeeData.contacts.landLineNumber;
        contactsDataObj.emailAdd = singleEmployeeData.contacts.emailAddress;

        document.querySelector('.jsPureInputMobileNumber').value = contactsDataObj.mobileNo
        document.querySelector('.jsPureInputLandlineNumber').value = contactsDataObj.landlineNo
        document.querySelector('.jsPureInputEmailAddress').value = contactsDataObj.emailAdd

        //employments
        employmentsDataObj.positionID = singleEmployeeData.jobDescription.positionID;
        employmentsDataObj.position = singleEmployeeData.jobDescription.positionName;
        employmentsDataObj.departmentID = singleEmployeeData.jobDescription.departmentID;
        employmentsDataObj.department = singleEmployeeData.jobDescription.departmentName;
        employmentsDataObj.dateHired = singleEmployeeData.jobDescription.dateHired;
        employmentsDataObj.projectAssignmentID = singleEmployeeData.jobDescription.projectAssignmentID;
        employmentsDataObj.projectAssignment = singleEmployeeData.jobDescription.projectAssignment;
        employmentsDataObj.projectNumber = singleEmployeeData.jobDescription.projectNumber;
        employmentsDataObj.remarks = singleEmployeeData.jobDescription.remarks;
       
        document.querySelector('.jsSelectInputPosition').value = employmentsDataObj.position
        document.querySelector('.jsSelectInputPosition').setAttribute('data-id', employmentsDataObj.positionID)
        document.querySelector('.jsSelectInputDepartment').value = employmentsDataObj.department
        document.querySelector('.jsSelectInputDepartment').setAttribute('data-id', employmentsDataObj.departmentID)
        document.querySelector('.jsPureInputDateHired').value = employmentsDataObj.dateHired
        document.querySelector('.jsSelectInputProjectAssignment').value = `${employmentsDataObj.projectNumber} ${employmentsDataObj.projectAssignment}`
        document.querySelector('.jsSelectInputProjectAssignment').setAttribute('data-id', employmentsDataObj.projectAssignmentID)
        document.querySelector('.jsPureInputRemarks').value = employmentsDataObj.remarks

        //compensation
        compensationDataObj.ratePeriod = singleEmployeeData.compensation.ratePeriod;
        compensationDataObj.ratePeriodID = singleEmployeeData.compensation.ratePeriodID;
        compensationDataObj.basicSalary = singleEmployeeData.compensation.basicSalary;
        compensationDataObj.allowance = singleEmployeeData.compensation.allowance;
        compensationDataObj.salaryConditionID = singleEmployeeData.compensation.salaryConditionID;
        compensationDataObj.salaryCondition = singleEmployeeData.compensation.salaryCondition;
        compensationDataObj.currencyID = singleEmployeeData.compensation.currencyID;
        compensationDataObj.currency = singleEmployeeData.compensation.currency;

        if (compensationDataObj.ratePeriod == 0) {
            document.querySelector('.jsSelectInputRatePeriod').value = defaultValueSelectLi.value
            document.querySelector('.jsSelectInputRatePeriod').setAttribute('data-id', compensationDataObj.ratePeriodID)
        } else {
            document.querySelector('.jsSelectInputRatePeriod').value = compensationDataObj.ratePeriod
            document.querySelector('.jsSelectInputRatePeriod').setAttribute('data-id', compensationDataObj.ratePeriodID)
        }
            document.querySelector('.jsPureInputBasicSalary').value = compensationDataObj.basicSalary
        document.querySelector('.jsPureInputAllowance').value = compensationDataObj.allowance
        if (compensationDataObj.salaryConditionID == 0) {
            document.querySelector('.jsSelectInputSalaryCondition').value = defaultValueSelectLi.value
            document.querySelector('.jsSelectInputSalaryCondition').setAttribute('data-id', compensationDataObj.salaryConditionID)
        } else {
            document.querySelector('.jsSelectInputSalaryCondition').value = compensationDataObj.salaryCondition
            document.querySelector('.jsSelectInputSalaryCondition').setAttribute('data-id', compensationDataObj.salaryConditionID)
        }
            
        
        //addresses philippines
        addressDataObj.countryID = singleEmployeeData.philippineAddress.countryID;
        addressDataObj.countryName = singleEmployeeData.philippineAddress.country;
        addressDataObj.regionID = singleEmployeeData.philippineAddress.regionID;
        addressDataObj.regionName = singleEmployeeData.philippineAddress.regionName;
        addressDataObj.provinceID = singleEmployeeData.philippineAddress.provinceID;
        addressDataObj.provinceName = singleEmployeeData.philippineAddress.provinceName;
        addressDataObj.cityID = singleEmployeeData.philippineAddress.cityOrMunicipalityID;
        addressDataObj.cityName = singleEmployeeData.philippineAddress.cityOrMunicipalName;
        addressDataObj.barangayID = singleEmployeeData.philippineAddress.barangayID;
        addressDataObj.barangayName = singleEmployeeData.philippineAddress.barangayName;
        addressDataObj.addressLine1 = singleEmployeeData.philippineAddress.addressLine1;
        addressDataObj.addressLine2 = singleEmployeeData.philippineAddress.addressLine2;
        addressDataObj.postalAddressType = singleEmployeeData.philippineAddress.postalAddressType;
        addressDataObj.postalAddressTypeID = singleEmployeeData.philippineAddress.postalAddressTypeID;

        //addresses foriegn
        addressForiegnDataObj.countryID = singleEmployeeData.foreignAddress.countryID;
        addressForiegnDataObj.countryName = singleEmployeeData.foreignAddress.country;
        addressForiegnDataObj.postalAddressType = singleEmployeeData.foreignAddress.postalAddressType;
        addressForiegnDataObj.postalAddressTypeID = singleEmployeeData.foreignAddress.postalAddressTypeID;
        addressForiegnDataObj.foreignCompleteAddress = singleEmployeeData.foreignAddress.foreignCompleteAddress;

        //check if is philippines or foriegn
        if (singleEmployeeData.employeeAddressCountry != null) {
            if (singleEmployeeData.employeeAddressCountry.countryID == 1) {
                document.querySelector('.jsSelectInputCountry').value = addressDataObj.countryName
                document.querySelector('.jsSelectInputCountry').setAttribute('data-id', addressDataObj.countryID)
                document.querySelector('.jsSelectInputRegion').value = addressDataObj.regionName
                document.querySelector('.jsSelectInputRegion').setAttribute('data-id', addressDataObj.regionID)
                document.querySelector('.jsSelectInputProvince').value = addressDataObj.provinceName
                document.querySelector('.jsSelectInputProvince').setAttribute('data-id', addressDataObj.provinceID)
                document.querySelector('.jsSelectInputCity').value = addressDataObj.cityName
                document.querySelector('.jsSelectInputCity').setAttribute('data-id', addressDataObj.cityID)
                document.querySelector('.jsSelectInputBarangay').value = addressDataObj.barangayName
                document.querySelector('.jsSelectInputBarangay').setAttribute('data-id', addressDataObj.barangayID)
                document.querySelector('.jsPureInputAddressLine1').value = addressDataObj.addressLine1
                document.querySelector('.jsPureInputAddressLine2').value = addressDataObj.addressLine2
            } else {
                //put foriegn address here
            }
        }
    }
}