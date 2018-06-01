const EventManager = new(function () {
    var events = {};

    this.subscribe = function (name, handler) {
        if (!events[name]) {
            events[name] = [];
        }
        events[name].push(handler);
    }

    this.publish = function (name, data) {
        var listeners = events[name];
        if (listeners) {
            listeners.forEach(function (fn) {
                fn(data);
            });
        }
    }

    this.unsubscribe = function (name) {
        delete events[name];
    }
});

//   eventEmitter.subscribe('btnClick', function(data) {
//     console.log(data);
//   });

//   eventEmitter.subscribe('btnClick', function(data) {
//     console.log(data);
//   });

//   setTimeout(()=>{
//     eventEmitter.publish('btnClick', { data: 'hi' });
//     eventEmitter.unsubscribe('btnClick');
//   }, 1000);

export default EventManager