import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const CircularProgress = ({ progress, size = 100, strokeWidth = 10, circleColor = '#e6e6e6', progressColor = '#00b7eb' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    return (_jsxs("svg", { width: size, height: size, className: "block mx-auto", children: [_jsx("circle", { className: "text-gray-300", stroke: circleColor, strokeWidth: strokeWidth, fill: "transparent", r: radius, cx: size / 2, cy: size / 2 }), _jsx("circle", { className: "text-cyan-600", stroke: progressColor, strokeWidth: strokeWidth, fill: "transparent", r: radius, cx: size / 2, cy: size / 2, strokeDasharray: circumference, strokeDashoffset: offset, style: { transition: 'stroke-dashoffset 0.35s' }, transform: `rotate(-90 ${size / 2} ${size / 2})`, strokeLinecap: "round" }), _jsx("text", { x: "50%", y: "50%", textAnchor: "middle", dy: ".3em", className: "text-gray-700 text-xl", children: `${progress}%` })] }));
};
export default CircularProgress;
