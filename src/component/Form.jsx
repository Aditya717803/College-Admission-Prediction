import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Constants for form options
const POOL_OPTIONS = [
  { value: 'Gender-Neutral', label: 'Gender Neutral' },
  { value: 'Female-Only', label: 'Female-Only' }
];

const PROGRAM_OPTIONS = [
    { value: 'Computer Science and Engineering', label: 'Computer Science and Engineering' },
    { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
    { value: 'Civil Engineering', label: 'Civil Engineering' },
    { value: 'Electrical Engineering', label: 'Electrical Engineering' },
    { value: 'Electronics and Communication Engineering', label: 'Electronics and Communication Engineering' },
    { value: 'Chemical Engineering', label: 'Chemical Engineering' },
    { value: 'Metallurgical and Materials Engineering', label: 'Metallurgical and Materials Engineering' },
    { value: 'Engineering Physics', label: 'Engineering Physics' },
    { value: 'Architecture', label: 'Architecture' },
    { value: 'Mathematics and Computing', label: 'Mathematics and Computing' },
    { value: 'Electrical and Electronics Engineering', label: 'Electrical and Electronics Engineering' },
    { value: 'Bio Technology', label: 'Bio Technology' },
    { value: 'Aerospace Engineering', label: 'Aerospace Engineering' },
    { value: 'Mining Engineering', label: 'Mining Engineering' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Production and Industrial Engineering', label: 'Production and Industrial Engineering' },
    { value: 'Economics', label: 'Economics' },
    { value: 'Biotechnology and Biochemical Engineering', label: 'Biotechnology and Biochemical Engineering' },
    { value: 'Electronics and Instrumentation Engineering', label: 'Electronics and Instrumentation Engineering' },
    { value: 'Materials Science and Engineering', label: 'Materials Science and Engineering' },
    { value: 'Ceramic Engineering', label: 'Ceramic Engineering' },
    { value: 'Production Engineering', label: 'Production Engineering' },
    { value: 'Ocean Engineering and Naval Architecture', label: 'Ocean Engineering and Naval Architecture' },
    { value: 'Textile Technology', label: 'Textile Technology' },
    { value: 'Bio Medical Engineering', label: 'Bio Medical Engineering' },
    { value: 'Materials Engineering', label: 'Materials Engineering' },
    { value: 'Metallurgical Engineering and Materials Science', label: 'Metallurgical Engineering and Materials Science' },
    { value: 'Materials Science and Metallurgical Engineering', label: 'Materials Science and Metallurgical Engineering' },
    { value: 'Applied Geology', label: 'Applied Geology' },
    { value: 'Computer Engineering', label: 'Computer Engineering' },
    { value: 'Electronics and Electrical Communication Engineering', label: 'Electronics and Electrical Communication Engineering' },
    { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
    { value: 'Biosciences and Bioengineering', label: 'Biosciences and Bioengineering' },
    { value: 'Mathematics & Computing', label: 'Mathematics & Computing' },
    { value: 'Metallurgical Engineering', label: 'Metallurgical Engineering' },
    { value: 'Mathematics and Scientific Computing', label: 'Mathematics and Scientific Computing' },
    { value: 'Instrumentation and Control Engineering', label: 'Instrumentation and Control Engineering' },
    { value: 'Engineering Design', label: 'Engineering Design' },
    { value: 'Electronics and Electrical Engineering', label: 'Electronics and Electrical Engineering' },
    { value: 'Data Science and Artificial Intelligence', label: 'Data Science and Artificial Intelligence' },
    { value: 'Statistics and Data Science', label: 'Statistics and Data Science' },
    { value: 'Industrial and Production Engineering', label: 'Industrial and Production Engineering' },
    { value: 'Polymer Science and Engineering', label: 'Polymer Science and Engineering' }
];

const DEGREE_OPTIONS = [
    { value: 'B.Tech', label: 'B.Tech' },
    { value: 'B.Tech + M.Tech (IDD)', label: 'B.Tech + M.Tech (IDD)' },
    { value: 'BSc', label: 'BSc' },
    { value: 'B.Arch', label: 'B.Arch' },
    { value: 'Int MSc.', label: 'Int MSc.' },
    { value: 'BS + MS (IDD)', label: 'BS + MS (IDD)' },
    { value: 'Int M.Tech', label: 'Int M.Tech' },
    { value: 'BSc + MSc (IDD)', label: 'BSc + MSc (IDD)' },
    { value: 'B.Plan', label: 'B.Plan' },
    { value: 'B.Pharm', label: 'B.Pharm' },
    { value: 'B.Pharm + M.Pharm', label: 'B.Pharm + M.Pharm' }
];



const CATEGORY_OPTIONS = [
    { value: 'GEN', label: 'General' },
    { value: 'OBC-NCL', label: 'OBC-NCL' },
    { value: 'SC', label: 'SC' },
    { value: 'ST', label: 'ST' },
    { value: 'GEN-EWS', label: 'GEN-EWS' },
    { value: 'GEN-PWD', label: 'GEN-PWD' },
    { value: 'OBC-NCL-PWD', label: 'OBC-NCL-PWD' },
    { value: 'GEN-EWS-PWD', label: 'GEN-EWS-PWD' },
    { value: 'SC-PWD', label: 'SC-PWD' },
    { value: 'ST-PWD', label: 'ST-PWD' }
];

const COLORS = ['#8A2BE2', '#E8E8E8'];

const AIModelForm = () => {
  const [formData, setFormData] = useState({
    pool: 'Gender-Neutral',
    program_names: 'Computer Science and Engineering',
    degree_short: 'B.Tech',
    category: 'GEN',
    marks: 70
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.marks < 0 || formData.marks > 100) {
      setError('Marks must be between 0 and 100.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          marks: parseFloat(formData.marks)
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Prediction failed');
      }

      setResponse(await res.json());
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const FormField = ({ label, children }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-200">{label}</label>
      {children}
    </div>
  );

  const SelectField = ({ label, value, options, onChange }) => (
    <FormField label={label}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-black/30 border-none text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 border-gray-600 text-white max-h-60 overflow-y-auto">
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );

  const getChartData = () => {
    if (!response) return [];
    const predictedValue = response.predicted_seats ;
    return [
      { name: 'Predicted', value: predictedValue},
      { name: 'Available', value: 60 - predictedValue }
    ];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 px-3 py-2 rounded border border-gray-700">
          <p className="text-white text-sm font-medium">{`${payload[0].name}: ${payload[0].value.toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-transparent flex items-start justify-center p-4">
      <Card className="w-full max-w-md bg-purple-950/30 border border-white/30">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-purple-200">
            Admission Seats Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <SelectField
              label="Pool"
              value={formData.pool}
              options={POOL_OPTIONS}
              onChange={value => handleInputChange('pool', value)}
            />

            <SelectField
              label="Program Name"
              value={formData.program_names}
              options={PROGRAM_OPTIONS}
              onChange={value => handleInputChange('program_names', value)}
            />

            <SelectField
              label="Degree"
              value={formData.degree_short}
              options={DEGREE_OPTIONS}
              onChange={value => handleInputChange('degree_short', value)}
            />

            <SelectField
              label="Category"
              value={formData.category}
              options={CATEGORY_OPTIONS}
              onChange={value => handleInputChange('category', value)}
            />

            <FormField label="Marks">
              <Input
                type="number"
                step="0.01"
                value={formData.marks}
                onChange={e => handleInputChange('marks', e.target.value)}
                className="bg-black/30 border-none text-white focus:border-purple-500"
                placeholder="Enter marks"
                min="0"
                max="100"
              />
            </FormField>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-b from-purple-800 to-purple-900 
                hover:from-purple-700 hover:to-purple-800 
                text-white shadow-lg shadow-purple-500/30
                transition-all duration-300 hover:shadow-purple-500/50"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                'Predict'
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {response && getChartData().length > 0 && (
            <div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-purple-500/50">
              <h3 className="text-lg font-medium text-purple-200 mb-2">
                Prediction Results
              </h3>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-300">Predicted Seats</p>
                <p className="text-3xl font-bold text-white">
                  {response.predicted_seats}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  ({response.predicted_seats_percentage?.toFixed(1)} Seats)
                </p>
              </div>
              <div className="w-full h-80"> {/* Increased height for better visibility */}
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getChartData()}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {getChartData().map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                          strokeWidth={0}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value) => <span className="text-white">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIModelForm;