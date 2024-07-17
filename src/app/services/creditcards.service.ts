import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/credit-card';
 import { Product } from '../models/product';

 export class Response{
  constructor(
    public count: number,
    public response: Product,
   
  ){}
 }

@Injectable({
  providedIn: 'root'
})
export class CreditcardsService {

  private apiUrl="http://localhost:3000/creditcards";
  constructor(private httpClient: HttpClient) { }

  //CRUD Functionality

  //create
  createCreditCard(creditCard:CreditCard):Observable<CreditCard>{
    return this.httpClient.post<CreditCard>(this.apiUrl,creditCard);
  }
  //retrieve all
  getAllCreditCards():Observable<CreditCard[]>{
    return this.httpClient.get<CreditCard[]>(this.apiUrl);
  }

  //get credit card by id
  getCreditCardById(id:Number):Observable<CreditCard>{
    const url=`${this.apiUrl}/${id}`;
    return this.httpClient.get<CreditCard>(url);
  }
  //update
  updateCreditCard(creditCard:CreditCard):Observable<CreditCard>{
    const url = `${this.apiUrl}/${creditCard.id}`;
    return this.httpClient.put<CreditCard>(url,creditCard);
  }
  //delete
  deleteCreditCard(id:Number):Observable<void>{
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
  welcomeHelloWorld():Observable<Response>{
    return this.httpClient.get<Response>("http://localhost:8081/product/getAllProducts");
  }

  // welcomeHelloWorld(){
  //   return this.httpClient.get<ProductClass[]>("http://localhost:8081/product/getAllProducts");
  // }


}
