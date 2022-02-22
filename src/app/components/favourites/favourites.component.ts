import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  user=localStorage.getItem('email');
  products:any[]=[];
  productsInFav:any[]=[];
  constructor(private _userService:UserService,private router:Router) { }

  ngOnInit(): void {
    for (var i = 0; i < localStorage.length; i++) {
      let a=localStorage.key(i);
      if(a?.substring(0,3)=='Fav'){
        let products = localStorage.getItem(a);
        console.log(products);
        
        let splitProduct=products?.split('#$');
        this.productsInFav.push(splitProduct);
        console.log(this.productsInFav[0][0]);
        
        
      }
      
  }
  }
  omg(key:any) {
    // for (var i = 0; i < localStorage.length; i++) {
    //   let a = localStorage.key(i);
    //   if (a?.substring(0, 7) == 'product') {
    //     let products = localStorage.getItem(a);
    localStorage.removeItem(key);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/favourites']);
   });
  // this.router.navigate(['/cart'], {relativeTo: this.route, skipLocationChange: true});
  // this.ngOnInit();
  }
}
