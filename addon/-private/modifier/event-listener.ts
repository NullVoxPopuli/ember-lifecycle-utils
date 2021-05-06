type ListenerParams = Parameters<Element['addEventListener']>;
// require at least one entry, or why bother?, ya know?
type ListenerArgs = ListenerParams[];

type Direct = [Element, ...ListenerParams[]];
type Shorthand = [ListenerParams, ...ListenerParams[]];

export function eventListeners(...args: Direct | Shorthand) {
  if (isShorthand(args)) {
    return (element: Element) => {
      return _eventListeners(element, ...args)
    }
  }

  return _eventListeners(...args);
}

function isShorthand(args: Direct | Shorthand): args is Shorthand {
  return !(args[0] instanceof Element);
}

function _eventListeners(element: Element, ...listeners: ListenerArgs) {
  for (let [eventName, fun, ...args] of listeners) {
    element.addEventListener(eventName, fun, ...( args || []));
  }

  return () => {
    if (!element) return;

    for (let [eventName, fun] of listeners) {
      element.removeEventListener(eventName, fun);
    }
  };

}
