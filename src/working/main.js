import { render } from '../litete';
import { RouterLink, RouterView, Route } from '../litete-router';
import TestEle from './testEle';
import TestElem from './testEle2';
import TestElemt from './testElem3';
import TestElement from './testElem4';

render('<test-ele test="kiran"></test-ele>', document.querySelector('#cntr'));