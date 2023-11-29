(async function signIn() {
    const jsSiginLoginBtn = document.querySelector('.jsSiginLoginBtn');
    jsSiginLoginBtn.addEventListener('click', handleClickSignInBtn)

    async function handleClickSignInBtn() {
        //if false, meaning password validation fail
        if (await validateUsernameAndPassword() == false) return;

        //continue of password ok
        const jsMainLayoutCont = document.querySelector('.jsMainLayoutCont');
        jsMainLayoutCont.innerHTML = '';

        const view = await fetchData.viewData('dashboard-main-page');
        console.log(view)
        const jsSublayout01MainCont = view.querySelector('.jsSublayout01MainCont');
        jsMainLayoutCont.appendChild(jsSublayout01MainCont);

        //window.location.href = "DashBoard/MainPage"
        await subLayout01();
    }

    const jsSigninPasswordSvgEyesIcon = document.querySelector('.jsSigninPasswordSvgEyesIcon');
    jsSigninPasswordSvgEyesIcon.addEventListener('click', clickEyesIconSvg)

    function clickEyesIconSvg(e) {
        const jsSigninUserPasswordInput = e.target.closest('.jsSigninUserPasswordCont').querySelector('.jsSigninUserPasswordInput');

        if (jsSigninUserPasswordInput.getAttribute('type') == 'password') {
            jsSigninUserPasswordInput.setAttribute('type', 'text');
        } else {
            jsSigninUserPasswordInput.setAttribute('type', 'password');
        }


    }


    async function validateUsernameAndPassword() {
        let isUsernameAndPasswordValid = false;

        //check if required fields are complete or not empty
        if (isSigninRequiredFieldsComplete() == false) return isUsernameAndPasswordValid;

        const jsSigninEmployeeNumberInput = document.querySelector('.jsSigninEmployeeNumberInput');
        //const jsSigninUserEmailInput = document.querySelector('.jsSigninUserEmailInput');
        const jsSigninUserPasswordInput = document.querySelector('.jsSigninUserPasswordInput');

        const employeeNumber = (jsSigninEmployeeNumberInput.value).trim();
        const iStillLoveYou = (jsSigninUserPasswordInput.value).trim();


        const formData = new FormData();
        formData.append('EmployeeNumber', employeeNumber);
        formData.append('IStillLoveYou', iStillLoveYou)
        formData.append('ErpModuleNumber', MODULE_ID)

        const options = {
            method: 'POST',
            body: formData
        }

        const loginReturnData = await fetchData.postData('signin-username-password', options);
        console.log(loginReturnData)
        if (loginReturnData == null) {
            document.querySelector('.jsErrorLoginText').classList.remove('display-none')
        } else {
            companyDetailsData.mainHeaderBackGround = loginReturnData.companyLoginData.mainHeaderBackGround
            isUsernameAndPasswordValid = true;
        }

        moduleUserID = loginReturnData.loginData.masterPersonUserID;
        
        return isUsernameAndPasswordValid;
    }

    function isSigninRequiredFieldsComplete() {
        let isValid = true

        const jsSigninEmployeeNumberInput = document.querySelector('.jsSigninEmployeeNumberInput');
        if (isNullOrWhiteSpace(jsSigninEmployeeNumberInput.value)) {
            jsSigninEmployeeNumberInput.classList.add('invalid');
            isValid = false
        } else {
            jsSigninEmployeeNumberInput.classList.remove('invalid');
        }

        const jsSigninUserPasswordInput = document.querySelector('.jsSigninUserPasswordInput');
        if (isNullOrWhiteSpace(jsSigninUserPasswordInput.value)) {
            jsSigninUserPasswordInput.parentNode.classList.add('invalid');
            isValid = false
        } else {
            jsSigninUserPasswordInput.parentNode.classList.remove('invalid');
        }

        return isValid;
    }

})();

