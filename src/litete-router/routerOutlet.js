//router-link
import { Meta, Component, EventManager, createVDom, getHtmlFromVDom } from '../litete';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';
import ROUTER_EVENTS from './routerEvents';

@Meta({
    selector: 'router-outlet'
})
export default class RouterOutlet extends Component {
    constructor(props) {
        super(props);
        EventManager.subscribe(ROUTER_EVENTS.LOAD_ROUTE, (data) => {
            this.renderComponent(data);
        });
    }

    ComponentOnMount() {
        if (!this.context.router)
            throw Error('RouterOutlet should be the child of RouterView');
    }

    ComponentOnUnMount() {
        EventManager.unsubscribe(ROUTER_EVENTS.LOAD_ROUTE);
    }

    renderComponent = (data) => {
        this.domRef.childNodes.forEach((element) => {
            element.remove();
        });
        let node = document.createElement(kebabCase(data.render));
        let vdom = createVDom(node);
        vdom.props = {
            'to': data.to
        }
        getHtmlFromVDom(vdom, this.domRef, this);
    }

    render() {
        return null;
    }
}