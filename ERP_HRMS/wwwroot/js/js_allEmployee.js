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

        const data = await fetchData.postData('single-employee-data', options)
        console.log(data)
        if (!data) return;

        await displayEmployeeDetails(data);
    }

    async function displayEmployeeDetails(data) {



        let htmlString;

        //fetch view for display
        const jsSublayout01ContentSubCont = document.querySelector('.jsSublayout01ContentSubCont');
        const view = await fetchData.viewData('single-employee-display-view');

        const jsEmployeeDetailsMainCont = view.querySelector('.jsEmployeeDetailsMainCont');
        jsSublayout01ContentSubCont.innerHTML = '';
        jsSublayout01ContentSubCont.appendChild(jsEmployeeDetailsMainCont);

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
        const gender = document.querySelector('.jsPerInfoGender');
        gender.innerHTML = '';
        htmlString = `<option class="emp-det-select-options jsSelectOption" value="0">Select</option>`;

        let jsSelectOption = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsSelectOption');
        gender.appendChild(jsSelectOption);

        data.genderList.forEach(item => {
            //determine the selected value
            if (data.personalInfo.genderID == item.genderID) {
                htmlString = `<option class="emp-det-select-options jsSelectOption" value="${item.genderID}" selected>${item.genderName}</option>`;
            } else {
                htmlString = `<option class="emp-det-select-options jsSelectOption" value="${item.genderID}">${item.genderName}</option>`;
            }
            jsSelectOption = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsSelectOption');
            gender.appendChild(jsSelectOption);
        })

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

        //mobile number
        const mobileNumber = document.querySelector('.jsContactsMobileNo');
        mobileNumber.value = data.contacts.mobileNumber

        //landline number
        const landlineNumber = document.querySelector('.jsContactsLandlineNo');
        landlineNumber.value = data.contacts.landLineNumber

        //email add
        const emailAddress = document.querySelector('.jsContactsEmailAdd');
        emailAddress.value = data.contacts.emailAddress;


        //address country
        //(function country() {
        //    const country = document.querySelector('.jsAddressCountry');
        //    country.innerHTML = '';
        //    let htmlString = `<option class="emp-det-select-options jsSelectOption" value="0">Select</option>`;

        //    let jsSelectOption = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsSelectOption');
        //    country.appendChild(jsSelectOption);

        //    data.countryList.forEach(item => {
        //        //determine the selected value
        //        if (data.philippineAddress.countryID == item.countryID) {
        //            htmlString = `<option class="emp-det-select-options jsSelectOption" value="${item.countryID}" selected>${item.countryName}</option>`;
        //        } else {
        //            htmlString = `<option class="emp-det-select-options jsSelectOption" value="${item.countryID}">${item.countryName}</option>`;
        //        }
        //        jsSelectOption = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsSelectOption');

        //        jsSelectOption.addEventListener('click',handleClickOptionsCountry)

        //        function handleClickOptionsCountry() {
        //            alert('options')
        //        }

        //        country.appendChild(jsSelectOption);
        //    })
        //})();

        //address region

        await editAndUpdateFunction(data);
    }

    async function editAndUpdateFunction(data) {

        //country address linkedlist
        let countryLinkedlist = new LinkedList(data.countryList[0])
        for (let i = 1; i < data.countryList.length; i++) {
            countryLinkedlist.push(data.countryList[i])
        }

        //region address linkedlist
        let regionLinkedlist = new LinkedList(data.regionList[0])
        for (let i = 1; i < data.regionList.length; i++) {
            regionLinkedlist.push(data.regionList[i])
        }

        //province address linkedlist
        let provinceLinkedlist = new LinkedList(data.provinceList[0])
        for (let i = 1; i < data.provinceList.length; i++) {
            provinceLinkedlist.push(data.provinceList[i])
        }

        //city address linkedlist
        let cityLinkedlist = new LinkedList(data.cityList[0])
        for (let i = 1; i < data.cityList.length; i++) {
            cityLinkedlist.push(data.cityList[i])
        }

        const jsEmpDetEditInputBtns = document.querySelectorAll('.jsEmpDetEditInputBtn');
        jsEmpDetEditInputBtns.forEach(item => {
            item.addEventListener('click', handleClickInputEditBtn)
        })

        function handleClickInputEditBtn(e) {
            const input = e.target.closest('.jsEmpDetIndCont').querySelector('.jsInput');
            input.removeAttribute('disabled');
            input.classList.add('input-enable');
            e.target.textContent = 'save';
            e.target.classList.add('btn-text-color-red');
            e.target.removeEventListener('click', handleClickInputEditBtn);
            e.target.addEventListener('click', handleClickInputSaveBtn);
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

        const jsEmpDetAddressEditBtn = document.querySelector('.jsEmpDetAddressEditBtn');
        jsEmpDetAddressEditBtn.addEventListener('click', handleClickAddressEditBtn);

        const jsEmpDetAddressCancelBtn = document.querySelector('.jsEmpDetAddressCancelBtn');
        jsEmpDetAddressCancelBtn.addEventListener('click', handleClickAddressCancelBtn);

        function handleClickAddressEditBtn(e) {
            enableAddressEditMode()
        }

        function handleClickAddressSaveBtn(e) {
            disableAddressEditMode()
        }

        function handleClickAddressCancelBtn() {
            disableAddressEditMode()
        }

        function enableAddressEditMode() {
            const jsAllEmpCustomSelectInputArrowConts = document.querySelectorAll('.jsAllEmpCustomSelectInputArrowCont');
            jsAllEmpCustomSelectInputArrowConts.forEach(item => {
                enableCustomSelectInput(item)
            })

            const jsEmpDetAddressEditBtn = document.querySelector('.jsEmpDetAddressEditBtn');
            jsEmpDetAddressEditBtn.textContent = 'Save';
            jsEmpDetAddressEditBtn.classList.add('btn-text-color-red');
            jsEmpDetAddressEditBtn.removeEventListener('click', handleClickAddressEditBtn);
            jsEmpDetAddressEditBtn.addEventListener('click', handleClickAddressSaveBtn);

            //inputs address country
            const jsCustomSelectInputCountry = document.querySelector('.jsCustomSelectInputCountry');
            jsCustomSelectInputCountry.addEventListener('input', handleInputAddressCountry)

            //inputs address region
            const jsCustomSelectInputRegion = document.querySelector('.jsCustomSelectInputRegion');
            jsCustomSelectInputRegion.addEventListener('input', handleInputAddressRegion)

            //inputs address province
            const jsCustomSelectInputProvince = document.querySelector('.jsCustomSelectInputProvince');
            jsCustomSelectInputProvince.addEventListener('input', handleInputAddressProvince)

            //inputs address city
            const jsCustomSelectInputCity = document.querySelector('.jsCustomSelectInputCity');
            jsCustomSelectInputCity.addEventListener('input', handleInputAddressCity)

            //select arrow country
            const jsCutomSelectArrowContCountry = document.querySelector('.jsCutomSelectArrowContCountry');
            jsCutomSelectArrowContCountry.addEventListener('click', handleClickInputArrowCountry)

            //select arrow region
            const jsCutomSelectArrowContRegion = document.querySelector('.jsCutomSelectArrowContRegion');
            jsCutomSelectArrowContRegion.addEventListener('click', handleClickInputArrowRegion)

            //select arrow province
            const jsCutomSelectArrowContProvince = document.querySelector('.jsCutomSelectArrowContProvince');
            jsCutomSelectArrowContProvince.addEventListener('click', handleClickInputArrowProvince)

            //select arrow city
            const jsCutomSelectArrowContCity = document.querySelector('.jsCutomSelectArrowContCity');
            jsCutomSelectArrowContCity.addEventListener('click', handleClickInputArrowCity)

            //enable cancel btn
            const jsEmpDetAddressCancelBtn = document.querySelector('.jsEmpDetAddressCancelBtn');
            jsEmpDetAddressCancelBtn.addEventListener('click', handleClickAddressCancelBtn);
            jsEmpDetAddressCancelBtn.classList.remove('disbale-cancel-btn');
        }

        function disableAddressEditMode() {
            const jsAllEmpCustomSelectInputArrowConts = document.querySelectorAll('.jsAllEmpCustomSelectInputArrowCont');
            jsAllEmpCustomSelectInputArrowConts.forEach(item => {
                disableCustomSelectInput(item)
            })

            const jsEmpDetAddressEditBtn = document.querySelector('.jsEmpDetAddressEditBtn');
            jsEmpDetAddressEditBtn.textContent = 'Edit';
            jsEmpDetAddressEditBtn.classList.remove('btn-text-color-red');
            jsEmpDetAddressEditBtn.removeEventListener('click', handleClickAddressSaveBtn);
            jsEmpDetAddressEditBtn.addEventListener('click', handleClickAddressEditBtn);

            const jsCutomSelectArrowConts = document.querySelectorAll('.jsCutomSelectArrowCont');
            jsCutomSelectArrowConts.forEach(item => {
                item.removeEventListener('click', handleClickInputArrowRegion)
            })

            //hide selection
            const jsAllEmpAddressUls = document.querySelectorAll('.jsAllEmpAddressUl');
            jsAllEmpAddressUls.forEach(item => {
                item.classList.add('display-none')
            })

            //disable cancel btn
            const jsEmpDetAddressCancelBtn = document.querySelector('.jsEmpDetAddressCancelBtn');
            jsEmpDetAddressCancelBtn.removeEventListener('click', handleClickAddressCancelBtn);
            jsEmpDetAddressCancelBtn.classList.add('disbale-cancel-btn');
        }

        //click arrow events

        function handleClickInputArrowCountry(e) {
            //close other open ul
            document.querySelector('.jsAllEmpAddressUlRegion').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlProvince').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlCity').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlBarangay').classList.add('display-none')

            const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
            ul.classList.toggle('display-none')
            ul.innerHTML = '';

            const arr = countryLinkedlist.getAll()

            if (arr.length > 0) {
                arr.forEach(item => {
                    htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-id="${item.countryID}">${item.countryName}</li>`
                    const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                    jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiRegion)
                    ul.appendChild(jsAllEmpCustomSelectLi);
                })
            }
        }

        function handleClickInputArrowRegion(e) {
            //close other open ul
            document.querySelector('.jsAllEmpAddressUlCountry').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlProvince').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlCity').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlBarangay').classList.add('display-none')

            const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
            ul.classList.toggle('display-none')
            ul.innerHTML = '';

            const arr = regionLinkedlist.getAll()

            if (arr.length > 0) {
                arr.forEach(item => {
                    htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-id="${item.regionID}">${item.regionName}</li>`
                    const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                    jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiRegion)
                    ul.appendChild(jsAllEmpCustomSelectLi);
                })
            }
        }

        function handleClickInputArrowProvince(e) {

            //close other open ul
            document.querySelector('.jsAllEmpAddressUlCountry').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlRegion').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlCity').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlBarangay').classList.add('display-none')
                
            const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
            ul.classList.toggle('display-none')
            ul.innerHTML = '';

            const arr = provinceLinkedlist.getAll()

            if (arr.length > 0) {
                arr.forEach(item => {
                    htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-id="${item.provinceID}">${item.provinceName}</li>`
                    const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                    jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiProvince)
                    ul.appendChild(jsAllEmpCustomSelectLi);
                })
            }
        }

        function handleClickInputArrowCity(e) {

            //close other open ul
            document.querySelector('.jsAllEmpAddressUlCountry').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlRegion').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlProvince').classList.add('display-none')
            document.querySelector('.jsAllEmpAddressUlBarangay').classList.add('display-none')

            const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
            ul.classList.toggle('display-none')
            ul.innerHTML = '';

            const arr = cityLinkedlist.getAll()

            if (arr.length > 0) {
                arr.forEach(item => {
                    htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-id="${item.cityID}">${item.cityName}</li>`
                    const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                    jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiProvince)
                    ul.appendChild(jsAllEmpCustomSelectLi);
                })
            }
        }

        //input events
        function handleInputAddressCountry(e) {
            const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
            ul.innerHTML = '';
            const SearchString = e.target.value.trim();
            const arr = countryLinkedlist.linkedListIndexOf('countryName', SearchString)

            if (arr.length > 0) {
                arr.forEach(item => {
                    ul.classList.remove('display-none')
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
            const arr = regionLinkedlist.linkedListIndexOf('regionName', SearchString)

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
            const ul = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsAllEmpAddressUl');
            ul.innerHTML = '';
            const SearchString = e.target.value.trim();
            const arr = provinceLinkedlist.linkedListIndexOf('provinceName', SearchString)

            if (arr.length > 0) {
                arr.forEach(item => {
                    ul.classList.remove('display-none')
                    htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-id="${item.provinceID}">${item.provinceName}</li>`
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
            const arr = cityLinkedlist.linkedListIndexOf('cityName', SearchString)

            if (arr.length > 0) {
                arr.forEach(item => {
                    ul.classList.remove('display-none')
                    htmlString = `<li class="all-emp-custom-select-search-li jsAllEmpCustomSelectLi" data-id="${item.cityID}">${item.cityName}</li>`
                    const jsAllEmpCustomSelectLi = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsAllEmpCustomSelectLi')
                    jsAllEmpCustomSelectLi.addEventListener('click', handleClickSelectLiCity)
                    ul.appendChild(jsAllEmpCustomSelectLi);
                })
            }

        }

        //click li events
        function handleClickSelectLiCountry(e) {
            //hide select ul
            const ul = e.target.closest('.jsAllEmpAddressUl');
            ul.classList.add('display-none')

            //input
            const jsCustomSelectInput = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsCustomSelectInput');
            jsCustomSelectInput.value = e.currentTarget.textContent;
            jsCustomSelectInput.setAttribute('data-id', e.currentTarget.getAttribute('data-id'));
        }

        function handleClickSelectLiRegion(e) {
            const regionID = e.currentTarget.getAttribute('data-id')
            //hide select ul
            const ul = e.target.closest('.jsAllEmpAddressUl');
            ul.classList.add('display-none')

            //input
            const jsCustomSelectInput = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsCustomSelectInput');
            jsCustomSelectInput.value = e.currentTarget.textContent;
            jsCustomSelectInput.setAttribute('data-id', regionID);

            //update province linkedlist
            let provinceArr = []
            data.provinceList.forEach(item => {
                if (item.regionID == regionID) {
                    provinceArr.push(item)
                }
            })

            provinceLinkedlist = new LinkedList(provinceArr[0])
            for (let i = 1; i < provinceArr.length; i++) {
                provinceLinkedlist.push(provinceArr[i])
            }

            //clear province data
            const jsCustomSelectInputProvince = document.querySelector('.jsCustomSelectInputProvince');
            jsCustomSelectInputProvince.value = '';
            jsCustomSelectInputProvince.setAttribute('data-id', 0)
        }

        function handleClickSelectLiProvince(e) {
            //hide select ul
            const ul = e.target.closest('.jsAllEmpAddressUl');
            ul.classList.add('display-none')

            //input
            const jsCustomSelectInput = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsCustomSelectInput');
            jsCustomSelectInput.value = e.currentTarget.textContent;
            jsCustomSelectInput.setAttribute('data-id', e.currentTarget.getAttribute('data-id'));
        }

        function handleClickSelectLiCity(e) {
            //hide select ul
            const ul = e.target.closest('.jsAllEmpAddressUl');
            ul.classList.add('display-none')

            //input
            const jsCustomSelectInput = e.target.closest('.jsAllEmpCustomSelectMainCont').querySelector('.jsCustomSelectInput');
            jsCustomSelectInput.value = e.currentTarget.textContent;
            jsCustomSelectInput.setAttribute('data-id', e.currentTarget.getAttribute('data-id'));
        }

        //enable or disable
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
            arrow.classList.add('arrow-disabled')
        }
        
    }



    async function employeeDetailsView(e) {
        //fetch view for display
        const jsSublayout01ContentSubCont = document.querySelector('.jsSublayout01ContentSubCont');
        const view = await fetchData.viewData('employee-detail-page');

        const jsWorkersInfoMainCont = view.querySelector('.jsWorkersInfoMainCont');
        jsSublayout01ContentSubCont.innerHTML = '';
        jsSublayout01ContentSubCont.appendChild(jsWorkersInfoMainCont);

        await newEmployee(e);

        persInfoAfterSaved();
        benifitsAfterSaved();
        contactsAfterSaved();
        compensationAfterSaved();
        modifiyUIDisplay();
    }

    async function persInfoAfterSaved() {
        //personal information
        document.querySelector('.jsEmployeeNumberText').textContent = localData.personalInfo.employeeNumber;
        document.querySelector('.jsFirstName').value = localData.personalInfo.firstName;
        document.querySelector('.jsMiddleName').value = localData.personalInfo.middleName;
        document.querySelector('.jsLastName').value = localData.personalInfo.lastName;
        document.querySelector('.jsDateOfBirth').value = localData.personalInfo.dateOfBirth;

        //disable save button
        disablePersInfoSaveAndEnableEditBtn();
        disablePersInfoInputBtn();

        //this function should run manually because save button is disabled without clicking, so this function is not activated
        await personalInfoEditAndUpdate()
    }

    async function benifitsAfterSaved() {
        //benifits information
        document.querySelector('.jsUMIDNumber').value = localData.benifits.umidNumber;
        document.querySelector('.jsSSSNumber').value = localData.benifits.sssNumber;
        document.querySelector('.jsPagIbigNumber').value = localData.benifits.pagIbigNumber;
        document.querySelector('.jsPhilHealthNumber').value = localData.benifits.philHealthNumber;
        document.querySelector('.jsTINNumber').value = localData.benifits.tinNumber;

        //disable save button
        disableBeniftsSaveAndEnableEditBtn();
        disableBenifitsInput();

        //this function should run manually because save button is disabled without clicking, so this function is not activated
        await benifitsEditAndUpdate()
    }

    async function contactsAfterSaved() {
        //contacts information
        document.querySelector('.jsMobileNumber').value = localData.contacts.mobileNumber;
        document.querySelector('.jsLandLineNumber').value = localData.contacts.landLineNumber;
        document.querySelector('.jsEmailAddress').value = localData.contacts.emailAddress;

        //disable save button
        disableContactSaveAndEnableEditBtn();
        disableContactsInput();

        //this function should run manually because save button is disabled without clicking, so this function is not activated
        await contactsEditAndUpdate()
    }

    async function compensationAfterSaved() {
        //compensation information
        document.querySelector('.jsBasicSalary').value = localData.compensation.basicSalary;
        document.querySelector('.jsAllowance').value = localData.compensation.allowance;

        const jsRatePeriod = document.querySelector('.jsRatePeriod');
        const ratePeriod = localData.compensation.ratePeriodID;
        if (parseInt(ratePeriod) == 1) {
            jsRatePeriod.options[0].setAttribute('selected', true)
        } else {
            jsRatePeriod.options[1].setAttribute('selected', true)
        }

        const jsIsSalaryFixed = document.querySelector('.jsIsSalaryFixed');
        const isSalaryFixed = localData.compensation.isSalaryFixed;
        if (parseInt(isSalaryFixed) == 0) {
            jsIsSalaryFixed.options[0].setAttribute('selected', true)
        } else {
            jsIsSalaryFixed.options[1].setAttribute('selected', true)
        }

        //disable save button
        disableCompensationSaveAndEnableEditBtn();
        disableCompensationInput();

        //this function should run manually because save button is disabled without clicking, so this function is not activated
        await compensationEditAndUpdate()
    }

    function modifiyUIDisplay() {
        //hide save button
        const jsWorkersSaveBtns = document.querySelectorAll('.jsWorkersSaveBtn');
        for (let i = 0; i < jsWorkersSaveBtns.length; i++) {
            jsWorkersSaveBtns[i].classList.add('display-none');
        }

        //change grid of header
        const jsWorkerHeaderTitleConts = document.querySelectorAll('.jsWorkerHeaderTitleCont');
        for (let i = 0; i < jsWorkerHeaderTitleConts.length; i++) {
            jsWorkerHeaderTitleConts[i].classList.add('display-grid-col-1fr-80px');
        }


        //insert picture container
        let htmlString = `<div class="worker-imageid-main-cont jsWorkerImageIDMainCont">
                            <div class="worker-imageid-sub-cont jsWorkerImageIdSubCont">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="worker-image-svg-cont jsWorkerImageSVG">
                                    <path  class="worker-image-svg-path" d="M336 128a112 112 0 1 0 -224 0 112 112 0 1 0 224 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM16 482.3c0 7.6 6.1 13.7 13.7 13.7H418.3c7.6 0 13.7-6.1 13.7-13.7C432 392.7 359.3 320 269.7 320H178.3C88.7 320 16 392.7 16 482.3zm-16 0C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                                </svg>
                                 <img class="employee-image jsEmployeeImage"/>
                            </div>
                        </div>`

        let jsWorkerImageIDMainCont = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('.jsWorkerImageIDMainCont');

        const jsWorkerInfoSubCont = document.querySelector('.jsWorkerInfoSubCont');
        const jsPersInfoHeaderTitleCont = document.querySelector('.jsPersInfoHeaderTitleCont');

        //insert
        jsWorkerInfoSubCont.insertBefore(jsWorkerImageIDMainCont, jsPersInfoHeaderTitleCont);

        ////change bottom border
        //const jsWorkerInfoTitleCont = document.querySelector('.jsWorkerInfoTitleCont');
        //jsWorkerInfoTitleCont.classList.add('border-bottom-1px-808080');

        //change title text
        const jsWorkerInfoTitleText = document.querySelector('.jsWorkerInfoTitleText');
        jsWorkerInfoTitleText.textContent = 'Employee Information'

        //add event listener to image profile
        jsWorkerImageIDMainCont.querySelector('.jsWorkerImageIdSubCont').addEventListener('click', clickEmployeeImageProfile)

    }

    async function clickEmployeeImageProfile() {

        const view = await fetchData.viewData('select-image-source');
        const jsAllEmpImageSourceMainCont = view.querySelector('.jsAllEmpImageSourceMainCont');

        document.body.appendChild(jsAllEmpImageSourceMainCont);

        const jsImageSourceClose = jsAllEmpImageSourceMainCont.querySelector('.jsImageSourceClose');
        jsImageSourceClose.addEventListener('click', clickImageSourceClose)

        function clickImageSourceClose() {
            jsAllEmpImageSourceMainCont.remove();
        }

        const jsEmployeeImageSourceGalleryLabel = jsAllEmpImageSourceMainCont.querySelector('.jsEmployeeImageSourceGalleryLabel');
        jsEmployeeImageSourceGalleryLabel.addEventListener('click', clickLabelChooseFromGallery)
        function clickLabelChooseFromGallery() {
            document.querySelector('.jsEmployeeImageFile').click();
        }

        const jsEmployeeImageFile = jsAllEmpImageSourceMainCont.querySelector('.jsEmployeeImageFile');
        jsEmployeeImageFile.addEventListener('change', changeInputFile)
        function changeInputFile() {
            jsAllEmpImageSourceMainCont.remove();
            readInputEmployeeImageFileInput()
        }


        function readInputEmployeeImageFileInput() {
            document.querySelector('.jsWorkerImageSVG').classList.add('display-none');
            const image = document.querySelector('.jsEmployeeImage');

            const file = jsEmployeeImageFile.files[0]

            // Check if the file is an image.

            if (file.type && !file.type.startsWith('image/')) {

                console.log('File is not an image.', file.type, file);

                return;

            }

            const reader = new FileReader();

            reader.addEventListener('load', (e) => {

                image.src = e.target.result;
                console.log(e.target.result)

            });

            reader.readAsDataURL(file);

        }
    }

}