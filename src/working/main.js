import TestEle from './testEle';
import TestElem from './testEle2';
import registry from '../registerComponent';
import render from '../render';

registry.registerComponents(TestEle, TestElem);

render('<test-ele test="kiran"></test-ele>', document.querySelector('#cntr'));