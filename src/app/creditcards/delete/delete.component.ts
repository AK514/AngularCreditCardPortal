import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  creditCardDetails!:CreditCard;
  creditCardId!:Number;
  private destroy:Subject<void>= new Subject<void>();


  constructor(private creditCardService:CreditcardsService,
    private router:Router,
    private matSnackBar : MatSnackBar,
    private route:ActivatedRoute){
    this.creditCardId= parseInt(this.route.snapshot.paramMap.get('id') || "");
    this.creditCardService.deleteCreditCard( this.creditCardId)
    .pipe(takeUntil(this.destroy))
    .subscribe(data=>{
        this.showSuceccMessage("Credit Card Deleted Successfully");
      this.router.navigate(['creditcards']);
    });
  }

  showSuceccMessage(message: string){
    this.matSnackBar.open(message, 'close', {
                'duration': 3000,
                'horizontalPosition':'end',
                'verticalPosition':'top'  });
  }
  ngOnDestroy(){
    this.destroy.next();
    this.destroy.complete();
  }

}
