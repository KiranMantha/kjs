import LiteTE from '../templateEngine';

export default class TestElem extends LiteTE {
  constructor(props) {
    super(props);
  }

  sayHello = (e) => {
    alert(this.props.greeetingTest);
    console.log(this.props);
  }

  onMount(){
    this.ht = [1,2,3].map((i)=>{
      return `<li>${i}</li>`;
    }).join('');
  }

  render() {
    const { greeetingTest } = this.props;
    return(`<div> 
      ${ greeetingTest }
      <button onclick='sayHello'>click</button>
      <ul>
        ${ this.ht }
      </ul>
    </div>`);
  }
}