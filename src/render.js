import { createVDom } from './toVdom';
import { getHtmlFromVDom } from './vdomToHtml';

export default function render(node, container) {
    let _node = (new DOMParser()).parseFromString(node, 'application/xml').children[0];
    let _vdom = createVDom(_node);
    console.log(_vdom);
    getHtmlFromVDom(_vdom, container, {});
    debugger;
}