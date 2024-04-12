import { useState } from "react";

import type { Meta } from "@storybook/react";

import DatePicker from "@/components/DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "components/DatePicker",
  component: DatePicker,
  decorators: Story => (
    <div className="h-[246px] w-[301.78px]">
      <Story />
    </div>
  ),
};

export default meta;

export const Default = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return <DatePicker date={date} onChange={setDate} />;
};
