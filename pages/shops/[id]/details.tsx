import { useRouter } from "next/router"
import { gql } from '@apollo/client/core'
import { useQuery } from '@apollo/client'

const GET_SHOP_BY_ID = gql`
  query GetShop($shopId: ID!) {
    findShopById(id: $shopId) {
      _id
      name
      description products {
        data {
          _id
          name
        }
      }
    }
}
`


export default function Details() {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(GET_SHOP_BY_ID, {
    variables: { shopId: id }
  })

  if(loading) {
    return <div>loading...</div>
  }
  return (
    <div className="p-16">
      <h1>{data.findShopById.name}</h1>
      <p>{data.findShopById.description}</p>
      {
        data.findShopById.products.data.map(
          (product: any) => (
            <div key={product._id} className="rounded-lg bg-white shadow mb-1">
              <ul className="divide-y divide-gray-100">
                <li className="flex kustify-between p-3">
                  <div>
                    <p>{product.name}</p>
                  </div>
                  <div>
                    <button className="mr-2 underline pointer">
                      Edit
                    </button>
                    <button className="ml-1 underline pointer">
                      Delete
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          )
        )
      }
    </div>
  )
}