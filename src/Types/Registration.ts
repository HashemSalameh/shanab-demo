interface WorkingDetailsModel {    
    day: string;    
    from: string;    
    to: string; 
    localId:string;      
}

export interface Document {    
    documentTypeCode: string;    
    urls: string[];
}



export default interface RestaurantRegistrationRequest {
    nameAr: string;
    nameEn: string;
    password: string;
    confirmPassword: string;
    imageUrl: string;
    preferredLocale: string;
    district: string;
    documents: Document[];
    city: string;
    operationRepresentativePhoneNumber: string;
    email: string;
    foodCategories: number[];
    instagramSocialMediaLink: string;
    twitterSocialMediaLink: string;
    bankAccountIban: string;
    managementPhoneNumber: string;
    registrationNumber: string;
    workingDetails: WorkingDetailsModel[];
    operationRepresentativeFullNameAr: string;
    operationRepresentativeFullNameEn: string;
    operationRepresentativeEmailAddress: string;
    mainRestaurantBranchMapsLink: string;
    mainBranchNameEn: string;
    mainBranchNameAr: string;
    longitude: number;
    latitude: number;
    branchAddressName: string;
    branchStreet: string;
    branchAddressDescription: string;
    branchBuildingNumber: string;
    branchDistrict: string;
    branchCountry: string;
    branchCity: string;
}