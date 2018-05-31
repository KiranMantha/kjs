//router-link

import { Component } from '../litete';

export default class RouterLink extends Component {
    constructor(props) {
        super(props);
    }

    loadRoute = (...args) => {
        console.log(args);
    }

    render() {
        return `<a href="#" 
        rel="{ props.path }" 
        onclick="loadRoute.bind(null, '${ this.props.path }', '${ this.props.render }')">
        ${ this.props.displayName }
        </a>`
    }
}