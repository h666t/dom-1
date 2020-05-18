window.dom = {
  create(string) {
    const container = document.createElement("template");
    //template可以容纳任何东西，防止有些不太准确的语法无法被html识别
    container.innerHTML = string.trim();
    //trim 防止空格影响代码
    return container.content.firstChild;
  },

  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
    //第一个参数为节点，第二个参数为内容
  },

  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },

  append(parent, node) {
    parent.appendChild(node);
  },

  wrap(node, parent) {
    //给node一个parent
    dom.before(node, parent);
    //先让node和parent称为sibling
    dom.append(parent, node);
    //在将node变成parent的child
  },

  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },

  empty(node) {
    const arr = [];
    let x = node.firstChild;
    while (x) {
      arr.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    //不能用for循环，因为node.childNodes.length随着remove会变化
    return arr;
  },

  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
    //重载
  },

  text(node, string) {
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string; //ie
      } else {
        node.textContent = string; //firefox/chrome
      }
      //适配
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText; //ie
      } else {
        return node.textContent; //firefox/chrome
      }
    }
  },

  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },

  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(node,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style.(div,{})
        const object = name;
        for (let key in object) {
          //node.style.border = '....'
          //node.style.color = '....'
          node.style[key] = object[key];
        }
      }
    }
  },

  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    contains(node, className) {
      return node.classList.contains(className);
    },
  },

  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },

  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  //事件监听

  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },

  parent(node) {
    return node.parentNode;
  },

  children(node) {
    return node.children;
  },

  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
    //children 是伪数组，要先变成数组
  },

  next(node) {
    return node.nextElementSibling;
  },

  previous(node) {
    return node.previousElementSibling;
  },

  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },

  index(node) {
    let i;
    for (i = 0; i < node.parentNode.children.length; i++) {
      if (node.parentNode.children[i] === node) {
        console.log(node.parentNode.children);
        break;
      }
    }
    return i;
  },
};
