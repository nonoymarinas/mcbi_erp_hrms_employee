async function newWorkersEmployee(e) {

    if (eventIndicator.newEmplooyee.isClick == true) {
        //reset global data, meaning this function is used at new employee, and it needs to be reset
        localData.resetAllData();
        //reset indicator
        eventIndicator.newEmplooyee.isClick = false;
    }
    
    await personalInfo();
    await workersBenifits();
    await workersContact();
    await workersCompensation();

}