// BookTable.tsx

import React from 'react';
// import styles from './BookTable.module.css';
import styles from '../../history/comp/styles/BookTable.module.css'

interface Book {
  name: string;
  date: string;
  time: string;
}

interface BookTableProps {
  books: Book[];
}

const BookTable: React.FC<BookTableProps> = ({ books }) => {
  return (
    <div className={styles.centeredTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Barber Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.name}</td>
              <td>{book.date}</td>
              <td>{book.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;