import { Tabs } from "flowbite-react";
import React from "react";

interface TabData {
    title: string;
    content: React.ReactNode;
    active?: boolean;
}

interface KTabsProps {
    tabs: TabData[];
}

const KTabs: React.FC<KTabsProps> = ({ tabs }) => {
    return (
        <Tabs.Group aria-label="Default tabs" style="default">
            {tabs.map((tab, index) => (
                <Tabs.Item
                    key={index}
                    title={tab.title}
                    active={tab.active}
                >
                    {tab.content}
                </Tabs.Item>
            ))}
        </Tabs.Group>
    );
};

export default KTabs;
