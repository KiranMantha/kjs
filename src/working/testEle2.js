import LiteTE from '../templateEngine';

export default class TestElem extends LiteTE {
  constructor(props) {
    super(props);
  }

  sayHello = (e) => {
    alert(this.props.greeetingTest);
    console.log(this.props);
  }

  render() {
    return `<div> 
      { props.greeetingTest }
      <button onclick='sayHello'>click</button>
    </div>`;
  }
}