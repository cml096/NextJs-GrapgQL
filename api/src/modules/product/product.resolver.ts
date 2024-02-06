import { Attributes, Prisma, PrismaClient, Product, User } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient; user: User | undefined }
export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.ProductWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Product[]> {
  return context.orm.product.findMany({
    include: { attributes: true },
    where: args.where,
    skip: args.skip,
    take: args.take,
  })
}


export async function findOne(
  parent: ResolverParent,
  args: { id: string },
  context: ResolverContext
): Promise<Product | null> {
  return context.orm.product.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
    include: {
      attributes: true,
    },
  })
}

export const resolver: Record<
  keyof (Product & { attributes: Attributes }),
  (parent: Product & { attributes: Attributes }) => unknown
> = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt,
  deletedAt: (parent) => parent.deletedAt,
  updatedAt: (parent) => parent.updatedAt,
  sku: (parent) => parent.sku,
  name: (parent) => parent.name,
  price: (parent) => parent.price,
  image: (parent) => parent.image,
  attributes: (parent) => ({
    description: parent.attributes.description
  }),
}

export async function createProduct(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Product, 'name' | 'price' | 'image' | 'sku'> &
      Omit<Attributes, 'id'>
  },
  { orm, user }: ResolverContext
): Promise<Product> {
  // if (user == undefined) {
  //   throw new AuthenticationError('Unauthenticated request')
  // }

  const { name, image, price, sku, ...attributes } = data
  return orm.product.create({
    data: {
      name,
      price,
      image,
      sku,
      attributes: {
        create: attributes,
      },
    },
    include: { attributes: true },
  })
}
