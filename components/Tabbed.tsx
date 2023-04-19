import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabbedProps {
  tabs: Tab[];
}

const Tabbed = ({ tabs }: TabbedProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const onClickTab = (label: string) => {
    setActiveTab(label);
  };

  return (
    <div className="tabbed">
      <div className="tab-list border-b-2 border-gray-200 flex">
        {tabs.map(({ label }) => (
          <div
            key={label}
            className={`tab px-4 py-2 cursor-pointer ${
              label === activeTab ? 'active' : ''
            } hover:bg-gray-100`}
            onClick={() => onClickTab(label)}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="tab-content p-4">{tabs.find(({ label }) => label === activeTab)?.content}</div>
    </div>
  );
};

export default Tabbed;