import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';


const styles = StyleSheet.create({
    page: {
        backgroundColor: '#f8fafc',
        padding: 20,
        color: '#1f2937',
    },
    section: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
        fontSize: 36,
        marginBottom: 20,
        textAlign: 'center',
        color: '#3b82f6', // Tailwind's 'text-blue-500'
    },
    text: {
        fontSize: 20,
        marginBottom: 12,
        color: '#4b5563',
    },
    title: {
        fontSize: 28,
        marginBottom: 16,
        fontWeight: 'bold',
        color: '#1f2937', // Tailwind's 'text-gray-800'
    },
    item: {
        marginBottom: 12,
    },
});

const ResumePreview: React.FC = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>رزومه</Text>
                <Text style={styles.title}>John Doe</Text>
                <Text style={styles.text}>Email: john.doe@example.com</Text>
                <Text style={styles.text}>Phone: 123-456-7890</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Experience</Text>
                <View style={styles.item}>
                    <Text style={styles.text}>- Job Title at Company A</Text>
                    <Text style={styles.text}>Description of responsibilities and achievements.</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.text}>- Job Title at Company B</Text>
                    <Text style={styles.text}>Description of responsibilities and achievements.</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default ResumePreview;
