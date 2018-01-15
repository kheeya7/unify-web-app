import $ from 'jquery';
import { Rootpage } from './rootpage/view.js';

const rootpage = new Rootpage();

rootpage.render();

$('body').append(rootpage.$el);
