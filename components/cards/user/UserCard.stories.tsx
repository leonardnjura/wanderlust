import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IUserData } from '../../../data/types';
import UserCard from './UserCard';
import { mockUserCardProps } from './UserCard.mocks';

export default {
  title: 'cards/UserCard',
  component: UserCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof UserCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UserCard> = (args) => (
  <UserCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockUserCardProps.base,
} as IUserData;
