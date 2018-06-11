import { Meta, Component } from '../litete';

@Meta({
  selector: 'test-elem'
})
export default class TestElem extends Component {
  constructor(props) {
    super(props);
  }

  sayHello = (e) => {
    alert(this.props.greeetingTest);
  }

  alert = (userName) => {
    alert(userName);
  }

  loadUsers = async () => {
    let k = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await k.json();
    this.ht = data.map((user) => {
      return `<li onclick="alert.bind(null, '${ user.name }')">${ user.name }</li>`;
    }).join('');
  }

  ComponentOnMount() {
    // return if making api calls
    return this.loadUsers();

    // no need to return if not making api calls
    // this.ht = [1,2,3].map((k) => {
    //    return `<li>${ k }</li>`;
    // }).join('');
  }

  render() {
    const { greeetingTest } = this.props;
    return(`<div> 
      ${ greeetingTest.greet }
      <button onclick='sayHello'>click</button>
      <ul>
        ${ this.ht }
      </ul>
      <router-view>
        <div>
          <ul>
            <li><router-link path='/home' displayName='router link1'></router-link></li>
            <li><router-link path='/test' displayName='router link2'></router-link></li>
          </ul>
          <route path='/home' render='TestElement'></route>
          <route path='/test' render='TestElement'></route>
        </div>
      </router-view>
    </div>`);
  }
}