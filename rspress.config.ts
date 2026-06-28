import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import pluginMermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  lang: 'en',
  title: 'Reward Flights',
  description:
    'Making the most of American Express UK Membership Rewards points for reward flights',
  // base: '/reward-flights/',   // uncomment for GitHub Pages project-page hosting
  search: { codeBlocks: true },
  plugins: [pluginMermaid()],
  themeConfig: {
    footer: {
      message:
        'Unofficial guide — figures are indicative and change often. Always verify with Amex and the airline before transferring.',
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/whiteswandata/reward-flights',
      },
    ],
  },
});
