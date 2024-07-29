import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  allMenu:any = []

  constructor(private api:ApiService, private toastr:ToastrService){}

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist(){
    this.api.getWishlistAPI().subscribe((result:any) => {
      this.allMenu = result
      console.log(this.allMenu);
      
      this.api.getWishlistCount()
    })
  }


  removeItem(id:any){
    this.api.removeWishlistAPI(id).subscribe((res:any) => {
      this.getWishlist()
    })
  }

  addToCart(menu:any){
    if(sessionStorage.getItem('token')){
       menu.quantity = 1
       this.api.addToCartAPI(menu).subscribe({
        next:(result:any) => {
          this.toastr.success(result)
          this.api.getCartCount()
          this.removeItem(menu._id)
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
