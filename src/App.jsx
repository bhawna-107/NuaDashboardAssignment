// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import axios from 'axios';

// function App() {

//   const [bookData, setBookData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [booksPerPage, setBooksPerPage] = useState(10);
//   const fetchBookData = async() => {

//     try{
//       const response = await axios.get(`https://openlibrary.org/people/mekBot/books/want-to-read.json`);
//       console.log(response?.data?.reading_log_entries);
//       setBookData(response?.data?.reading_log_entries);

//     }catch(error){
//       console.log("error", error);
//     }
//   }

//   useEffect(() => {
//     fetchBookData();
//   }, [])


//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   // const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleBooksPerPageChange = (event) => {
//     setBooksPerPage(Number(event.target.value));
//     setCurrentPage(1); // Reset to first page whenever books per page change
//   };

//   return (

//     <div className='flex flex-col items-center'>
//     <h1 className='text-2xl font-bold my-4'>NUA Dashboard</h1>
//     <div className='overflow-x-auto w-full'>
//       <table className='min-w-full bg-white border border-gray-200'>
//         <thead>
//           <tr>
//           <th className='px-4 py-2 border border-gray-200'>Cover</th>

//             <th className='px-4 py-2 border border-gray-200'>
//               <div className='flex items-center'>
//                 <span>Title</span>
//                 <button onClick={() => handleSort('title')} className='ml-2 text-blue-500'>Sort</button>
//               </div>
//             </th>
//             <th className='px-4 py-2 border border-gray-200'>
//               <div className='flex items-center'>
//                 <span>Author</span>
//                 <button onClick={() => handleSort('author_names')} className='ml-2 text-blue-500'>Sort</button>
//               </div>
//             </th>
//             <th className='px-4 py-2 border border-gray-200'>
//               <div className='flex items-center'>
//                 <span>FIrst_Publish_Year</span>
//                 <button onClick={() => handleSort('first_publish_year')} className='ml-2 text-blue-500'>Sort</button>
//               </div>
//             </th>
//             <th className='px-4 py-2 border border-gray-200'>
//               <div className='flex items-center'>
//                 <span>Logged Date</span>
//                 <button onClick={() => handleSort('logged_date')} className='ml-2 text-blue-500'>Sort</button>
//               </div>
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookData.slice(currentPage * booksPerPage - booksPerPage, currentPage * booksPerPage).map((entry, index) => (
//             <tr key={index} className='hover:bg-gray-100'>
//               <td className='px-4 py-2 border border-gray-200'>
//                 {entry.work.cover_id && (
//                   <img src={`http://covers.openlibrary.org/b/id/${entry.work.cover_id}-S.jpg`} alt={`${entry.work.title} cover`} className='w-16' />
//                 )}
//               </td>
//               <td className='px-4 py-2 border border-gray-200'>{entry.work.title}</td>
//               <td className='px-4 py-2 border border-gray-200'>{entry.work.author_names.join(', ')}</td>
//               <td className='px-4 py-2 border border-gray-200'>{entry.work.first_publish_year}</td>
//               <td className='px-4 py-2 border border-gray-200'>{entry.logged_date}</td>
              
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     <div className='flex justify-between items-center my-4 w-full px-4'>
//         <div>
//           <span>Records per page: </span>
//           <select
//             value={booksPerPage}
//             onChange={handleBooksPerPageChange}
//             className='border border-gray-300 rounded px-2 py-1'
//           >
//             <option value={10}>10</option>
//             <option value={50}>50</option>
//             <option value={100}>100</option>
//           </select>
//         </div>
//         <div className='flex justify-center'>
//           {Array.from({ length: Math.ceil(bookData.length / booksPerPage) }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => paginate(i + 1)}
//               className={`mx-1 px-2 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//   </div>
  
//   )
// }

// export default App

import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [bookData, setBookData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`https://openlibrary.org/people/mekBot/books/want-to-read.json`);
      setBookData(response?.data?.reading_log_entries || []);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
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
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">NUA Dashboard</h1>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-200">Cover</th>
              <th className="px-4 py-2 border border-gray-200">
                <div className="flex items-center">
                  <span>Title</span>
                  <button onClick={() => handleSort('title')} className="ml-2 text-blue-500">
                    Sort
                  </button>
                </div>
              </th>
              <th className="px-4 py-2 border border-gray-200">
                <div className="flex items-center">
                  <span>Author</span>
                  <button onClick={() => handleSort('author_names')} className="ml-2 text-blue-500">
                    Sort
                  </button>
                </div>
              </th>
              <th className="px-4 py-2 border border-gray-200">
                <div className="flex items-center">
                  <span>First Publish Year</span>
                  <button onClick={() => handleSort('first_publish_year')} className="ml-2 text-blue-500">
                    Sort
                  </button>
                </div>
              </th>
              <th className="px-4 py-2 border border-gray-200">
                <div className="flex items-center">
                  <span>Logged Date</span>
                  <button onClick={() => handleSort('logged_date')} className="ml-2 text-blue-500">
                    Sort
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-100">
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
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center my-4 w-full px-4">
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
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

