import React, { useState } from "react";

const DropdownSelection = () => {
  const [formData, setFormData] = useState({
    sem: "",
    branch: "",
    year: "",
    division: "",
    subject: "",
  });

  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dummyData = {
    attendance: [
      {
        date: "2024-12-10",
        students: [
          { prn: "122A8007", attendance: 1 },
          { prn: "122A8009", attendance: 0 },
          { prn: "122A8014", attendance: 1 },
          { prn: "122A8020", attendance: 0 },
          { prn: "122A8028", attendance: 1 },
        ],
      },
      {
        date: "2024-12-11",
        students: [
          { prn: "122A8007", attendance: 1 },
          { prn: "122A8009", attendance: 1 },
          { prn: "122A8014", attendance: 0 },
          { prn: "122A8020", attendance: 1 },
          { prn: "122A8028", attendance: 0 },
        ],
      },
      {
        date: "2024-12-12",
        students: [
          { prn: "122A8007", attendance: 1 },
          { prn: "122A8009", attendance: 0 },
          { prn: "122A8014", attendance: 0 },
          { prn: "122A8020", attendance: 1 },
          { prn: "122A8028", attendance: 1 },
        ],
      }
    ],
  };

  const fetchDummyData = () => {
    setLoading(true);
    setError(null);
    try {
      const data = dummyData;

      if (data.attendance && data.attendance.length > 0) {
        setAttendanceData(data.attendance);
      } else {
        setAttendanceData([]);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setError("Failed to fetch attendance data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.subject) {
      fetchDummyData();
    }

    setFormData((prev) => ({
      ...prev,
      subject: "",
    }));
  };

  const handleAttendanceChange = (attendanceIndex, studentIndex) => {
    const updatedAttendanceData = [...attendanceData];
    const newAttendanceStatus =
      updatedAttendanceData[attendanceIndex].students[studentIndex].attendance === 1
        ? 0
        : 1;
    updatedAttendanceData[attendanceIndex].students[studentIndex].attendance = newAttendanceStatus;

    setAttendanceData(updatedAttendanceData);
  };

  return (
    <div className="p-6">
      
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-10 items-center bg-black p-4 rounded"
    >
      <div className="flex flex-col">
        <label
          htmlFor="sem"
          className="mb-2 text-sm font-medium text-white text-center"
        >
          Semester
        </label>
        <select
          id="sem"
          value={formData.sem}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
          required
        >
          <option value="">Select Semester</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="branch"
          className="mb-2 text-sm font-medium text-white text-center"
        >
          Branch
        </label>
        <select
          id="branch"
          value={formData.branch}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
          required
        >
          <option value="">Select Branch</option>
          <option value="cse">Computer Science</option>
          <option value="aiml">AIML</option>
          <option value="mech">Mechanical</option>
          <option value="civil">Civil</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="year"
          className="mb-2 text-sm font-medium text-white text-center"
        >
          Batch
        </label>
        <select
          id="year"
          value={formData.year}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
          required
        >
          <option value="">Select Year</option>
          <option value="1">Year 1</option>
          <option value="2">Year 2</option>
          <option value="3">Year 3</option>
          <option value="4">Year 4</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="division"
          className="mb-2 text-sm font-medium text-white text-center"
        >
          Division
        </label>
        <select
          id="division"
          value={formData.division}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
          required
        >
          <option value="">Select Division</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="subject"
          className="mb-2 text-sm font-medium text-white text-center"
        >
          Subject
        </label>
        <select
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
          required
        >
          <option value="">Select Subject</option>
          <option value="DWM">DWM</option>
          <option value="WC">WC</option>
          <option value="Stats">Stats</option>
          <option value="CN">Computer Network</option>
        </select>
      </div>
        <button
          type="submit"
          className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-slate-200 mt-7"
        >
          Submit
        </button>
      </form>

      {/* Error Section */}
      {error && (
        <div className="mt-6 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {/* Table Section */}
      {loading && <p className="text-white">Loading attendance data...</p>}

      {attendanceData.length > 0 && !loading && (
        <div className="mt-6">
          <table className="table-auto w-full border-collapse border border-gray-400 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">PRN</th>
                <th className="border border-gray-400 px-4 py-2">1</th>
                <th className="border border-gray-400 px-4 py-2">2</th>
                <th className="border border-gray-400 px-4 py-2">3</th>
                <th className="border border-gray-400 px-4 py-2">Total</th>
              </tr>
            </thead>

            <tbody>
              {attendanceData[0].students.map((student, index) => {
                let cumulativeAttendance = 0;
                return (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2 text-white">
                      {student.prn}
                    </td>
                    {attendanceData.map((data, dataIndex) => {
                      const attendance = data.students[index].attendance;
                      cumulativeAttendance += attendance;
                      return (
                        <td key={dataIndex} className="border border-gray-400 px-4 py-2 text-white">
                          <input
                            type="checkbox"
                            checked={attendance === 1}
                            onChange={() => handleAttendanceChange(dataIndex, index)}
                            className="w-6 h-6"
                          />
                        </td>
                      );
                    })}
                    <td className="border border-gray-400 px-4 py-2 font-bold text-white">
                      {cumulativeAttendance}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DropdownSelection;
