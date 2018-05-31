import TestEle from './testEle';
import TestElem from './testEle2';
import TestElemt from './testElem3';
import { registry, render } from '../litete';
import { RouterLink, RouterView } from '../litete-router'

registry.registerComponents(RouterLink, RouterView, TestEle, TestElem, TestElemt);

render('<test-ele test="kiran"></test-ele>', document.querySelector('#cntr'));