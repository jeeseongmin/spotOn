import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";

import DatePicker from "@/components/DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "components/DatePicker",
  tags: ["autodocs"],
  component: DatePicker,
  decorators: Story => (
    <div className="h-[246px] w-[301.78px]">
      <Story />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return <DatePicker date={date} onChange={setDate} />;
  },
};

export const Limit: Story = {
  args: { limit: dayjs().daysInMonth() },
  render: function Render(args) {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return <DatePicker {...args} date={date} onChange={setDate} />;
  },
};
