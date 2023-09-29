async function subLayout01() {
    console.log(companyDetailsData.mainHeaderBackGround)
    console.log(document.querySelector('.jsMainLayoutHeaderCont'))
    //update appearance and company details
    document.querySelector('.jsMainLayoutHeaderCont').style.setProperty('--mainHeaderBackgroundColor',companyDetailsData.mainHeaderBackGround)

    //insert padding to body
    document.querySelector('body').classList.add('body-padding-top-bottom')

    //toogle menu
    const jsMainMenuLiCont = document.querySelectorAll('.jsMenuToogleDisplay');
    jsMainMenuLiCont.forEach((item) => {
        item.addEventListener('click', clickMainMenuLiToogleDisplay)
    })

    //click burger menu
    const jsMainBurgerMenu = document.querySelector('.jsMainBurgerMenu');
    jsMainBurgerMenu.addEventListener('click', clickBurgerMenu)

        
    //click user profile main menu
    const jsMainMenuUserProfileLi = document.querySelector('.jsMainMenuUserProfileLi');
    jsMainMenuUserProfileLi.addEventListener('click', clickMainMenuUserProfile)

    //click dashboard main menu
    const jsMainMenuDashboardLi = document.querySelector('.jsMainMenuDashboardLi');
    jsMainMenuDashboardLi.addEventListener('click', clickMainMenuDashboard)

    //click home main menu
    const jsMainMenuHomeLi = document.querySelector('.jsMainMenuHomeLi');
    jsMainMenuHomeLi.addEventListener('click', clickMenuHomeIcon)


    //click Employee menu
    const jsMainMenuEmployeeLi = document.querySelector('.jsMainMenuEmployeeLi');
    jsMainMenuEmployeeLi.addEventListener('click', clickMainMenuEmployee)

   
    //click new employee main menu
    const jsMainMenuNewEmployeeSubLi = document.querySelector('.jsMainMenuNewEmployeeSubLi');
    jsMainMenuNewEmployeeSubLi.addEventListener('click', clickMainMenuNewEmployee)

    //click all employee main menu
    const jsMainMenuAllEmployeeSubLi = document.querySelector('.jsMainMenuAllEmployeeSubLi');
    jsMainMenuAllEmployeeSubLi.addEventListener('click', clickMainMenuAllEmployee)

    //click user profile footer icon
    const jsUserProfileFooterMenuIcon = document.querySelector('.jsUserProfileFooterMenuIcon');
    jsUserProfileFooterMenuIcon.addEventListener('click', clickMainMenuUserProfile)

    //click home footer menu
    const jsHomeFooterMenuIcon = document.querySelector('.jsHomeFooterMenuIcon');
    jsHomeFooterMenuIcon.addEventListener('click', await clickMenuHomeIcon)

};
function clickBurgerMenu() {
    const jsSubLayout01MenuSubCont = document.querySelector('.jsSubLayout01MenuSubCont');
    if (jsSubLayout01MenuSubCont.classList.contains('display-none')) {
        jsSubLayout01MenuSubCont.classList.remove('display-none')
       
    } else {
        jsSubLayout01MenuSubCont.classList.toggle('menu-animate-open')
        jsSubLayout01MenuSubCont.classList.toggle('menu-animate-close')
    }
}

async function clickMainMenuUserProfile(){
    const jsSublayout01ContentSubCont = document.querySelector('.jsSublayout01ContentSubCont');
    
    const view = await fetchData.viewData('/UsersProfile/UserProfileMainPage');

    const jsUserProfileMainCont = view.querySelector('.jsUserProfileMainCont');
    jsSublayout01ContentSubCont.innerHTML = '';
    jsSublayout01ContentSubCont.appendChild(jsUserProfileMainCont);

    //User profile function
    await userProfileMainPage();
}

async function clickMainMenuDashboard(){
    const jsSublayout01ContentSubCont = document.querySelector('.jsSublayout01ContentSubCont');

    const view = await fetchData.viewData('/DashBoard/MainPage');

    const jsDashboardMainCont = view.querySelector('.jsDashboardMainCont');
    jsSublayout01ContentSubCont.innerHTML = '';
    jsSublayout01ContentSubCont.appendChild(jsDashboardMainCont);

}

