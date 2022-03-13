import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  user=localStorage.getItem('email');
  products:any[]=[];
  productsInFav:any[]=[];
  constructor(private router:Router) { }

  ngOnInit(): void {
    for (var i = 0; i < localStorage.length; i++) {
      let a=localStorage.key(i);
      if(a?.substring(0,3)=='Fav'){
        let products = localStorage.getItem(a);        
        let splitProduct=products?.split('#$');
        this.productsInFav.push(splitProduct);
        
        
      }
      
  }
  }
  omg(key:any) {
    localStorage.removeItem(key);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/favourites']);
   });
  }
}
