
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import ascending  from '../assets/asec.png';
import desc from '../assets/desc.png';

// import './App.css';

function App() {

    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [bookData, setBookData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading,setLoading] = useState('fasle');

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`https://openlibrary.org/people/mekBot/books/want-to-read.json`);
      setBookData(response?.data?.reading_log_entries || []);
      console.log(bookData);
      setLoading(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  const handleSort = (field, order) => {
    // const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const sortedBooks = [...bookData].sort((a, b) => {
    let aValue = a.work[sortField];
    let bValue = b.work[sortField];

    if (sortField === 'logged_date') {
      aValue = new Date(a.logged_date);
      bValue = new Date(b.logged_date);
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBooksPerPageChange = (event) => {
    setBooksPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page whenever books per page change
  };

  return (
    <div className="flex flex-col my-10 mx-8 bg-gray-100 rounded-xl">
        <div className='flex justify-between px-2 '>
        <div className='flex font-bold my-4 '>
        <h1 className="text-3xl text-orange-200 ">nua</h1>

        </div>
        <div className='flex font-bold my-4 '>
        <h1 className="text-3xl  ">Dashboard</h1>

        </div>
        <div className='flex justify-center items-center gap-2'>
            <h1 className='text-xl text-orange-200'>Hii, {user?.given_name}</h1>
            <img className= 'w-[18%] rounded-full' src={user?.picture}/>
            <button className='bg-orange-200 p-2 rounded-xl text-white' onClick={() => logout()}>Logout</button>
        </div>
        </div>

        <div className="flex justify-between items-center my-4 w-full">
        <div>
          <span>Records per page: </span>
          <select
            value={booksPerPage}
            onChange={handleBooksPerPageChange}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex justify-center">
          {Array.from({ length: Math.ceil(bookData.length / booksPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-2 py-1 border rounded ${
                currentPage === i + 1 ? 'bg-orange-200 text-white' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
        

      <div className="overflow-x-auto w-full bg-gray-100">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-200">Cover</th>
              <th className="px-4 py-2 border border-gray-200  ">
                <div className="flex justify-center items-center gap-2 w-full">
                  <span className='w-full'>Title</span>
                  <div className="flex flex-col items-center">
    <button onClick={() => {handleSort('title', 'asc')
        setSortOrder(asc); }
    } className="text-blue-500">
      <img className='w-[5%]' src={ascending} alt="Ascending" />
    </button>
    <button onClick={() => handleSort('title', 'desc')} className="text-blue-500">
      <img className='w-[5%]' src={desc} alt="Descending" />
    </button>
  </div>

                </div>
                
              </th>
              
              <th className="px-4 py-2 border border-gray-200">
                <div className="flex justify-center items-center gap-2">
                  <span className='w-full'>Author</span>
                  <div className="flex flex-col items-center">
    <button onClick={() => handleSort('author_names', 'asc')} className="text-blue-500">
      <img className='w-[5%]' src={ascending} alt="Ascending" />
    </button>
    <button onClick={() => handleSort('author_names', 'desc')} className="text-blue-500">
      <img className='w-[5%]' src={desc} alt="Descending" />
    </button>
  </div>
                </div>
              </th>
              <th className="px-4 py-2 border border-gray-200">
                <div className="flex items-center gap-2 ">
                  <span className='w-full'>First Publish Year</span>
                  <div className="flex flex-col items-center">
    <button onClick={() => handleSort('first_publish_year', 'asc')} className="text-blue-500">
      <img className='w-[5%]' src={ascending} alt="Ascending" />
    </button>
    <button onClick={() => handleSort('first_publish_year', 'desc')} className="text-blue-500">
      <img className='w-[5%]' src={desc} alt="Descending" />
    </button>
  </div>
                </div>
              </th>
              <th className="px-4 py-2 border border-gray-200">
                <div className="flex items-center gap-2">
                  <span className='w-full'>Logged Date</span>
                  <div className="flex flex-col items-center">
    <button onClick={() => handleSort('logged_date', 'asc')} className="text-blue-500">
      <img className='w-[5%]' src={ascending} alt="Ascending" />
    </button>
    <button onClick={() => handleSort('logged_date', 'desc')} className="text-blue-500">
      <img className='w-[5%]' src={desc} alt="Descending" />
    </button>
  </div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
  {loading ?  (
    currentBooks.map((entry, index) => (
      <tr key={index} className="hover:bg-white bg-gray-100 rounded-xl">
        <td className="px-4 py-2 border border-gray-200">
          {entry.work.cover_id && (
            <img
              src={`http://covers.openlibrary.org/b/id/${entry.work.cover_id}-S.jpg`}
              alt={`${entry.work.title} cover`}
              className="w-16"
            />
          )}
        </td>
        <td className="px-4 py-2 border border-gray-200">{entry.work.title}</td>
        <td className="px-4 py-2 border border-gray-200">{entry.work.author_names.join(', ')}</td>
        <td className="px-4 py-2 border border-gray-200">{entry.work.first_publish_year}</td>
        <td className="px-4 py-2 border border-gray-200">{entry.logged_date}</td>
      </tr>
    ))
  ) : 
  (
    <tr>
      <td colSpan="5" className="text-center py-4">Loading Data...</td>
    </tr>
  )}
</tbody>

        
            
         
        </table>
      </div>
      
    </div>
  );
}

export default App;

