import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
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
        direction: 'rtl',
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
        color: '#1f2937',
        textAlign: 'right', // Align text to the right
    },
    item: {
        marginBottom: 12,
        textAlign: 'right', // Align text to the right
    },
});
const ResumePreview = () => (_jsx(Document, { children: _jsxs(Page, { size: "A4", style: styles.page, children: [_jsxs(View, { style: styles.section, children: [_jsx(Text, { style: styles.header, children: "\u0631\u0632\u0648\u0645\u0647" }), _jsx(Text, { style: styles.title, children: "\u062C\u0627\u0646 \u062F\u0648" }), _jsx(Text, { style: styles.text, children: "\u0627\u06CC\u0645\u06CC\u0644: john.doe@example.com" }), _jsx(Text, { style: styles.text, children: "\u062A\u0644\u0641\u0646: 123-456-7890" })] }), _jsxs(View, { style: styles.section, children: [_jsx(Text, { style: styles.title, children: "\u062A\u062C\u0631\u0628\u0647 \u06A9\u0627\u0631\u06CC" }), _jsxs(View, { style: styles.item, children: [_jsx(Text, { style: styles.text, children: "- \u0639\u0646\u0648\u0627\u0646 \u0634\u063A\u0644\u06CC \u062F\u0631 \u0634\u0631\u06A9\u062A A" }), _jsx(Text, { style: styles.text, children: "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0645\u0633\u0626\u0648\u0644\u06CC\u062A\u200C\u0647\u0627 \u0648 \u062F\u0633\u062A\u0627\u0648\u0631\u062F\u0647\u0627." })] }), _jsxs(View, { style: styles.item, children: [_jsx(Text, { style: styles.text, children: "- \u0639\u0646\u0648\u0627\u0646 \u0634\u063A\u0644\u06CC \u062F\u0631 \u0634\u0631\u06A9\u062A B" }), _jsx(Text, { style: styles.text, children: "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0645\u0633\u0626\u0648\u0644\u06CC\u062A\u200C\u0647\u0627 \u0648 \u062F\u0633\u062A\u0627\u0648\u0631\u062F\u0647\u0627." })] })] })] }) }));
export default ResumePreview;
