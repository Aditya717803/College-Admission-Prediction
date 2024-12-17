import React, { useEffect, useState } from 'react';


const Table = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching student data:', error));
  }, []);

  return (

    <section className="mx-auto w-full max-w-7xl px-4 py-6 bg-gray-950 shadow-md rounded-lg">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="w-full text-center">
          <h2 className="text-3xl font-mono text-white ">Students</h2>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-white rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-transparent">
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-center text-sm font-medium text-white font-mono "
                    >
                      PRN
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-center text-sm font-medium text-white font-mono"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-center text-sm font-medium text-white font-mono"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-center text-sm font-medium text-white font-mono"
                    >
                      Branch
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-center text-sm font-medium text-white font-mono"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-transparent">
                  {students.map((student) => (
                    <tr
                      key={student.prn}
                      className="divide-x divide-gray-200 hover:bg-indigo-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-900 font-mono">
                        {student.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-900">
                        {student.date}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-900">
                        {student.branch}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-900">
                        AI&DS
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-900">
                        {student.attended ? (
                          <span className="inline-block rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-block rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            Yes
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;
