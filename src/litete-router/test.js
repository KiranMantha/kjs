import { Meta, Component } from '../litete';

@Meta({
    selector: 'router-view'
})
export default class RouterView extends Component {
    constructor(){
        super();
    }

    ComponentOnMount() {
        debugger;    
        this._vdom.children = this.parentElement._vdom.children.filter((vnode)=>{
            if(vnode.type === this.localName) {
                return vnode;
            }
        })[0].children;
        console.log('routerview vdom', this._vdom);
    }

    render(){
        return '<div></div>';
    }
}