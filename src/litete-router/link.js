//router-link
import { Meta, Component } from '../litete';
import get from 'lodash/get';

@Meta({
    selector: 'router-link'
})
export default class RouterLink extends Component {
    constructor(props) {
        super(props);
    }

    ComponentOnMount() {
        if(!this.context.router)
            throw Error('RouterLink should be the child of RouterView');
    }

    loadRoute = (path, render) => {
        this.context.router.renderView({path, render});
    }

    render() {
        return (`<a href="#${this.props.path}" 
        rel="${ this.props.path}" 
        onclick="loadRoute.bind(null, '${ this.props.path}', '${this.props.render}')">
        ${ this.props.displayName}
        </a>`);
    }
}