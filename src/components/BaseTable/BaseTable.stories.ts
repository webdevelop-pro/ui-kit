import type { Meta, StoryFn } from '@storybook/vue3';
import BaseTable from './BaseTable.vue';

const meta: Meta<typeof BaseTable> = {
  title: 'Components/Base/BaseTable',
  component: BaseTable,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<typeof BaseTable> = args => ({
  components: { BaseTable },
  setup() {
    return { args };
  },
  template: `<div style="display: flex">
  <BaseTable v-bind="args">
    <thead>
        <tr>
          <th>Action</th>
          <th>Device</th>
          <th>Browser</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td>Successful login</td>
          <td>Desktop</td>
          <td>Chrome</td>
        </tr>
        <tr>
          <td>Successful login2</td>
          <td>Desktop2</td>
          <td>Chrome2</td>
        </tr>
        <tr>
          <td>Successful login3</td>
          <td>Desktop3</td>
          <td>Chrome3</td>
        </tr>
        <tr>
          <td>Successful login2</td>
          <td>Desktop2</td>
          <td>Chrome2</td>
        </tr>
        <tr>
          <td>Successful login3</td>
          <td>Desktop3</td>
          <td>Chrome3</td>
        </tr>
        <tr>
          <td>Successful login2</td>
          <td>Desktop2</td>
          <td>Chrome2</td>
        </tr>
        <tr>
          <td>Successful login3</td>
          <td>Desktop3</td>
          <td>Chrome3</td>
        </tr>
    </tbody>
  </BaseTable>
  </div>`,
});

export const Default = Template.bind({});
Default.args = {};

export const FixedHeader = Template.bind({});
FixedHeader.args = { fixedHeader: true, height: '200px' };

export const StyleVariables: StoryFn = {
  render: () => ({
    template:
      `<pre>
        $table-thead-background-color: $gray-30
        $table-tbody-tr-border-bottom-color: $gray-20
        $table-tbody-tr-td-background-color: $alabaster
        $table-tbody-td-background-color: $primary
        $table-tbody-td-hover-background-color: $gray-20
        
        $table-th-td-font-size: 14px
        $table-th-td-line-height: 19.6px
        $table-th-td-padding: 12px
        </pre>`
  }),
};
