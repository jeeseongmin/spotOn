import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { BiCalendarEvent } from "react-icons/bi";
import { RiListUnordered } from "react-icons/ri";

import DatePicker from "@/components/DatePicker";
import Tab from "@/components/Tab";

const meta: Meta<typeof Tab> = {
  title: "components/Tab",
  tags: ["autodocs"],
  component: Tab,
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Enclosed: Story = {
  render: function Render() {
    return (
      <Tab variant="enclosed">
        <Tab.Item label="장소로 검색">Content 1</Tab.Item>
        <Tab.Item label="시간으로 검색">Content 2</Tab.Item>
        <Tab.Item label="반복 예약" disabled>
          Content 3
        </Tab.Item>
      </Tab>
    );
  },
};

export const Underlined: Story = {
  render: function Render() {
    return (
      <Tab variant="underlined">
        <Tab.Item label="예약 현황">Content 1</Tab.Item>
        <Tab.Item label="나의 예약">Content 2</Tab.Item>
      </Tab>
    );
  },
};

export const Solid: Story = {
  render: function Render() {
    return (
      <Tab variant="solid">
        <Tab.Item icon={BiCalendarEvent}>Content 1</Tab.Item>
        <Tab.Item icon={RiListUnordered}>Content 2</Tab.Item>
      </Tab>
    );
  },
};

export const Overlapped: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
      <Tab variant="enclosed" className="p-4">
        <Tab.Item label="예약내역 관리">
          <Tab variant="solid" className="flex">
            <Tab.Item icon={BiCalendarEvent}>
              <DatePicker date={date} onChange={setDate} />
              <Tab variant="underlined">
                <Tab.Item label="교회일정"></Tab.Item>
              </Tab>
            </Tab.Item>
            <Tab.Item icon={RiListUnordered}>Content 2</Tab.Item>
          </Tab>
        </Tab.Item>
        <Tab.Item label="교회일정 관리">Content</Tab.Item>
      </Tab>
    );
  },
};
