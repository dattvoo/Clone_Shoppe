import { IPurchase, PurchaseListStatus, PurchaseStatus } from '../types/purchase.type'
import { SuccessRepone } from '../types/utils.type'
import http from '../utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessRepone<PurchaseStatus>>(`${URL}/add-to-cart`, body)
  },
  getPuchaseList(params: { status: PurchaseListStatus }) {
    return http.get<SuccessRepone<IPurchase[]>>(URL, { params })
  }
}

export default purchaseApi
