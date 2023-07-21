import { create } from '@storybook/theming/create';
// @ts-ignore
import Logo from './assets/logo.svg';

export default create({
    base: 'dark',
    brandTitle: 'Azerion',
    brandUrl: '/',
    brandImage: Logo
});
