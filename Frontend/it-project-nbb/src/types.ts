//interfaces overeenkomstig met ViewModels API (backend)

export interface NameView {
    EnterpriseName: string;
    Street: string
    Number: string;
    PostalCode: string;
    City: string
}

export interface AccountingView {
    DepositDate: Date;
    EigenVermogen: number;
    Schulden: number;
    Bedrijfswinst: number
}

//NBB API: interfaces output eerste query (om reference numbers op te halen) 

export interface RootObject {
    ReferenceNumber: string;
    DepositDate: string;
    ExerciseDates: ExerciseDates;
    ModelType: string;
    DepositType: string;
    Language: string;
    Currency: string;
    EnterpriseNumber: string;
    EnterpriseName: string;
    Address: Address;
    LegalForm: string;
    LegalSituation: string;
    FullFillLegalValidation: boolean;
    ActivityCode?: any;
    GeneralAssemblyDate: string;
    AccountingDataURL: string;
    DataVersion: string;
    ImprovementDate?: any;
    CorrectedData?: any;
}

export interface ExerciseDates {
    startDate: string;
    endDate: string;
}

export interface Address {
    Box?: any;
    City: string;
    CountryCode: string;
    Number: string;
    PostalCode: string;
    Street: string;
}