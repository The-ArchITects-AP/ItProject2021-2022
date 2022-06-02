//interfaces overeenkomstig met ViewModels API (backend)

//path [gegevens/{kbonummer}]
export interface NameView {
    enterpriseName: string;
    street: string
    number: string;
    postalCode: string;
    city: string
}

//path [accountingdata/{kbonummer}]
export interface AccountingView {
    depositDate: Date;
    eigenVermogen: string;
    schulden: string;
    bedrijfswinst: string
}

//path [search/alldata] 
//path [/search/searchquery/{searchVariable}]
export interface FullView {
    enterpriseName: string;
    street: string
    number: string;
    postalCode: string;
    city: string
    depositDate: Date;
    eigenVermogen: string;
    schulden: string;
    bedrijfswinst: string
}