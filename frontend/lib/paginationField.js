import { PAGINATION_QUERY } from '../components/Pagination'

export default function paginationField() {
  return {
    // tells Apollo we will take care of everything
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args

      // read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY })
      const count = data?._allProductsMeta?.count
      const page = skip / first + 1
      const pages = Math.ceil(count / first)

      // First thing it does is ask the read function for those items
      const items = existing.slice(skip, skip + first).filter((x) => x)

      // IF there are items
      // AND there aren't enough items to satisfy how many were requested
      // AND we are on the last page
      // THEN just send it
      if (items.length && items.length !== first && page === pages) {
        return items
      }

      if (items.length !== first) {
        console.log(`we don't have any items `)
        // we don't have any items we must go to the network to fetch them
        return false
      }

      // if there are items the return them from the cache and we don't need to go to the network
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna send them to apollo`,
          { items }
        )
        return items
      }

      // fallback to network
      return false

      // we can do either on eof two things
      // first thing we can do is return the items because they are already in the cache
      // the other thing we can do is to listen to return false from here, (network request)
    },

    merge(existing, incoming, { args }) {
      console.log('incoming', incoming)
      const { skip } = args
      // This runs when the Apollo client comes back from the network with our product
      console.log(`Merging items from the network ${incoming.length}`)
      console.log('existing', { existing })
      const merged = existing ? existing.slice(0) : []

      // add the ONLY the new incoming items to the exact position on the merged cache. since we show 2 elements per page (skip = 2) we add two new entries to merged array in the position skip + (number of items we already have before)
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip]
      }
      // finally we return the merged items form the cache
      return merged
    },
  }
}
