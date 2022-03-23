//NBB API: interfaces output query kbo-nummer 
//Mockoon test 
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

//WorldTimeApi: om App te testen met werkende API (NBB API down) 
//achteraf deleten 
export interface Timezone {
    abbreviation: string;
    client_ip: string;
    datetime: Date;
    day_of_week: number;
    day_of_year: number;
    dst: boolean;
    dst_from?: any;
    dst_offset: number;
    dst_until?: any;
    raw_offset: number;
    timezone: string;
    unixtime: number;
    utc_datetime: Date;
    utc_offset: string;
    week_number: number;
}

export {}