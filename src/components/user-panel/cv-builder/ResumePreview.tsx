import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import Vazir from '../../../assets/Vazirmatn-Bold.ttf';

// Register the custom font
Font.register({
    family: 'Vazir',
    src: Vazir,
});

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#f8fafc',
        padding: 20,
        color: '#1f2937',
        fontFamily: 'Vazir',
        direction: 'rtl', // Set text direction to right-to-left
        textAlign: 'right', // Align text to the right
    },
    section: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'right', // Align text to the right
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
        textAlign: 'right', // Align text to the right
    },
    title: {
        fontSize: 28,
        marginBottom: 16,
        fontWeight: 'bold',
        color: '#1f2937', // Tailwind's 'text-gray-800'
        textAlign: 'right', // Align text to the right
    },
    item: {
        marginBottom: 12,
        textAlign: 'right', // Align text to the right
    },
});

const ResumePreview: React.FC = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>رزومه</Text>
                <Text style={styles.title}>جان دو</Text>
                <Text style={styles.text}>ایمیل: john.doe@example.com</Text>
                <Text style={styles.text}>تلفن: 123-456-7890</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>تجربه کاری</Text>
                <View style={styles.item}>
                    <Text style={styles.text}>- عنوان شغلی در شرکت A</Text>
                    <Text style={styles.text}>توضیحات مسئولیت‌ها و دستاوردها.</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.text}>- عنوان شغلی در شرکت B</Text>
                    <Text style={styles.text}>توضیحات مسئولیت‌ها و دستاوردها.</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default ResumePreview;
