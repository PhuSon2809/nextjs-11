import React, { useState } from 'react';
import { StudentDetail } from '~/components/swr';

export default function SWRPage() {
  const [detailList, setDetailList] = useState([1, 1, 1]);

  function handleAddClick() {
    setDetailList((prev) => [...prev, 1]);
  }

  return (
    <div>
      <h1>SWR Playground</h1>
      <button onClick={handleAddClick}>Add Detail</button>

      <ul>
        {detailList.map((x, index) => (
          <li key={index}>
            <StudentDetail studentId="lea11ziflg8xoiza" />
          </li>
        ))}
      </ul>
    </div>
  );
}
