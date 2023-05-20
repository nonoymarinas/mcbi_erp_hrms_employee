(async function signIn() {
    const jsSiginLoginBtn = document.querySelector('.jsSiginLoginBtn');
    jsSiginLoginBtn.addEventListener('click', clickSignBtn)

    async function clickSignBtn() {

        if (!await validateUsernameAndPassword()) return;

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
        //check if required fields are complete or not empty
        if (!isSigninRequiredFieldsComplete()) return;

        //check if required input meet the regex
        if (!isRegexSignValidationPassed()) return;


        let isUsernameAndPasswordValid = true;

       
        const jsSigninUserEmailInput = document.querySelector('.jsSigninUserEmailInput');
        const jsSigninUserPasswordInput = document.querySelector('.jsSigninUserPasswordInput');

        const userName = (jsSigninUserEmailInput.value).trim();
        const iStillLoveYou = (jsSigninUserPasswordInput.value).trim();

        

        const formData = new FormData();
        formData.append('UserName', userName);
        formData.append('IStillLoveYou', iStillLoveYou)

        const options = {
            method: 'POST',
            body:formData
        }

        const data = await fetchData.postData('signin-username-password', options);

        if (!data) {
            isUsernameAndPasswordValid = true;
            document.querySelector('.jsErrorLoginText').classList.remove('display-none')
        } else {
            document.querySelector('.jsErrorLoginText').classList.add('display-none')
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

