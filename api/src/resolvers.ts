import * as product from './modules/product/product.resolver';
import * as scalars from './scalars';
export default {
  ...scalars,
  Query: {
    product: product.findOne,
    products: product.findAll,
  },
  Mutation: {
    createProduct: product.createProduct,
  },
}
