import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

   menu:any = {}

   constructor(private route:ActivatedRoute, private api:ApiService, private toastr:ToastrService){}

   ngOnInit(): void {
     this.route.params.subscribe((result:any)=>{
      const {id} = result
      console.log(id);
      this.getMenuDetails(id)
     })
   }

   getMenuDetails(mid:any){
    this.api.viewMenuAPI(mid).subscribe((result:any)=>{
      this.menu = result
      console.log(this.menu);
      
    })
   }

   addToWishlist(menu:any){
    if(sessionStorage.getItem('token')){
       this.api.addToWishlistAPI(menu).subscribe({
        next:(result:any) => {
          this.toastr.success(`Item ${result.name} added to your wishlist!!`)
          this.api.getWishlistCount()
        },
        error:(reason:any) => {
      
          this.toastr.warning(reason.error)
        }
       })
    }else{
      this.toastr.info('Please login!!')
    }
    
  }

  addToCart(menu:any){
    if(sessionStorage.getItem('token')){
       menu.quantity = 1
       this.api.addToCartAPI(menu).subscribe({
        next:(result:any) => {
          this.toastr.success(result)
          this.api.getCartCount()
        },
        error:(reason:any) => {
          this.toastr.warning(reason.error)
        }
       })

    }else{
      this.toastr.info('Please login!!')
    }
  }

 
}
