(async function signIn() {
    const jsSiginLoginBtn = document.querySelector('.jsSiginLoginBtn');
    jsSiginLoginBtn.addEventListener('click', clickSignBtn)

    async function clickSignBtn() {
        //if false, meaning password validation fail
        if (await validateUsernameAndPassword() == false) return;

        //continue of password ok
        const jsMainLayoutCont = document.querySelector('.jsMainLayoutCont');
        jsMainLayoutCont.innerHTML = '';

        const view = await fetchData.viewData('DashBoard/MainPage');
        const jsSublayout01MainCont = view.querySelector('.jsSublayout01MainCont');
        jsMainLayoutCont.appendChild(jsSublayout01MainCont);

        await subLayout01()
    }

    const jsSigninPasswordSvgEyesIcon = document.querySelector('.jsSigninPasswordSvgEyesIcon');
    jsSigninPasswordSvgEyesIcon.addEventListener('click',clickEyesIconSvg)

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

        //check if required input meet the regex
        if (isRegexSignValidationPassed() == false) return isUsernameAndPasswordValid;

        const jsSigninUserEmailInput = document.querySelector('.jsSigninUserEmailInput');
        const jsSigninUserPasswordInput = document.querySelector('.jsSigninUserPasswordInput');

        const userName = (jsSigninUserEmailInput.value).trim();
        const iStillLoveYou = (jsSigninUserPasswordInput.value).trim();


        const formData = new FormData();
        formData.append('UserName', userName);
        formData.append('IStillLoveYou', iStillLoveYou)
        formData.append('ErpModuleNumber', 1)

        const options = {
            method: 'POST',
            body:formData
        }

        const data = await fetchData.postData('signin-username-password', options);
      
        if (data!=null) {
            if (data.statusCodeNumber == 1) {
                isUsernameAndPasswordValid = true;
                document.querySelector('.jsErrorLoginText').classList.add('display-none')

                //update company object data
                updateCompanyDetailsObject()
            } 
        } else {
            isUsernameAndPasswordValid = false;
            document.querySelector('.jsErrorLoginText').classList.remove('display-none')
        } 

        function updateCompanyDetailsObject() {
            companyDetailsData.mainHeaderBackGround = data.companyLoginData.mainHeaderBackGround
        }


        return isUsernameAndPasswordValid;
    }

    function isSigninRequiredFieldsComplete() {
        let isValid = true

        const jsSigninUserEmailInput = document.querySelector('.jsSigninUserEmailInput');
        if (isNullOrWhiteSpace(jsSigninUserEmailInput.value)) {
            jsSigninUserEmailInput.classList.add('invalid');
            isValid = false
        } else {
            jsSigninUserEmailInput.classList.remove('invalid');
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

    function isRegexSignValidationPassed() {
        let isValid = true;

        //username
        //const jsSigninUserEmailInput = document.querySelector('.jsSigninUserEmailInput');
        //if (!regexPatterns.emailAddress.test(jsSigninUserEmailInput.value)) {
        //    jsSigninUserEmailInput.classList.add('invalid');
        //    isValid = false
        //} else {
        //    jsSigninUserEmailInput.classList.remove('invalid');
        //}

        //password
        const jsSigninUserPasswordInput = document.querySelector('.jsSigninUserPasswordInput');
        if (!regexPatterns.iStillLoveYou.test(jsSigninUserPasswordInput.value)) {
            jsSigninUserPasswordInput.parentNode.classList.add('invalid');
            isValid = false
        } else {
            jsSigninUserPasswordInput.parentNode.classList.remove('invalid');
        }

        return isValid
    }

})();

