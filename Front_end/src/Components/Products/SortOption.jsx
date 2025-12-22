import React from 'react';
import { useSearchParams } from 'react-router';

export default function SortOption() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = e => {
    const sortBy = e.target.value;
    searchParams.set('sortBy', sortBy);
    setSearchParams(searchParams);
  };
  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get('sortBy') || ''}
        className="border p-2 rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="pricsAsc">Price : Low to High</option>
        <option value="priceDesc">Price : High tO Low</option>
        <option value="popularity">Populaity</option>
      </select>
    </div>
  );
}
