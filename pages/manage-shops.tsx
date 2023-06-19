import NewShopForm from "../components/NewShopForm";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { gql, useQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0';
import ShopList from "../components/ShopList";

const GET_SHOPS_BY_OWNER = gql`
  query getShopsByOwnerID($ownerId: String!) {
    data {
      _id
      name
    }
  }
`

export default function ManageShops(props: any) {
  const { user } = useUser()
  const { data } = useQuery(GET_SHOPS_BY_OWNER, {
    variables: { ownerId: user?.sub }
  })
  return (
    <>
      <NewShopForm accessToken={props.accessToken}/>
      {
        data ? (
          <ShopList shops={data.getShopsByOwnerID.data}/>
        ) : (
          <div>Loading...</div>
        )
      }
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  const { accessToken } = await getAccessToken(ctx.req, ctx.res)

  return {
    props: {
      accessToken
    }
  }
}