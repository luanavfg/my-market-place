import type { NextPage } from 'next'
import { gql, useQuery } from '@apollo/client'
import ProductList from '../components/ProductList'

const GET_PRODUCTS = gql`
query {
  getAllProducts {
    data {
      _id
      name
      description
      price
      imageUrl
      shop {
        _id
      }
    }
  }
}
`

const Home = () => {
  const x = useQuery(GET_PRODUCTS)
  console.log('xxxxxxx', x)
  const { data, loading } = useQuery(GET_PRODUCTS)
  if (loading) return (<p>Loading...</p>)
  return (<ProductList products={data.getAllProducts.data} /> )
}

export default Home