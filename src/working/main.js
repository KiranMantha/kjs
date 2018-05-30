import TestEle from './testEle';
import TestElem from './testEle2';
import litete from '../litete';

litete.registry.registerComponents(TestEle, TestElem);

litete.render('<test-ele test="kiran"></test-ele>', document.querySelector('#cntr'));