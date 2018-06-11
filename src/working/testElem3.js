import { Meta, Component } from '../litete';

@Meta({
  selector: 'test-elemt'
})
export default class TestElemt extends Component {
  constructor() {
    super();
  }

  render() {
    return `
      <div>
        <ul>
          <li><router-link path='/home' displayName='router link1' render='TestElemt'></router-link></li>
          <li><router-link path='/test' displayName='router link2' render='TestElem'></router-link></li>
        </ul>
      </div>
    `;
  }
}