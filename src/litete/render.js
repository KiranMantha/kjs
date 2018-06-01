import createVDom from './toVdom';
import getHtmlFromVDom from './vdomToHtml';
import attachDomEvents from './domEvents';

export default function render(node, container) {
    attachDomEvents(container);
    let _node = (new DOMParser()).parseFromString(node, 'application/xml').children[0];
    let _vdom = createVDom(_node);
    getHtmlFromVDom(_vdom, container, {});
}