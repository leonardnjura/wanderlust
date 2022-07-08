import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ICountryData, IUserData } from '../../../data/types';
import CountryCard from './CountryCard';
import { mockCountryCardProps } from './CountryCard.mocks';

export default {
  title: 'cards/CountryCard',
  component: CountryCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CountryCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CountryCard> = (args) => (
  <CountryCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCountryCardProps.base,
} as ICountryData;
