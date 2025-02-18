import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 20 },
  title: { fontSize: 18, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' },
  section: { marginBottom: 10 },
  heading: { fontSize: 14, marginBottom: 4, fontWeight: 'bold' },
  text: { fontSize: 12 },
  total: { fontSize: 14, fontWeight: 'bold', marginTop: 8 }
});

const BudgetPlannerPDF = ({ budgetData, summary }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>College Budget Report</Text>

      {/* Students Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Students</Text>
        <Text style={styles.text}>Number of Students: {budgetData.students.count}</Text>
        <Text style={styles.text}>Cost per Student: ${budgetData.students.costPerStudent}</Text>
        <Text style={styles.text}>Scholarships: ${budgetData.students.scholarships}</Text>
        <Text style={styles.text}>Student Activities: ${budgetData.students.activities}</Text>
        <Text style={styles.total}>Total Student Cost: ${summary.totalStudentCost.toLocaleString()}</Text>
      </View>

      {/* Faculty Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Faculty</Text>
        <Text style={styles.text}>Number of Faculty: {budgetData.faculty.count}</Text>
        <Text style={styles.text}>Average Salary: ${budgetData.faculty.averageSalary}</Text>
        <Text style={styles.text}>Benefits: ${budgetData.faculty.benefits}</Text>
        <Text style={styles.text}>Professional Development: ${budgetData.faculty.development}</Text>
        <Text style={styles.total}>Total Faculty Cost: ${summary.totalFacultyCost.toLocaleString()}</Text>
      </View>

      {/* Facilities Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Facilities</Text>
        <Text style={styles.text}>Classrooms Maintenance: ${budgetData.facilities.classrooms.maintenanceCost}</Text>
        <Text style={styles.text}>Classrooms Utilities: ${budgetData.facilities.classrooms.utilities}</Text>
        <Text style={styles.text}>Labs Equipment: ${budgetData.facilities.labs.equipmentCost}</Text>
        <Text style={styles.text}>Labs Supplies: ${budgetData.facilities.labs.supplies}</Text>
        <Text style={styles.total}>Total Facilities Cost: ${summary.totalFacilitiesCost.toLocaleString()}</Text>
      </View>

      {/* Total Budget */}
      <View style={styles.section}>
        <Text style={styles.total}>Total Budget: ${summary.totalBudget.toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
);

export default BudgetPlannerPDF;
