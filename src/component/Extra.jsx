import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { GraduationCap, Clock, UserCheck, MapPin, AlertCircle } from 'lucide-react';

const LectureManagementSystem = () => {
  const [lectures, setLectures] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    absentFaculty: '',
    subject: '',
    timeSlot: '',
    substituteTeacher: '',
    classroom: '',
    reason: ''
  });

  const facultyList = [
    'Dr. Smith - Mathematics',
    'Dr. Johnson - Physics',
    'Prof. Williams - Chemistry',
    'Prof. Brown - Biology',
    'Dr. Davis - Computer Science'
  ];

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM'
  ];

  const classrooms = ['Room 101', 'Room 102', 'Room 103', 'Lab 1', 'Lab 2'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setNotification(null);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const sendEmail = (lectureDetails) => {
    const templateParams = {
      absentFaculty: lectureDetails.absentFaculty,
      subject: lectureDetails.subject,
      timeSlot: lectureDetails.timeSlot,
      substituteTeacher: lectureDetails.substituteTeacher,
      classroom: lectureDetails.classroom,
      reason: lectureDetails.reason,
      studentEmails: ['yash992@gmail.com', 'sanketdhonde222@gmail.com', 'rumdesri@gmail.com']
    };

    emailjs.send('service_ainu8rl', 'template_an24zun', templateParams, 'ld2Dd-b2a9-bQ0hsF')
      .then((response) => {
        console.log('Email sent successfully', response);
      })
      .catch((err) => {
        console.error('Failed to send email', err);
      });
  };

  const handleSubmit = () => {
    if (Object.values(formData).some(value => !value)) {
      setNotification({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    const newLecture = {
      id: Date.now(),
      date: formatDate(selectedDate),
      ...formData
    };

    setLectures(prev => [...prev, newLecture]);
    setNotification({
      type: 'success',
      message: 'Extra Lecture successfully scheduled'
    });

    sendEmail(newLecture);

    setFormData({
      absentFaculty: '',
      subject: '',
      timeSlot: '',
      substituteTeacher: '',
      classroom: '',
      reason: ''
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card className="bg-gradient-to-br from-purple-950 to-black/30 shadow-xl">
        <CardHeader className="border-b border-purple-800/30">
          <CardTitle className="text-2xl font-bold text-white/90 flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Lecture Management System
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Schedule Substitute Lecture
              </h3>

              <div className="bg-purple-900/40 rounded-lg p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="bg-purple-800/30 rounded-lg p-3 text-white"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Absent Faculty</label>
                    <Select value={formData.absentFaculty} onValueChange={(value) => handleInputChange('absentFaculty', value)}>
                      <SelectTrigger className="bg-purple-800/30 border-purple-700 text-white">
                        <SelectValue placeholder="Select faculty" />
                      </SelectTrigger>
                      <SelectContent className="bg-purple-900 text-white">
                        {facultyList.map((faculty) => (
                          <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Subject</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Enter subject"
                      className="bg-purple-800/30 border-purple-700 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Time Slot</label>
                    <Select value={formData.timeSlot} onValueChange={(value) => handleInputChange('timeSlot', value)}>
                      <SelectTrigger className="bg-purple-800/30 border-purple-700 text-white">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent className="bg-purple-900 text-white">
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Substitute Teacher</label>
                    <Select value={formData.substituteTeacher} onValueChange={(value) => handleInputChange('substituteTeacher', value)}>
                      <SelectTrigger className="bg-purple-800/30 border-purple-700 text-white">
                        <SelectValue placeholder="Select substitute teacher" />
                      </SelectTrigger>
                      <SelectContent className="bg-purple-900 text-white">
                        {facultyList.map((faculty) => (
                          <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Classroom</label>
                    <Select value={formData.classroom} onValueChange={(value) => handleInputChange('classroom', value)}>
                      <SelectTrigger className="bg-purple-800/30 border-purple-700 text-white">
                        <SelectValue placeholder="Select classroom" />
                      </SelectTrigger>
                      <SelectContent className="bg-purple-900 text-white">
                        {classrooms.map((room) => (
                          <SelectItem key={room} value={room}>{room}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Reason for Absence</label>
                    <Input
                      value={formData.reason}
                      onChange={(e) => handleInputChange('reason', e.target.value)}
                      placeholder="Enter reason"
                      className="bg-purple-800/30 border-purple-700 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit} 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4"
                >
                  Schedule Lecture
                </Button>

                {notification && (
                  <Alert 
                    variant={notification.type === 'error' ? 'destructive' : 'default'}
                    className={`mt-4 ${notification.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <AlertDescription>{notification.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Scheduled Lectures Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Scheduled Lectures
              </h3>

              <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                {lectures.map((lecture) => (
                  <Card key={lecture.id} className="bg-purple-800/30 border-purple-700">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-white">{lecture.subject}</h4>
                        <div className="space-y-1 text-white/80">
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {lecture.date} | {lecture.timeSlot}
                          </p>
                          <p className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            Substitute: {lecture.substituteTeacher}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {lecture.classroom}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {lectures.length === 0 && (
                  <p className="text-center text-white/60 py-8">No lectures scheduled yet</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LectureManagementSystem;