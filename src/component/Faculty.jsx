import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CollegeManagement = () => {
  const [numStudents, setNumStudents] = useState(0);
  const [report, setReport] = useState(null);

  // Base costs (1:1 USD to INR)
  const perStudentCost = 80000;
  const activityCostPerStudent = 10000;
  const studentBenefits = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
  const facultySalary = Math.floor(Math.random() * (700000 - 500000 + 1)) + 500000;
  const facultyBenefits = 10000;
  const facultyDevelopment = 20000;
  const labCost = 40000;
  const classroomCost = 25000;

  // Custom purple and violet shades
  const COLORS = ['#9b4dff', '#b35aff', '#9c27b0', '#e040fb', '#ab47bc', '#ba68c8', '#7e57c2'];


  const calculateCosts = () => {
    const totalStudentCost = numStudents * perStudentCost;
    const totalActivityCost = numStudents * activityCostPerStudent;
    const totalStudentBenefits = numStudents * studentBenefits;

    let numFaculty = numStudents <= 40 ? 5 : numStudents <= 50 ? 7 : 9;
    const totalFacultySalary = numFaculty * facultySalary;
    const totalFacultyBenefits = numFaculty * facultyBenefits;
    const totalFacultyDevelopment = numFaculty * facultyDevelopment;

    let numLabs = numStudents <= 20 ? 1 : numStudents <= 40 ? 2 : 3;
    let numClassrooms = numStudents <= 40 ? 1 : numStudents <= 50 ? 2 : 3;
    const totalLabCost = numLabs * labCost;
    const totalClassroomCost = numClassrooms * classroomCost;

    const totalCost =
      totalStudentCost +
      totalActivityCost +
      totalStudentBenefits +
      totalFacultySalary +
      totalFacultyBenefits +
      totalFacultyDevelopment +
      totalLabCost +
      totalClassroomCost;

    setReport({
      student: { totalStudentCost, totalActivityCost, totalStudentBenefits },
      faculty: { numFaculty, totalFacultySalary, totalFacultyBenefits, totalFacultyDevelopment },
      facilities: { numLabs, totalLabCost, numClassrooms, totalClassroomCost },
      totalCost,
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatCompactCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(2)}K`;
    }
    return `₹${value}`;
  };

  const generateReport = () => {
    if (!report) return;

    const reportContent = `
COLLEGE MANAGEMENT COST REPORT (INR)
Generated on: ${new Date().toLocaleDateString()}
Number of Students: ${numStudents}

STUDENT COSTS
============
Base Cost: ${formatCurrency(report.student.totalStudentCost)}
Activity Cost: ${formatCurrency(report.student.totalActivityCost)}
Student Benefits: ${formatCurrency(report.student.totalStudentBenefits)}
Total Student Costs: ${formatCurrency(
      report.student.totalStudentCost + 
      report.student.totalActivityCost + 
      report.student.totalStudentBenefits
    )}

FACULTY DETAILS
==============
Number of Faculty: ${report.faculty.numFaculty}
Total Salary: ${formatCurrency(report.faculty.totalFacultySalary)}
Total Benefits: ${formatCurrency(report.faculty.totalFacultyBenefits)}
Faculty Development: ${formatCurrency(report.faculty.totalFacultyDevelopment)}
Total Faculty Costs: ${formatCurrency(
      report.faculty.totalFacultySalary + 
      report.faculty.totalFacultyBenefits + 
      report.faculty.totalFacultyDevelopment
    )}

FACILITIES
==========
Number of Labs: ${report.facilities.numLabs}
Total Lab Cost: ${formatCurrency(report.facilities.totalLabCost)}
Number of Classrooms: ${report.facilities.numClassrooms}
Total Classroom Cost: ${formatCurrency(report.facilities.totalClassroomCost)}
Total Facilities Cost: ${formatCurrency(
      report.facilities.totalLabCost + 
      report.facilities.totalClassroomCost
    )}

GRAND TOTAL: ${formatCurrency(report.totalCost)}

Base Rates:
- Per Student Cost: ${formatCurrency(perStudentCost)}
- Activity Cost Per Student: ${formatCurrency(activityCostPerStudent)}
- Faculty Benefits Per Person: ${formatCurrency(facultyBenefits)}
- Faculty Development Per Person: ${formatCurrency(facultyDevelopment)}
- Cost Per Lab: ${formatCurrency(labCost)}
- Cost Per Classroom: ${formatCurrency(classroomCost)}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `college_management_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPieData = () => {
    if (!report) return [];
    
    const totalStudentCosts = report.student.totalStudentCost + 
      report.student.totalActivityCost + 
      report.student.totalStudentBenefits;
    
    const totalFacultyCosts = report.faculty.totalFacultySalary + 
      report.faculty.totalFacultyBenefits + 
      report.faculty.totalFacultyDevelopment;
    
    const totalFacilitiesCosts = report.facilities.totalLabCost + 
      report.facilities.totalClassroomCost;

    return [
      { name: 'Student Costs', value: totalStudentCosts },
      { name: 'Faculty Costs', value: totalFacultyCosts },
      { name: 'Facilities Costs', value: totalFacilitiesCosts }
    ];
  };

  const getDetailedBarData = () => {
    if (!report) return [];
    
    return [
      { name: 'Base Student Cost', value: report.student.totalStudentCost },
      { name: 'Activity Cost', value: report.student.totalActivityCost },
      { name: 'Student Benefits', value: report.student.totalStudentBenefits },
      { name: 'Faculty Salary', value: report.faculty.totalFacultySalary },
      { name: 'Faculty Benefits', value: report.faculty.totalFacultyBenefits },
      { name: 'Faculty Development', value: report.faculty.totalFacultyDevelopment },
      { name: 'Lab Cost', value: report.facilities.totalLabCost },
      { name: 'Classroom Cost', value: report.facilities.totalClassroomCost }
    ];
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-purple-700/30 text-white">
      <CardHeader>
        <CardTitle>College Management System (INR)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Input
            type="number"
            placeholder="Enter number of students"
            value={numStudents || ''}
            onChange={(e) => setNumStudents(parseInt(e.target.value) || 0)}
            className="w-full"
          />
          <Button onClick={calculateCosts} className="w-full">
            Calculate Costs
          </Button>
        </div>

        {report && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/30">
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-lg">Student Costs</h3>
                <p>Base Cost: {formatCurrency(report.student.totalStudentCost)}</p>
                <p>Activity Cost: {formatCurrency(report.student.totalActivityCost)}</p>
                <p>Benefits: {formatCurrency(report.student.totalStudentBenefits)}</p>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-lg">Faculty Details</h3>
                <p>Number of Faculty: {report.faculty.numFaculty}</p>
                <p>Total Salary: {formatCurrency(report.faculty.totalFacultySalary)}</p>
                <p>Total Benefits: {formatCurrency(report.faculty.totalFacultyBenefits)}</p>
                <p>Development Cost: {formatCurrency(report.faculty.totalFacultyDevelopment)}</p>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-lg">Facilities</h3>
                <p>Number of Labs: {report.facilities.numLabs}</p>
                <p>Lab Cost: {formatCurrency(report.facilities.totalLabCost)}</p>
                <p>Number of Classrooms: {report.facilities.numClassrooms}</p>
                <p>Classroom Cost: {formatCurrency(report.facilities.totalClassroomCost)}</p>
              </div>

              <div className="border rounded-lg p-4 bg-purple-500/20">
                <p className="text-xl font-bold">
                  Grand Total: {formatCurrency(report.totalCost)}
                </p>
                <Button 
                  onClick={generateReport} 
                  className="w-full mt-4 bg-slate-800"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Detailed Report
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg p-4 bg-black/30">
                <h3 className="font-semibold text-lg mb-4">Cost Distribution Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getPieData()}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {getPieData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="border rounded-lg p-4 bg-black/30">
                <h3 className="font-semibold text-lg mb-4">Detailed Cost Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getDetailedBarData()}>
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100} 
                  tick={{ fill: '#ffffff', fontSize: 12 }}  // Change label color to white
                />
                <YAxis 
                  tickFormatter={(value) => formatCompactCurrency(value)} 
                  tick={{ fill: '#ffffff', fontSize: 12 }}  // Change label color to white
                />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="value" fill="#8b00ff" />
              </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CollegeManagement;
