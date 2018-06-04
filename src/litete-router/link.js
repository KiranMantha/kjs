//router-link
import { Meta, Component } from '../litete';
import get from 'lodash/get';

@Meta({
    selector: 'router-link'
})
export default class RouterLink extends Component {
    routerView ;
    constructor(props) {
        super(props);
    }

    ComponentOnMount() {
        this._getRouterView(this.parentElement);
        if(!this.routerView) {
            throw('RouterLink should be the child of RouterView');
        }
    }

    _getRouterView = (parentEle) => {
        if(parentEle.component) {
            this.routerView = parentEle;
        } else {
            this._getRouterView(parentEle.parentElement);
        }
    }

    loadRoute = (...args) => {
        this.routerView.renderView(args);
    }

    render() {
        return (`<a href="#${ this.props.path }" 
        rel="${ this.props.path }" 
        onclick="loadRoute.bind(null, '${ this.props.path }', '${ this.props.render }')">
        ${ this.props.displayName }
        </a>`);
    }
}