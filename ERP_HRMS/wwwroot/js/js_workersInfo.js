async function newEmployee() {

    //reset global data
    localData.resetAllData();

    await personalInfo();
    await workersBenifits();
    await workersContact();
    await workersCompensation();

}