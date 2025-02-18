import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from 'lucide-react';

const FrequencySelector = ({ label, value, onChange }) => (
  <div className="flex flex-col space-y-2">
    <Label>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="distributed">Distributed</SelectItem>
        <SelectItem value="morning">Morning Only</SelectItem>
        <SelectItem value="afternoon">Afternoon Only</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

const SubjectSelector = ({ courses, selectedCourses, onToggle, onHoursChange, type }) => {
  const courseType = type.toLowerCase();
  const hoursType = `${courseType}Hours`;
  
  return (
    <div className="space-y-2">
      <Label className="font-medium">{type} Courses</Label>
      {Object.entries(courses).map(([course, details]) => (
        <div key={course} className="flex items-center space-x-4">
          <Checkbox
            id={`${courseType}-${course}`}
            checked={selectedCourses[courseType][course] || false}
            onCheckedChange={(checked) => onToggle(courseType, course, checked)}
          />
          <Label htmlFor={`${courseType}-${course}`} className="flex-1">{course}</Label>
          {selectedCourses[courseType][course] && (
            <div className="flex items-center space-x-2">
              <Label>Hours:</Label>
              <Select 
                value={String(selectedCourses[hoursType][course] || details.hours_per_week)}
                onValueChange={(value) => onHoursChange(hoursType, course, parseInt(value))}
              >
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const DemoCollegeTimetable = () => {
  const [preferences, setPreferences] = useState({
    theoryFrequency: 'distributed',
    labFrequency: 'distributed'
  });
  
  const defaultCourses = {
    'Theory': {
      'Mathematics': { lecturer: 'Dr. Smith', hours_per_week: 4 },
      'Computer Networks': { lecturer: 'Prof. Johnson', hours_per_week: 4 },
      'Database Systems': { lecturer: 'Dr. Brown', hours_per_week: 3 },
      'Operating Systems': { lecturer: 'Prof. Davis', hours_per_week: 3 },
      'Software Engineering': { lecturer: 'Dr. Wilson', hours_per_week: 3 }
    },
    'Lab': {
      'Computer Networks Lab': { lecturer: 'Prof. Johnson', hours_per_week: 3 },
      'Database Lab': { lecturer: 'Dr. Brown', hours_per_week: 3 },
      'Programming Lab': { lecturer: 'Dr. Wilson', hours_per_week: 3 }
    }
  };
  
  const [selectedCourses, setSelectedCourses] = useState({
    theory: Object.fromEntries(
      Object.keys(defaultCourses.Theory).map(course => [course, true])
    ),
    lab: Object.fromEntries(
      Object.keys(defaultCourses.Lab).map(course => [course, true])
    ),
    theoryHours: Object.fromEntries(
      Object.entries(defaultCourses.Theory).map(([course, details]) => [course, details.hours_per_week])
    ),
    labHours: Object.fromEntries(
      Object.entries(defaultCourses.Lab).map(([course, details]) => [course, details.hours_per_week])
    )
  });

  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const printRef = useRef();
  
  const handleToggleCourse = (type, course, checked) => {
    setSelectedCourses(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [course]: checked
      }
    }));
  };
  
  const handleHoursChange = (type, course, hours) => {
    setSelectedCourses(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [course]: hours
      }
    }));
  };

  const generateTimetable = () => {
    // Initialize empty timetable
    const newTimetable = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = Array.from({ length: 8 }, (_, i) => (i + 8).toString());
    
    days.forEach(day => {
      newTimetable[day] = {};
      hours.forEach(hour => {
        newTimetable[day][hour] = null;
      });
    });

    // Get selected courses
    const selectedTheoryCourses = Object.entries(selectedCourses.theory)
      .filter(([_, selected]) => selected)
      .map(([course]) => ({
        subject: course,
        hours: selectedCourses.theoryHours[course],
        ...defaultCourses.Theory[course],
        type: 'Theory'
      }));

    const selectedLabCourses = Object.entries(selectedCourses.lab)
      .filter(([_, selected]) => selected)
      .map(([course]) => ({
        subject: course,
        hours: selectedCourses.labHours[course],
        ...defaultCourses.Lab[course],
        type: 'Lab'
      }));

    // Assign theory classes
    selectedTheoryCourses.forEach(course => {
      let hoursAssigned = 0;
      while (hoursAssigned < course.hours) {
        const day = days[Math.floor(Math.random() * days.length)];
        const startHour = preferences.theoryFrequency === 'morning' 
          ? Math.floor(Math.random() * 4) + 8  // 8-11
          : preferences.theoryFrequency === 'afternoon'
            ? Math.floor(Math.random() * 4) + 12  // 12-15
            : Math.floor(Math.random() * 8) + 8;  // 8-15

        if (startHour <= 15 && !newTimetable[day][startHour.toString()]) {
          newTimetable[day][startHour.toString()] = {
            subject: course.subject,
            lecturer: course.lecturer,
            type: 'Theory',
            room: `10${Math.floor(Math.random() * 5) + 1}`
          };
          hoursAssigned++;
        }
      }
    });

    // Assign lab classes
    selectedLabCourses.forEach(course => {
      let hoursAssigned = 0;
      while (hoursAssigned < course.hours) {
        const day = days[Math.floor(Math.random() * days.length)];
        const startHour = preferences.labFrequency === 'morning' 
          ? Math.floor(Math.random() * 3) + 8  // 8-10
          : preferences.labFrequency === 'afternoon'
            ? Math.floor(Math.random() * 3) + 12  // 12-14
            : Math.floor(Math.random() * 6) + 8;  // 8-13

        if (startHour <= 14 && 
            !newTimetable[day][startHour.toString()] && 
            !newTimetable[day][(startHour + 1).toString()]) {
          const labRoom = `LAB${Math.floor(Math.random() * 3) + 1}`;
          newTimetable[day][startHour.toString()] = {
            subject: course.subject,
            lecturer: course.lecturer,
            type: 'Lab',
            room: labRoom
          };
          newTimetable[day][(startHour + 1).toString()] = {
            subject: course.subject,
            lecturer: course.lecturer,
            type: 'Lab',
            room: labRoom
          };
          hoursAssigned += 2;
        }
      }
    });

    setGeneratedTimetable(newTimetable);
  };

  const downloadAsPDF = () => {
    if (!generatedTimetable || !printRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups for this website to download the PDF');
      return;
    }
    
    const content = printRef.current.innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>College Timetable</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
            .theory-cell { background-color: #f8f9fa; }
            .lab-cell { background-color: #e6f3ff; }
            .cell-content { font-size: 12px; }
            .subject { font-weight: bold; }
            .lecturer { color: #666; }
            .room { font-weight: 500; color: #333; }
            h1 { text-align: center; }
            @media print {
              body { -webkit-print-color-adjust: exact; color-adjust: exact; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>College Timetable</h1>
          <div class="no-print">
            <p>Click the print button below or use Ctrl+P (Cmd+P on Mac) to save as PDF</p>
            <button onclick="window.print();setTimeout(function(){window.close()},500);" 
              style="padding: 10px 20px; background: #4CAF50; color: white; border: none; 
              cursor: pointer; margin: 20px auto; display: block;">
              Print/Save as PDF
            </button>
          </div>
          ${content}
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  const TimetableCell = ({ slot }) => {
    if (!slot) return <td className="border p-2" />;
  
    return (
      <td className={`border p-2 ${slot.type === 'Lab' ? 'bg-blue-50' : 'bg-gray-50'}`}>
        <div className="font-bold text-sm">
          {slot.subject.length > 12 ? `${slot.subject.substring(0, 12)}...` : slot.subject}
        </div>
        <div className="text-xs text-gray-600">
          {slot.lecturer}
        </div>
        <div className="text-xs font-medium text-gray-800">
          Room {slot.room}
        </div>
      </td>
    );
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">College Timetable Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="flex justify-center space-x-6">
            <FrequencySelector
              label="Theory Classes Timing"
              value={preferences.theoryFrequency}
              onChange={(value) => setPreferences(prev => ({ ...prev, theoryFrequency: value }))}
            />
            <FrequencySelector
              label="Lab Sessions Timing"
              value={preferences.labFrequency}
              onChange={(value) => setPreferences(prev => ({ ...prev, labFrequency: value }))}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <SubjectSelector
              courses={defaultCourses.Theory}
              selectedCourses={selectedCourses}
              onToggle={handleToggleCourse}
              onHoursChange={handleHoursChange}
              type="Theory"
            />
            
            <SubjectSelector
              courses={defaultCourses.Lab}
              selectedCourses={selectedCourses}
              onToggle={handleToggleCourse}
              onHoursChange={handleHoursChange}
              type="Lab"
            />
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={generateTimetable}
            >
              Generate Timetable
            </Button>
            
            {generatedTimetable && (
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={downloadAsPDF}
              >
                <FileText className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto mt-6" ref={printRef}>
          {generatedTimetable && (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-100 font-bold">Day/Hour</th>
                  {Array.from({ length: 8 }, (_, i) => i + 8).map(hour => (
                    <th key={hour} className="border p-2 bg-gray-100 font-bold">
                      {hour}:00
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(generatedTimetable).map(day => (
                  <tr key={day}>
                    <td className="border p-2 font-bold">{day}</td>
                    {Array.from({ length: 8 }, (_, i) => i + 8).map(hour => (
                      <TimetableCell 
                        key={`${day}-${hour}`}
                        slot={generatedTimetable[day][hour.toString()]} 
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoCollegeTimetable;