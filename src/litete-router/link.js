//router-link

import {
    Meta, Component
} from '../litete';

@Meta({
    selector: 'router-link'
})
export default class RouterLink extends Component {
    constructor(props) {
        super(props);
    }

    loadRoute = (...args) => {
        console.log(args);
    }

    render() {
        return (`<a href="#${ this.props.path }" 
        rel="${ this.props.path }" 
        onclick="loadRoute.bind(null, '${ this.props.path }', '${ this.props.render }')">
        ${ this.props.displayName }
        </a>`);
    }
}