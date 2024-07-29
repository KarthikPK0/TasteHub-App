import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  

  insideMenu:boolean = true
  allMenu:any = []
  searchKey:string = ""

  constructor(private api:ApiService, private toastr:ToastrService){}

  ngOnInit(): void {
    this.api.getAllMenuAPI().subscribe((result:any)=>{
      this.allMenu = result
      console.log(this.allMenu);
      
    })
  }


  addToWishlist(menu:any){
    if(sessionStorage.getItem("token")){
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
