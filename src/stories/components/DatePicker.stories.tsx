import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import dayjs, { Dayjs } from "dayjs";

import DatePicker from "@/components/DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "components/DatePicker",
  tags: ["autodocs"],
  component: DatePicker,
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = useState<Dayjs>(dayjs);

    return <DatePicker date={date} onChange={setDate} />;
  },
};

export const Limit: Story = {
  args: { limit: dayjs().daysInMonth() },
  render: function Render(args) {
    const [date, setDate] = useState<Dayjs>(dayjs);

    return <DatePicker {...args} date={date} onChange={setDate} />;
  },
};
