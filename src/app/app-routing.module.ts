import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewComponent } from './view/view.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"menu", component:MenuComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent}, 
  {path:"wishlist", canActivate:[authGuard], component:WishlistComponent},
  {path:":id/view",  component:ViewComponent},
  {path:"checkout", canActivate:[authGuard], component:CheckoutComponent}, 
  {path:"cart", canActivate:[authGuard], component:CartComponent},
  {path:"about", component:AboutComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
