import { Product, ProductList, ProductListConfig } from '../types/product.type'
import { SuccessRepone } from '../types/utils.type'
import http from '../utils/http'

const URL = 'products'
const productApi = {
  getProductList(params: ProductListConfig) {
    return http.get<SuccessRepone<ProductList>>(URL, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessRepone<Product>>(`${URL}/${id}`)
  }
}

export default productApi
