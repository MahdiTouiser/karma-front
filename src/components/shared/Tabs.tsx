import { DeepPartial, FlowbiteTabTheme, Tabs, TabsProps, TabsRef } from "flowbite-react";
import { TabItem } from "flowbite-react/lib/esm/components/Tab/TabItem";
import { forwardRef, ForwardedRef } from "react";
const SDTabComponent  = forwardRef(
  (props: TabsProps, ref: ForwardedRef<TabsRef>) => {
    const theme: DeepPartial<FlowbiteTabTheme> = {
      tablist: {
        styles:{
          underline: '-mb-px border-b border-gray-200 dark:border-gray-700'
        },
        tabitem: {
          styles: {
            underline: {
              active: {
                off: "border-b-2 flex-grow !font-bold border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
                on: "text-primary-500 flex-grow !font-bold rounded-t-lg border-b-2 border-primary-500 active dark:text-cyan-500 dark:border-cyan-500",
              },
            },
            
          },
        },
      },
    };
    return <Tabs.Group ref={ref} {...props} theme={theme}>{props.children}</Tabs.Group>;
  }
);

SDTabComponent.displayName = 'SDTabs.Group';
export const SDTabs = { Group: SDTabComponent, Item: TabItem };