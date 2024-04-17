import { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";

import Dropdown from "@/components/Dropdown/Dropdown";
import { cells, communities, teams } from "@/dummy/organization";

const meta: Meta<typeof Dropdown> = {
  title: "components/Dropdown",
  tags: ["autodocs"],
  component: Dropdown,
  decorators: Story => (
    <div className="h-[246px] w-[301.78px]">
      <Story />
    </div>
  ),
};

export default meta;

export const Default = () => {
  const { setValue } = useForm();
  const options = ["누가순", "마태순", "마가순", "요한순"];

  return (
    <Dropdown
      setValue={setValue}
      category={"community"}
      options={options}
      disabled={false}
    />
  );
};

export const ExampleInSignUpPage = () => {
  const { setValue } = useForm();

  return (
    <div className="grid w-96 grid-cols-3 gap-2">
      <Dropdown
        setValue={setValue}
        category={"community"}
        options={communities}
        disabled={false}
      />
      <Dropdown
        setValue={setValue}
        category={"team"}
        options={teams}
        disabled={false}
      />

      <Dropdown
        setValue={setValue}
        category={"cell"}
        options={cells}
        disabled={false}
      />
    </div>
  );
};

export const DisabledDropdown = () => {
  const { setValue } = useForm();
  const options = ["누가순", "마태순", "마가순", "요한순"];

  return (
    <Dropdown
      setValue={setValue}
      category={"community"}
      options={options}
      disabled={true}
    />
  );
};
