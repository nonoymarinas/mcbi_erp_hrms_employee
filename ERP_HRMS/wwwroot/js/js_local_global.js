const MODULE_ID = 1;

let persInfoDataObj = {
    masterPersonID: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    civilStatusID: '',
    civilStatus: '',
    genderID: '',
    gender: '',
    employeeNumber: '',
    isPersonalInfoSaved: false,
    isAllEmployeeFunction: false
}

let benifitsDataObj = {
    sssNo: '',
    philHealthNo: '',
    pagibigNo: '',
    tinNo: '',
}

let contactsDataObj = {
    mobileNo: '',
    landlineNo: '',
    emailAdd: '',
}

let addressDataObj = {
    countryID: '',
    countryName: '',
    regionID: '',
    regionName: '',
    provinceID: '',
    provinceName: '',
    cityID: '',
    cityName: '',
    barangayID: '',
    barangayName: '',
    addressLine1: '',
    addressLine2: '',
    postalAddressType: '',
    postalAddressTypeID: '',
}

let addressForiegnDataObj = {
    countryID: '',
    countryName: '',
    foreignCompleteAddress: '',
    postalAddressType: '',
    postalAddressTypeID: '',
}

let jobDescriptionDataObj = {
    position: '',
    positionID: '',
    department: '',
    departmentID: '',
    remarks: '',
}

let compensationDataObj = {
    ratePeriod: '',
    ratePeriodID: '',
    basicSalary: '',
    allowance: '',
    salaryConditionID: '',
    salaryCondition: '',
    currencyID: '',
    currency: '',
};

function resetEmployeeLocalData() {
    //personal info
    persInfoDataObj.masterPersonID = ''
    persInfoDataObj.firstName = ''
    persInfoDataObj.middleName = ''
    persInfoDataObj.lastName = ''
    persInfoDataObj.dateOfBirth = ''
    persInfoDataObj.civilStatusID = ''
    persInfoDataObj.civilStatus = ''
    persInfoDataObj.genderID = ''
    persInfoDataObj.gender = ''
    persInfoDataObj.employeeNumber = ''
    persInfoDataObj.isPersonalInfoSaved = false
    //persInfoDataObj.isAllEmployeeFunction = false

    //benifits
    benifitsDataObj.sssNo = ''
    benifitsDataObj.philHealthNo = ''
    benifitsDataObj.pagibigNo = ''
    benifitsDataObj.tinNo = ''

    //contacts
    contactsDataObj.mobileNo = ''
    contactsDataObj.landlineNo = ''
    contactsDataObj.emailAdd = ''

    //address philippines
    addressDataObj.countryID = ''
    addressDataObj.countryName = ''
    addressDataObj.regionID = ''
    addressDataObj.regionName = ''
    addressDataObj.provinceID = ''
    addressDataObj.provinceName = ''
    addressDataObj.cityID = ''
    addressDataObj.cityName = ''
    addressDataObj.barangayID = ''
    addressDataObj.barangayName = ''
    addressDataObj.addressLine1 = ''
    addressDataObj.addressLine2 = ''
    addressDataObj.postalAddressType = ''
    addressDataObj.postalAddressTypeID = ''

    //address foriegn
    addressForiegnDataObj.countryID = ''
    addressForiegnDataObj.countryName = ''
    addressForiegnDataObj.foreignCompleteAddress = ''
    addressDataObj.postalAddressType = ''
    addressDataObj.postalAddressTypeID = ''

    //job description
    jobDescriptionDataObj.position = ''
    jobDescriptionDataObj.positionID = ''
    jobDescriptionDataObj.department = ''
    jobDescriptionDataObj.departmentID = ''
    jobDescriptionDataObj.remarks = ''

    //compensation
    compensationDataObj.ratePeriod = ''
    compensationDataObj.ratePeriodID = ''
    compensationDataObj.basicSalary = ''
    compensationDataObj.allowance = ''
    compensationDataObj.salaryConditionID = ''
    compensationDataObj.salaryCondition = ''
    compensationDataObj.currencyID = ''
    compensationDataObj.currency = ''
}