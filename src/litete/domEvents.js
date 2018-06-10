export default function attachDomEvents(targetNode) {
    // create an observer instance
    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.onMount) {
                            node.onMount();
                        } else {
                            let notRegEles = node.querySelectorAll(':not(:defined)');
                            notRegEles.forEach((node) => {
                                node.onMount();
                            });
                        }                        
                    });
                } else if (mutation.removedNodes.length > 0) {
                    mutation.removedNodes.forEach((node) => {
                        if (node.onUnMount) {
                            node.onUnMount();
                        }
                        let notRegEles = node.querySelectorAll(':not(:defined)');
                        notRegEles.forEach((node) => {
                            node.onUnMount();
                        });
                    });
                }
            }
        });
    });

    // configuration of the observer:
    let config = {
        attributes: true,
        childList: true,
        characterData: true
    };

    observer.disconnect();
    observer.observe(targetNode, config);
}