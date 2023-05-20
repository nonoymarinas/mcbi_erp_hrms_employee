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

        console.log(data)

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
            jsSigninUserPasswordInput.classList.add('invalid');
            isValid = false
        } else {
            jsSigninUserPasswordInput.classList.remove('invalid');
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

