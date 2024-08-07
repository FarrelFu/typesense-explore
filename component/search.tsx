"use client";
import { useState } from 'react';
import typesense from '@/typesense/typesenseClient';

const SearchComponent = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [resultIds, setResultIds] = useState<string[]>([]); 

  //fungsi untuk kirim id ke database fbm catalogue
  const SendResultIDToAnotherDatabase = async (id: string[])=>{

  }

  //algoritma search
  const handleSearch = async () => {
    if (!query) return;
    try {
      const searchResults = await typesense.collections('fooddies').documents().search({
        q: query,
        query_by: 'name', //ini bisa querynya nyari sesuai yang kita inginkan, cukup sesuaikan dengan data di database. misal kalo mau cari nama pakai name, kalo mau cari stock tinggal tambah instock (tapi harus string/array)
      });

      
      const ids = searchResults.hits.map((hit: any) => hit.document.id);
      setResults(searchResults.hits.map((hit: any) => hit.document));
      setResultIds(ids);
      
      setError(null);
    } catch (err) {
      console.error('Error performing search:', err);
      setError('Error performing search');
      setResults([]);
      setResultIds([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>Error: {error}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <h3>{result.name}</h3>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
      <div>
        <h4>Result IDs:</h4>
        <ul>
          {resultIds.map((id, index) => (
            <li key={index}>{id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchComponent;
