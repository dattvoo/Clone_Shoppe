import { Product } from './product.type'

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = 0 | PurchaseStatus
export type AddToCart = {
  product_id: string
  buy_count: number
}
export interface IPurchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseStatus
  user: string
  product: Product
  createAt: string
  updateAt: string
}
