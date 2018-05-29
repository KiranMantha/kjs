import VDOM from './vdom';

export const createVDom = (node) => {
  let vdom = new VDOM();

  for (let attr of node.attributes) {
    vdom.props[attr.name] = attr.value;
  }

  vdom.type = node.nodeName;

  /*
    Node.ELEMENT_NODE	1	An Element node such as <p> or <div>.
    Node.TEXT_NODE	3	The actual Text of Element or Attr.
    Node.PROCESSING_INSTRUCTION_NODE	7	
    A ProcessingInstruction of an XML document such as <?xml-stylesheet ... ?> declaration.
    Node.COMMENT_NODE	8	A Comment node.
    Node.DOCUMENT_NODE	9	A Document node.
    Node.DOCUMENT_TYPE_NODE	10	A DocumentType node e.g. <!DOCTYPE html> for HTML5 documents.
    Node.DOCUMENT_FRAGMENT_NODE	11	A DocumentFragment node.
  */

  //list out all childnodes
  if (node.hasChildNodes()) {
    let nodes = node.childNodes;
    for (let cnode of nodes) {
      if (cnode.nodeType === 3) {
        if (cnode.nodeValue.trim()) vdom.children.push(cnode.nodeValue);
      } else if (cnode.nodeType === 1) {
        vdom.children.push(createVDom(cnode));
      }
    }
  };
  return vdom;
}