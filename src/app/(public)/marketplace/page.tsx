import Link from "next/link";
import { createDB } from "../../../lib/db";
import { MarketplaceFilters } from "./MarketplaceFilters";

type Props = { searchParams: { [key: string]: string | undefined } };

export default async function MarketplacePage({ searchParams }: Props) {
  console.log("searchParams:");
  console.log(searchParams);

  const priceFrom =
    searchParams["priceFrom"] != null
      ? parseFloat(searchParams["priceFrom"])
      : null;
  const priceTo =
    searchParams["priceTo"] != null
      ? parseFloat(searchParams["priceTo"])
      : null;
  const searchText =
    searchParams["searchText"] != null ? searchParams["searchText"] : null;

  const db = createDB();

  let query = db
    .selectFrom("marketplace")
    .selectAll()
    .orderBy("createdAt desc");

  if (priceFrom != null) {
    query = query.where("price", ">=", priceFrom);
  }
  if (priceTo != null) {
    query = query.where("price", "<=", priceTo);
  }
  if (searchText != null) {
    query = query.where((eb) =>
      eb.or([
        eb("name", "like", `%${searchText}`),
        eb("description", "like", `%${searchText}`),
      ])
    );
  }

  const marketplace = await query.execute();

  return (
    <div>
      <MarketplaceFilters
        initialPriceFrom={searchParams["priceFrom"] ?? null}
        initialPriceTo={searchParams["priceTo"] ?? null}
        initialSearchText={searchParams["searchText"] ?? null}
      />
      {marketplace.map((p) => (
        <div key={p.id} className="card bg-base-100 w-96 drop-shadow-md">
          <div className="card-body">
            <p>Name: {p.name}</p>
            <p>Description: {p.description}</p>
            <p>Category: {p.category}</p>
            <p>Price: {p.price}</p>
            <p>Created At: {new Date(p.createdAt).toString()}</p>
            <Link href={`/user/${p.userId}`}>{p.userId}</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
