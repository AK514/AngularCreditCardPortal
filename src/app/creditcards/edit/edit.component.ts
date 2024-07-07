import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  editCreditCardForm!:FormGroup
  creditCardData:CreditCard | null=null;

  creditCardDetails!:CreditCard;
   private destroy$ : Subject<void>=new Subject<void>();

  constructor( private formBuilder: FormBuilder,
    private route:ActivatedRoute, private router:Router,
    private matSnackBar: MatSnackBar,
     private creditCardService:CreditcardsService){
   this.editCreditCardForm = this.formBuilder.group({
    id:[''],
      cardName :['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      type :['',Validators.required],
      cardNumber :['',Validators.required],
      bankName :['',Validators.required],
      maxCredit : ['',Validators.required],
      active :[false,Validators.required],
      interestRate : ['',Validators.required],
      expiryDate:['',Validators.required],
      recommendedScore : ['',Validators.required] 
    })
    
  }

  ngOnInit(){
    const id = parseInt(this.route.snapshot.paramMap.get("id") || '');
    if(id !== 0){
      this.creditCardService.getCreditCardById(id)
      .pipe(takeUntil(this.destroy$))                  
      .subscribe((data)=>{
        this.creditCardData = data;

        this.editCreditCardForm.patchValue(this.creditCardData);
      });
    }
  }

  onSubmit(){
    console.log(this.editCreditCardForm.value);
    if(this.editCreditCardForm.valid){
      const updatedFormData : CreditCard =this.editCreditCardForm.value;
    
      this.creditCardService.updateCreditCard(updatedFormData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(()=>{
        this.showSuccessMessage("Credit Card updated successfully..!");
        this.router.navigate(['/creditcards']);
      });
     
    }
  }

  showSuccessMessage(message:string){
    this.matSnackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