async function clickMenuHomeIcon() {
    const jsSublayout01ContentSubCont = document.querySelector('.jsSublayout01ContentSubCont');
    const view = await fetchData.viewData('/Home/MainPage');

    const jsHomeMainCont = view.querySelector('.jsHomeMainCont');
   
    jsSublayout01ContentSubCont.innerHTML = '';
    jsSublayout01ContentSubCont.appendChild(jsHomeMainCont);

    await homePage();
}

async function clickMainMenuEmployee(e) {
   
    const jsMainMenuEmployeeSubUl = document.querySelector('.jsMainMenuEmployeeSubUl');
    if (jsMainMenuEmployeeSubUl.classList.contains('display-none')) {
        jsMainMenuEmployeeSubUl.classList.remove('display-none')
    } else {
        jsMainMenuEmployeeSubUl.classList.toggle('submenu-animate-open')
        jsMainMenuEmployeeSubUl.classList.toggle('submenu-animate-close')
    }
}

//async function clickMainMenuNewEmployee() {
//    const jsSublayout01ContentSubCont = document.querySelector('.jsSublayout01ContentSubCont');
//    const view = await fetchData.viewData('employee-detail-page');

//    const jsWorkersInfoMainCont = view.querySelector('.jsWorkersInfoMainCont');
//    jsSublayout01ContentSubCont.innerHTML = '';
//    jsSublayout01ContentSubCont.appendChild(jsWorkersInfoMainCont);

//    //event eventIndicator
//    eventIndicator.newEmplooyee.isClick = true;
//    await newWorkersEmployee();
//}

async function clickMainMenuNewEmployee() {
    //fetch data needed for new employee
    let newEmpData = await fetchData.getData('new-employee-ref-data')
    if (newEmpData == null) return;
    //fetch view for display
    const jsSublayout01ContentSubCont = document.querySelector('.jsSublayout01ContentSubCont');
    const view = await fetchData.viewData('new-employee-main-page');
    const jsNewEmpMainCont = view.querySelector('.jsNewEmpMainCont');
    jsSublayout01ContentSubCont.innerHTML = '';
    jsSublayout01ContentSubCont.appendChild(jsNewEmpMainCont);

    //needed to determine if function is new employee or all employee
    persInfoDataObj.isAllEmployeeFunction = false;

    await newEmployee(newEmpData);
}

async function clickMainMenuAllEmployee() {
    //get all employee data
    //spinner on
    document.body.appendChild(spinnerType01());
    const data = await fetchData.getData('all-employee-data')
    //spinner off
    document.querySelector('.jsSpinnerCont').remove();

    if (data == null) return;

    //convert to linkedlist
    let linkedList = null;
    if (data != null) {
        linkedList = new LinkedList(data.masterPersonList[0])
        for (i = 1; i < data.masterPersonList.length; i++) {
            linkedList.push(data.masterPersonList[i])
        }
    }

    const jsSublayout01ContentSubCont = document.querySelector('.jsSublayout01ContentSubCont');
    const view = await fetchData.viewData('/AllEmployee/AllEmployeeMainPage');

    const jsAllEmployeeMainCont = view.querySelector('.jsAllEmployeeMainCont');
    jsSublayout01ContentSubCont.innerHTML = '';
    jsSublayout01ContentSubCont.appendChild(jsAllEmployeeMainCont);

    await allEmployee(linkedList);
}

function clickMainMenuLiToogleDisplay(e) {
    const jsSubLayout01MenuSubCont = document.querySelector('.jsSubLayout01MenuSubCont');

    if (e.currentTarget.classList.contains('jsSublayout01ContentSubCont')) {
        //this is main content container
        if (jsSubLayout01MenuSubCont.classList.contains('menu-animate-open')) {
            jsSubLayout01MenuSubCont.classList.toggle('menu-animate-open')
            jsSubLayout01MenuSubCont.classList.toggle('menu-animate-close')
        }
    } else {
        //this is for menu li container
        jsSubLayout01MenuSubCont.classList.toggle('menu-animate-open')
        jsSubLayout01MenuSubCont.classList.toggle('menu-animate-close')
    }
}
