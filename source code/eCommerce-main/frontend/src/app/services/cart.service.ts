import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: Map<number, number> = new Map<number, number>(); // Dùng Map để lưu trữ giỏ hàng, key là id sản phẩm, value là số lượng

  constructor() {
    // Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service            
    this.refreshCart()
  }
  public  refreshCart(){
    const storedCart = localStorage.getItem(this.getCartKey());
    if (storedCart) {
      this.cart = new Map(JSON.parse(storedCart));      
    } else {
      this.cart = new Map<number, number>();
    }
  }
  private getCartKey():string {    
    const userResponseJSON = localStorage.getItem('user'); 
    const userResponse = JSON.parse(userResponseJSON!);  
    debugger
    return `cart:${userResponse?.id ?? ''}`;

  }

  addToCart(productId: number, quantity: number = 1): void {
    debugger
    if (this.cart.has(productId)) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên quantity
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào với số lượng là quantity
      this.cart.set(productId, quantity);
    }
     // Sau khi thay đổi giỏ hàng, lưu trữ nó vào localStorage
    this.saveCartToLocalStorage();
  }
  
  getCart(): Map<number, number> {
    return this.cart;
  }
  // Lưu trữ giỏ hàng vào localStorage
  private saveCartToLocalStorage(): void {
    debugger
    localStorage.setItem(this.getCartKey(), JSON.stringify(Array.from(this.cart.entries())));
  }  
  setCart(cart : Map<number, number>) {
    this.cart = cart ?? new Map<number, number>();
    this.saveCartToLocalStorage();
  }
  // Hàm xóa dữ liệu giỏ hàng và cập nhật Local Storage
  clearCart(): void {
    this.cart.clear(); // Xóa toàn bộ dữ liệu trong giỏ hàng
    this.saveCartToLocalStorage(); // Lưu giỏ hàng mới vào Local Storage (trống)
  }
}

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private cart: Map<string, { 
//     productId: number, 
//     productName: string, 
//     variantId: number, 
//     variantName: string, 
//     quantity: number 
//   }> = new Map();

//   constructor() {
//     this.refreshCart();
//   }

//   public refreshCart() {
//     const storedCart = localStorage.getItem(this.getCartKey());
//     if (storedCart) {
//       try {
//         const parsedCart = JSON.parse(storedCart);
//         if (Array.isArray(parsedCart)) {
//           this.cart = new Map<string, { 
//             productId: number, 
//             productName: string, 
//             variantId: number, 
//             variantName: string, 
//             quantity: number 
//           }>(parsedCart);
//         } else {
//           this.cart.clear();
//         }
//       } catch (error) {
//         console.error("Lỗi khi parse giỏ hàng từ localStorage:", error);
//         this.cart.clear();
//       }
//     } else {
//       this.cart.clear();
//     }
//   }

//   private getCartKey(): string {    
//     const userResponseJSON = localStorage.getItem('user'); 
//     const userResponse = userResponseJSON ? JSON.parse(userResponseJSON) : null;
//     return `cart:${userResponse?.id ?? 'guest'}`;
//   }

//   addToCart(
//     productId: number, 
//     productName: string, 
//     variantId: number, 
//     variantName: string, 
//     quantity: number
//   ): void {
//     const cartKey = `${productId}-${variantId}`; // Key duy nhất cho từng biến thể

//     if (this.cart.has(cartKey)) {
//       const cartItem = this.cart.get(cartKey)!;
//       cartItem.quantity += quantity;
//     } else {
//       this.cart.set(cartKey, { productId, productName, variantId, variantName, quantity });
//     }

//     this.saveCartToLocalStorage();
//   }

//   getCart(): Map<string, { 
//     productId: number, 
//     productName: string, 
//     variantId: number, 
//     variantName: string, 
//     quantity: number 
//   }> {
//     return this.cart;
//   }

//   private saveCartToLocalStorage(): void {
//     localStorage.setItem(this.getCartKey(), JSON.stringify(Array.from(this.cart.entries())));
//   }

//   setCart(cart: Map<string, { 
//     productId: number, 
//     productName: string, 
//     variantId: number, 
//     variantName: string, 
//     quantity: number 
//   }>) {
//     this.cart = cart ?? new Map();
//     this.saveCartToLocalStorage();
//   }

//   clearCart(): void {
//     this.cart.clear();
//     this.saveCartToLocalStorage();
//   }
// }
