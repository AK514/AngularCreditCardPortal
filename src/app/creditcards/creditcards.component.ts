import { Component, ViewChild } from '@angular/core';
import { CreditCard } from '../models/credit-card';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CreditcardsService } from '../services/creditcards.service';

// const TABLE_DATA: CreditCard[]=[

//   {
//     id: 1,
//     cardName: "Visa",
//     type: "creditcard",
//     cardNumber: "1234567890123456",
//     bankName: "State Bank of India",
//     maxCredit: 100000,
//     active: true,
//     annualFee: 0,
//     interestRate: 2.5,
//     creditLimit: 100000,
//     introOffer: 2000,
//     introOfferDuration: 3,
//     recommendedCreditScore: "600-800"
//   },
//   {
//     id: 2,
//     cardName: "Visa",
//     type: "creditcard",
//     cardNumber: "1234567890123456",
//     bankName: "State Bank of India",
//     maxCredit: 100000,
//     active: true,
//     annualFee: 0,
//     interestRate: 2.5,
//     creditLimit: 100000,
//     introOffer: 2000,
//     introOfferDuration: 3,
//     recommendedCreditScore: "600-800"
//   },
//   {
//     id: 3,
//     cardName: "Visa",
//     type: "creditcard",
//     cardNumber: "1234567890123456",
//     bankName: "State Bank of India",
//     maxCredit: 100000,
//     active: true,
//     annualFee: 0,
//     interestRate: 2.5,
//     creditLimit: 100000,
//     introOffer: 2000,
//     introOfferDuration: 3,
//     recommendedCreditScore: "600-800"
//   }
// ];


@Component({
  selector: 'app-creditcards',
  templateUrl: './creditcards.component.html',
  styleUrls: ['./creditcards.component.scss']
})
export class CreditcardsComponent {
  creditCards:CreditCard[]=[];
  creditCardMaxAmount : number=0;


  constructor(private creditCardService:CreditcardsService){
    this.creditCardService.getAllCreditCards().subscribe((data : CreditCard[])=>{
      this.creditCards =data;

      this.datasource=new MatTableDataSource(this.creditCards);
      this.datasource.paginator=this.paginator;
      this.datasource.sort=this.sort;

      this.caluculateMatrics();
    });
  }

  displayColumns=["select","id","cardName","type","cardNumber","bankName","maxCredit","expiryDate","active","creditLimit","interestRate","actions"]

  datasource=new MatTableDataSource(this.creditCards);
  selection = new SelectionModel(true,[]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort ;

  // ngAfterViewInit(){
  //   this.datasource.paginator=this.paginator;
  //   this.datasource.sort=this.sort;
  // }

  selectHandler(row : CreditCard){
    this.selection.toggle(row as never);
  }

  caluculateMatrics(){
    console.log(this.creditCards);
    
    this.creditCardMaxAmount=this.creditCards.filter( card=> card.maxCredit>3000).length;
  }

}
