import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  creditCardDetails!:CreditCard;
  creditCardId!:Number;

  constructor(private creditCardService:CreditcardsService, private route:ActivatedRoute){
    this.creditCardId= parseInt(this.route.snapshot.paramMap.get('id') || "");
    this.creditCardService.getCreditCardById( this.creditCardId).subscribe((data:CreditCard)=>{
      this.creditCardDetails=data;
    })
  }

}
