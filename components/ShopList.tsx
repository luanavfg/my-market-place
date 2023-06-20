import Link from "next/link";

export default function ShopsList({ shops }: { shops: any }) {

    return (
      <div className="p-16">
        <h1>Your Shops List</h1>
        {
          shops.map((shop: any) => (
            <div key={shop._id} className="rounded-lg bg-white shadow mb-1">
              <ul className="divide-y divide-gray-100">
                <li className="flex justify-between p-3">
                  <Link href={`shops/${shop._id}/details`} className="underline p-1">{shop.name}</Link>
                  <div>
                    <Link href={`shops/${shop._id}/products`} className={btnClass}>Add Product</Link>
                    <button className={deleteBtn}>Delete Shop</button>
                  </div>
                </li>
              </ul>
            </div>
          ))
        }
      </div>
    )
  }
  
  const btnClass = `rounded-full border border-transparent bg-indigo-600 px-3.5 py-2 text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`;
  const deleteBtn = `ml-2 rounded-full border border-transparent bg-pink-600 px-3.5 py-2 text-white shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2`;