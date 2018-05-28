import LiteTE from '../templateEngine';

class TestEle extends LiteTE {
  greeting = 'Hello';

  constructor() {
    super();
  }

  sayHello = (e) => {
    alert(this.greeting);
  }

  render() {
    return `<div> { greeting } <button onclick='sayHello'>click</button></div>`;
  }
}

customElements.define('test-ele', TestEle);