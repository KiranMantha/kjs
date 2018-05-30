export default Router = (() => {
    let routes = [];
    let mode = null;
    let root = '/';
    let interval = null;

    _config = (options) => {
        mode = options && options.mode && options.mode == 'history'
            && !!(history.pushState) ? 'history' : 'hash';
        root = options && options.root ? '/' + _clearSlashes(options.root) + '/' : '/';
        routes = options.routes;
    };

    _getFragment = () => {
        var fragment = '';
        if (mode === 'history') {
            fragment = _clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = root != '/' ? fragment.replace(root, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return _clearSlashes(fragment);
    };

    _clearSlashes = (path) => {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    };

    _remove = (param) => {
        for (var i = 0, r; i < routes.length, r = routes[i]; i++) {
            if (r.handler === param || r.re.toString() === param.toString()) {
                routes.splice(i, 1);
                return;
            }
        }
    };

    _flush = () => {
        routes = [];
        mode = null;
        root = '/';
    };

    _check = (f) => {
        var fragment = f || _getFragment();
        for (var i = 0; i < routes.length; i++) {
            var match = fragment.match(routes[i].re);
            if (match) {
                match.shift();
                routes[i].handler.apply({}, match);
                return;
            }
        }
    };

    _listen = () => {
        var current = _getFragment();
        var fn = () => {
            if (current !== _getFragment()) {
                current = _getFragment();
                _check(current);
            }
        }
        clearInterval(interval);
        interval = setInterval(fn, 50);
    };

    _navigate = (path) => {
        path = path ? path : '';
        if (mode === 'history') {
            history.pushState(null, null, root + _clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
    };

    return {
        config: _config,
        navigate: _navigate
    }
})();