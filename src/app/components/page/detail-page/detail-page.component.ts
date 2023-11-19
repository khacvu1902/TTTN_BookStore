import { AuthService } from './../../../services/auth.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CommentService } from 'src/app/services/comment.service';
import { FormBuilder , FormGroup } from '@angular/forms';


@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent {
  product: any;
  products: any[] = [];
  id: any
  comment: any=[]
  post: FormGroup
  rating:FormGroup
  rate:any=[]


  @ViewChild('quantity') quantity!: ElementRef



  constructor(private productsService: ProductsService,
    private authService: AuthService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
    private formBuilder: FormBuilder ,) { 
      this.post = this.formBuilder.group({
        userId: [''],
        productId: [''],
        content: [''],
      })
      this.rating = this.formBuilder.group({
        userId: [''],
        productId: [''],
        rating: [''],
      })
    }

  ngOnInit() {
    this.getOneProduct()
    this.getAllProducts()
    this.getCommentByIdProduct()
    this.getRatingByIdUser()
  }

  stars: number[] = [1, 2, 3, 4, 5];
  productRating: number = 0;

  onStarClick(rating: number): void {
    this.productRating = rating;
    console.log("hee",rating);
  }

  submitRating(): void {
    const valueAddress = this.rating.value
    this.route.paramMap.subscribe((params) => {
      this.id = String(params.get('id'));
      const productId = this.id;

      // Lấy thông tin người dùng từ local storage
      const user = JSON.parse(this.authService.getUserLocal());
      const userId = user._id;
// Đây là nội dung bình luận, bạn phải có giá trị này từ giao diện người dùng.

      // Tạo đối tượng comment
      valueAddress.userId = userId;
      valueAddress.productId = productId;
      valueAddress.rating = this.productRating

      console.log(valueAddress);
      // Gọi service để tạo bình luận
      this.commentService.createRatingByProduct(valueAddress).subscribe((data: any) => {
          console.log("comment", this.rating);
        });
    });
  }

  getOneProduct() {
    this.route.paramMap.subscribe((params) => {
      this.id = String(params.get('id'));
      this.productsService.getIdProducts(this.id).subscribe((data: any) => {
        this.product = data.data
        console.log(data);
      })
    })
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.products = data.data
    })
  }

  addProductCart = (productId: any) => {
    try {
      const user = JSON.parse(this.authService.getUserLocal());
      const userId = user._id;
      const quantity = this.quantity.nativeElement.value; // Assuming this.quantity.nativeElement.value is accessible

      this.cartService.addToCart(userId, productId, { userId, productId, quantity }).subscribe((data) => {
        console.log(data);
        this.router.navigate([`user/${userId}/cart`]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  decreaesQuantity() {
    if (this.quantity.nativeElement.value > 1) {
      this.quantity.nativeElement.value--
      this.updatePriceProduct(this.quantity.nativeElement.value)
    }
  }
  imcreaesQuantity() {
    this.quantity.nativeElement.value++
    this.updatePriceProduct(this.quantity.nativeElement.value)
  }

  updatePriceProduct(quantity: any) {
    this.product.price = this.quantity.nativeElement.value * this.product.price
  }

  getCommentByIdProduct() {
    this.route.paramMap.subscribe((params) => {
      this.id = String(params.get('id'));
      this.commentService.getCommentByProducts(this.id ).subscribe((data: any) => {
        this.comment = data.data;
        console.log("comment", data);
      });
    });
  }
  userRate:any=[];
  getRatingByIdUser() {
    const user = JSON.parse(this.authService.getUserLocal());
      const userId = user._id;
      this.commentService.getratingByUser(userId).subscribe((data: any) => {
        this.userRate = data.ratings;
        console.log("rating", data);
      });
  }

  deleteRating(id:any){
    this.commentService.deleteRating(id).subscribe((data:any)=>{
      console.log("delete thành công");
    })
  }
  deleteComment(id:any){
    this.commentService.deleteComment(id).subscribe((data:any)=>{
      console.log("delete thành công");
    })
  }
  createCommentByIdProduct() {
    const valueAddress = this.post.value
    this.route.paramMap.subscribe((params) => {
      this.id = String(params.get('id'));
      const productId = this.id;

      // Lấy thông tin người dùng từ local storage
      const user = JSON.parse(this.authService.getUserLocal());
      const userId = user._id;
// Đây là nội dung bình luận, bạn phải có giá trị này từ giao diện người dùng.

      // Tạo đối tượng comment
      valueAddress.userId = userId;
      valueAddress.productId = productId;


      // Gọi service để tạo bình luận
      this.commentService.createCommentByProducts(valueAddress).subscribe((data: any) => {
          console.log("comment", this.comment);
        });
    });
  }



}
