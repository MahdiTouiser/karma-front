import { jsx as _jsx } from "react/jsx-runtime";
import { Tabs } from "flowbite-react";
const KTabs = ({ tabs }) => {
    return (_jsx(Tabs.Group, { "aria-label": "Tabs with underline", style: "underline", children: tabs.map((tab, index) => (_jsx(Tabs.Item, { title: tab.title, active: tab.active, children: tab.content }, index))) }));
};
export default KTabs;
