export class Product {
  id: any;
  product_name: string = "";
  image:any;
  description: string = "";
  price:number=0;
  discount:number=0;
  subcat_id: any;
  cat_id: any;
  category!: object;
  subcategory!: object;

}
