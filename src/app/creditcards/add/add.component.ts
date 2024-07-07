import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnDestroy {

 //constructor(private creditCardService : CreditcardsService,
//   private router:Router
// ){}


  newCreditCard:CreditCard={
    id:0,
    cardName: "",
    type: "",
    cardNumber: "12345666778",
    bankName: "Bank Of Baroda",
    maxCredit: 10000,
    active: true,
    annualFee: 0,
    interestRate: 2.45,
    creditLimit: 2000000,
    introOffer: 2000,
    introOfferDuration: 2,
    recommendedCreditScore: "200-500",
    expiryDate : ""
  }

  saveCreditCard(){
    console.log('saveCreditCard' ,this.newCreditCard);
    this.creditCardService.createCreditCard(this.newCreditCard).subscribe(data=>{
      console.log('saveCreditCard' ,data);
      this.router.navigate(['creditcards']);
    })
  }
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private creditCardService : CreditcardsService, private router: Router) { 
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event) => {
      const navigationEnd = event as NavigationEnd;
      if (navigationEnd.url.includes('/edit')) {
        this.router.navigate(['/add']); // redirect back to add component
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
