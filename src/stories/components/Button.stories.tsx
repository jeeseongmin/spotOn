import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/components/Button";

const meta: Meta<typeof Button> = {
  title: "components/Button",
  tags: ["autodocs"],
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  name: "Primary 버튼",
  args: {
    children: "확인하기",
    variant: "primary",
    text: "확인하기",
  },
};

export const Disabled: Story = {
  name: "Disabled 버튼",
  args: {
    children: "확인하기",
    variant: "disabled",
    text: "확인하기",
  },
};

export const Outlined: Story = {
  name: "Outlined 버튼",
  args: {
    children: "확인하기",
    variant: "outlined",
    text: "확인하기",
  },
};

export const Underlined: Story = {
  name: "Underlined 버튼",
  args: {
    children: "확인하기",
    variant: "underlined",
    text: "확인하기",
  },
};

export const Add: Story = {
  name: "Add 버튼",
  args: {
    children: "추가하기",
    variant: "add",
    text: "확인하기",
  },
};
