import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  public payPalConfig ? : IPayPalConfig;

  checkoutForm = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    address:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*'), Validators.minLength(6), Validators.maxLength(6)]]
  })

  checkoutStatus:boolean = false
  totalAmount:string = ''

  constructor(private fb:FormBuilder, private toastr:ToastrService, private router: Router, private api: ApiService){}

  cancel(){
    this.checkoutForm.reset()
  }
  
  proceedToBuy(){
       if(this.checkoutForm.valid){
        this.checkoutStatus = true 
        if(sessionStorage.getItem('total')){
            this.totalAmount = sessionStorage.getItem('total') || '' 
            this.initConfig()
        }
       }else{
        this.toastr.info('Invalid Form!!')
       }
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AaA8OM7J95ddqF1IIrOI5o4eAbGif-6PdQWniV7PAPY-6y-Rz0xur1SXRFFCBLgsMiaWMNfMKrel1qX9',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.totalAmount 
                } 
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.api.emptyCartAPI().subscribe((res:any) => {
                this.api.getCartCount()
                this.toastr.success("Successfully completed the payment thankyou!!")
                this.checkoutForm.reset()
                this.router.navigateByUrl('/')
            })
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.toastr.warning('Transaction has been Cancelled!!')
            this.checkoutStatus = false

        },
        onError: err => {
            console.log('OnError', err);
            this.toastr.warning('Transaction has been failed... Please try after sometime!!')
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            
        }
    };
}
 

}
