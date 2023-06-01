async function newEmployee(e) {

    if (e.target.classList.contains('jsMainMenuNewEmployeeSubLi')) {
        //reset global data, meaning this function is used at new employee, and it needs to be reset
        localData.resetAllData();
    }
    
    await personalInfo();
    await workersBenifits();
    await workersContact();
    await workersCompensation();

}