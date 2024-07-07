export interface CreditCard {
    id: number;
    cardName: String;
    type: String;
    cardNumber: String;
    bankName: String;
    maxCredit: number;
    active: boolean;
    annualFee: number;
    interestRate: number;
    creditLimit: number;
    introOffer: number;
    introOfferDuration: number;
    recommendedCreditScore: String;
    expiryDate:String;
}
