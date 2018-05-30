import TestEle from './testEle';
import TestElem from './testEle2';
import { registry, render } from '../litete';

registry.registerComponents(TestEle, TestElem);

render('<test-ele test="kiran"></test-ele>', document.querySelector('#cntr'));