import type { Meta, StoryFn } from '@storybook/vue3';
import BaseFormSelect from './BaseFormSelect.vue';


const meta: Meta<typeof BaseFormSelect> = {
  title: 'Components/Base/BaseFormSelect',
  component: BaseFormSelect,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['large', 'medium'],
      control: { type: 'select' },
    },
  },
};

export default meta;

const Template: StoryFn = args => ({
  components: { BaseFormSelect },
  setup() {
    // Add any setup or data if needed for the story
    return { args };
  },
  template: '<BaseFormSelect v-bind="args" placeholder="Select" />',
});

const TemplateWithIcon: StoryFn = args => ({
  components: { BaseFormSelect },
  setup() {
    // Add any setup or data if needed for the story
    return { args };
  },
  template: '<BaseFormSelect v-bind="args" placeholder="Select" >'
    + '<template #append><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">\n'
    + '<path d="M6 2.5H6.75H13.25H14V3.25V5.5H18V10.5H12H8H2V5.5H6V3.25V2.5ZM2 11.5H8V13.5H12V11.5H18V17.5H2V11.5ZM12.5 4H7.5V5.5H12.5V4Z" fill="#48535C"/>\n'
    + '</svg></template>'
    + '</BaseFormSelect>',
});

const ArrayOfObjectOptions = [
  {
    value: 'One Value',
    label: 'One Label',
  },
  {
    value: 'Two Value',
    label: 'Two Label',
  },
  {
    value: 'Three Value',
    label: 'Three Label',
  },
];

const ObjectOptions = {
  'One Label': 'One Value',
  'Two Label': 'Two Value',
  'Three Label': 'Three Value',
};

export const ArrayWithStringAsOptions = Template.bind({});
ArrayWithStringAsOptions.args = {
  options: ['One', 'Two', 'Three'],
};

/**
 * Passing an array of objects as options. The value and label keys are required.
 */
export const ArrayOfObjectAsOptions = Template.bind({});
ArrayOfObjectAsOptions.args = {
  options: ArrayOfObjectOptions,
};

/**
 * Passing a simple object as options.
 * The key is the label and the value is the value.
 * To swap the label and value, use the swapLabelAndValue prop.
 */
export const ObjectAsOptions = Template.bind({});
ObjectAsOptions.args = {
  options: ObjectOptions,
};

/**
 * Passing a simple object as options.
 * Swapped the label and value by using the swapLabelAndValue prop.
 */
export const ObjectAsOptionsWithSwappedLabelAndValue = Template.bind({});
ObjectAsOptionsWithSwappedLabelAndValue.args = {
  options: ObjectOptions,
  swapLabelAndValue: true,
};

/**
 * Custom keys for the label and value in option objects.
 * Use the itemLabel and itemValue props to specify the keys.
 */
export const CustomObjectKeyNameInArrayOfObjectOptions = Template.bind({});
CustomObjectKeyNameInArrayOfObjectOptions.args = {
  options: ArrayOfObjectOptions.map(option => ({ text: option.label, model: option.value })),
  itemLabel: 'text',
  itemValue: 'model',
};

/**
 * Searchable select
 */
export const Searchable = Template.bind({});
Searchable.args = {
  options: ArrayOfObjectOptions,
  searchable: true,
};

/**
 * Sort options by label in ASC
 */
export const SortOptionsByLabel = Template.bind({});
SortOptionsByLabel.args = {
  options: ArrayOfObjectOptions,
  sort: true,
};

/**
 * Exclude a second option by passing an array of values to excludeOptions
 */
export const ExcludeOptions = Template.bind({});
ExcludeOptions.args = {
  options: ArrayOfObjectOptions,
  excludeOptions: ['Two Value'],
};

export const WithAppended = TemplateWithIcon.bind({});
WithAppended.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
};

export const StyleVariables: StoryFn = {
  render: () => ({
    template:
      `<pre>
        $select-border: solid 1px $gray-40
        $select-border-radius: 6px
        $select-height: 38px
        $select-large-height: 48px
        $select-border-error-color: $red
        $select-placeholder-color: $gray-50
        $select-menu-background: $white
        $select-menu-border: solid 1px transparent
        $select-menu-border-radius: 6px
        $select-menu-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)
        
        $select-font-size: 12px
        $select-line-height: 12px
        $select-font-family: 'Avenir'
        $select-font-weight: 600
        
        $select-menu-option-color: $black
        $select-menu-option-font-family: 'Avenir'
        $select-menu-option-highlight-color: $gray-10
        $select-menu-option-selected-color: $secondary
        $select-menu-option-font-size: 12px
      </pre>`
  }),
};
