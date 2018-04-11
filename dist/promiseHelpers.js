"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var listenerTracker_1 = require("./listenerTracker");
var BBPromise = require("bluebird");
/**
 * Adapts a Node-style async function with any number of arguments and a callback to a
 * function that has the same arguments (minus the callback) and returns a Promise.
 * @param func - The Node-style function that takes arguments followed by a
 * Node-style callback.
 * @return A function that takes the arguments and returns a Promise for the result.
 */
function promisifyN(func) {
    var promisifiedFunc = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new BBPromise(function (resolve, reject) {
            func.apply(undefined, args.concat(function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            }));
        });
    };
    return promisifiedFunc;
}
exports.promisifyN = promisifyN;
/**
 * Adapts a Node-style async function with one parameter and a callback to a
 * function that takes one parameter and returns a Promise.  This function is
 * similar to promisifyN(), except that it retains type safety.
 * @param func - The Node-style function that takes one argument and a
 * Node-style callback.
 * @return A function that takes the one argument and returns a Promise for the
 * result.
 */
function promisify1(func) {
    var promisifiedFunc = function (arg1) {
        return new BBPromise(function (resolve, reject) {
            func(arg1, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    return promisifiedFunc;
}
exports.promisify1 = promisify1;
/**
 * Adapts a Node-style async function with two parameters and a callback to a function
 * that takes two parameters and returns a Promise.  This function is similar to
 * promisifyN(), except that it retains type safety.
 * @param func - The Node-style function that takes two arguments and a
 * Node-style callback.
 * @return A function that takes the two arguments and returns a Promise for the
 * result.
 */
function promisify2(func) {
    var promisifiedFunc = function (arg1, arg2) {
        return new BBPromise(function (resolve, reject) {
            func(arg1, arg2, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    return promisifiedFunc;
}
exports.promisify2 = promisify2;
/**
 * Adapts a Node-style async function with three parameters and a callback to a function
 * that takes three parameters and returns a Promise.  This function is similar to
 * promisifyN(), except that it retains type safety.
 * @param func - The Node-style function that takes three arguments and a
 * Node-style callback.
 * @return A function that takes the three arguments and returns a Promise for the
 * result.
 */
function promisify3(func) {
    var promisifiedFunc = function (arg1, arg2, arg3) {
        return new BBPromise(function (resolve, reject) {
            func(arg1, arg2, arg3, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    return promisifiedFunc;
}
exports.promisify3 = promisify3;
/**
 * Runs a sequence of functions in order with each returned value feeding into
 * the parameter of the next.
 * @param tasks - The functions to execute in sequence.  Each function will
 * receive 1 parameter, the return value of the previous function.  A function
 * should throw an exception if it wishes to terminate the sequence and reject
 * the returned promise.
 * @param initialValue - The value that will be passed into the first function.
 * @returns {Promise<any>} A promise that will be resolved with the return value
 * of the last function.
 */
function sequence(tasks, initialValue) {
    "use strict";
    return tasks.reduce(function (accumulator, curTask) {
        return accumulator.then(curTask);
    }, BBPromise.resolve(initialValue));
}
exports.sequence = sequence;
/**
 * Adapts an EventEmitter to a Promise interface
 * @param emitter - The event emitter to listen to
 * @param resolveEventName - The event that will cause the Promise to resolve
 * @param rejectEventName - The event that will cause the Promise to reject
 * @return A Promise that will will resolve and reject as specified
 */
function eventToPromise(emitter, resolveEventName, rejectEventName) {
    return new BBPromise(function (resolve, reject) {
        var tracker = new listenerTracker_1.ListenerTracker(emitter);
        tracker.once(resolveEventName, function (result) {
            tracker.removeAll();
            resolve(result);
        });
        if (rejectEventName) {
            tracker.once(rejectEventName, function (err) {
                tracker.removeAll();
                reject(err);
            });
        }
    });
}
exports.eventToPromise = eventToPromise;
/**
 * Adapts a stream to a Promise interface.
 * @param stream - The stream to be adapted
 * @return A Promise that will be resolved when the stream emits the "finish"
 * event and rejects when it emits an "error" event.
 */
function streamToPromise(stream) {
    return eventToPromise(stream, "finish", "error");
}
exports.streamToPromise = streamToPromise;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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RUFBRSxPQUFPO1FBQ2pCLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDLEVBQ0QsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFYRCw0QkFXQztBQUdEOzs7Ozs7R0FNRztBQUNILHdCQUNJLE9BQXFCLEVBQ3JCLGdCQUF3QixFQUN4QixlQUF3QjtJQUd4QixPQUFPLElBQUksU0FBUyxDQUNoQixVQUFDLE9BQXNDLEVBQUUsTUFBMEI7UUFDL0QsSUFBTSxPQUFPLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxNQUFtQjtZQUMvQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxlQUFlLEVBQ25CO1lBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBQyxHQUFRO2dCQUNuQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQyxDQUNKLENBQUM7QUFDTixDQUFDO0FBeEJELHdDQXdCQztBQUdEOzs7OztHQUtHO0FBQ0gseUJBQWdDLE1BQWdCO0lBQzVDLE9BQU8sY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUZELDBDQUVDIiwiZmlsZSI6InByb21pc2VIZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtXcml0YWJsZX0gZnJvbSBcInN0cmVhbVwiO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gXCJldmVudHNcIjtcbmltcG9ydCB7TGlzdGVuZXJUcmFja2VyfSBmcm9tIFwiLi9saXN0ZW5lclRyYWNrZXJcIjtcbmltcG9ydCAqIGFzIEJCUHJvbWlzZSBmcm9tIFwiYmx1ZWJpcmRcIjtcblxuXG5leHBvcnQgdHlwZSBDYWxsQmFja1R5cGU8UmVzdWx0VHlwZT4gPSAoZXJyOiBhbnksIHJlc3VsdD86IFJlc3VsdFR5cGUpID0+IHZvaWQ7XG5cblxuLyoqXG4gKiBBZGFwdHMgYSBOb2RlLXN0eWxlIGFzeW5jIGZ1bmN0aW9uIHdpdGggYW55IG51bWJlciBvZiBhcmd1bWVudHMgYW5kIGEgY2FsbGJhY2sgdG8gYVxuICogZnVuY3Rpb24gdGhhdCBoYXMgdGhlIHNhbWUgYXJndW1lbnRzIChtaW51cyB0aGUgY2FsbGJhY2spIGFuZCByZXR1cm5zIGEgUHJvbWlzZS5cbiAqIEBwYXJhbSBmdW5jIC0gVGhlIE5vZGUtc3R5bGUgZnVuY3Rpb24gdGhhdCB0YWtlcyBhcmd1bWVudHMgZm9sbG93ZWQgYnkgYVxuICogTm9kZS1zdHlsZSBjYWxsYmFjay5cbiAqIEByZXR1cm4gQSBmdW5jdGlvbiB0aGF0IHRha2VzIHRoZSBhcmd1bWVudHMgYW5kIHJldHVybnMgYSBQcm9taXNlIGZvciB0aGUgcmVzdWx0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvbWlzaWZ5TjxSZXN1bHRUeXBlPihcbiAgICBmdW5jOiAoLi4uYXJnczogQXJyYXk8YW55PikgPT4gdm9pZFxuKTogKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IFByb21pc2U8UmVzdWx0VHlwZT4ge1xuXG4gICAgY29uc3QgcHJvbWlzaWZpZWRGdW5jID0gZnVuY3Rpb24gKC4uLmFyZ3M6IEFycmF5PGFueT4pOiBQcm9taXNlPFJlc3VsdFR5cGU+IHtcblxuICAgICAgICByZXR1cm4gbmV3IEJCUHJvbWlzZTxSZXN1bHRUeXBlPigocmVzb2x2ZTogKHJlc3VsdDogUmVzdWx0VHlwZSkgPT4gdm9pZCwgcmVqZWN0OiAoZXJyOiBhbnkpID0+IHZvaWQpID0+IHtcbiAgICAgICAgICAgIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmdzLmNvbmNhdCgoZXJyOiBhbnksIHJlc3VsdDogUmVzdWx0VHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJvbWlzaWZpZWRGdW5jO1xufVxuXG5cbi8qKlxuICogQWRhcHRzIGEgTm9kZS1zdHlsZSBhc3luYyBmdW5jdGlvbiB3aXRoIG9uZSBwYXJhbWV0ZXIgYW5kIGEgY2FsbGJhY2sgdG8gYVxuICogZnVuY3Rpb24gdGhhdCB0YWtlcyBvbmUgcGFyYW1ldGVyIGFuZCByZXR1cm5zIGEgUHJvbWlzZS4gIFRoaXMgZnVuY3Rpb24gaXNcbiAqIHNpbWlsYXIgdG8gcHJvbWlzaWZ5TigpLCBleGNlcHQgdGhhdCBpdCByZXRhaW5zIHR5cGUgc2FmZXR5LlxuICogQHBhcmFtIGZ1bmMgLSBUaGUgTm9kZS1zdHlsZSBmdW5jdGlvbiB0aGF0IHRha2VzIG9uZSBhcmd1bWVudCBhbmQgYVxuICogTm9kZS1zdHlsZSBjYWxsYmFjay5cbiAqIEByZXR1cm4gQSBmdW5jdGlvbiB0aGF0IHRha2VzIHRoZSBvbmUgYXJndW1lbnQgYW5kIHJldHVybnMgYSBQcm9taXNlIGZvciB0aGVcbiAqIHJlc3VsdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb21pc2lmeTE8UmVzdWx0VHlwZSwgQXJnMVR5cGU+KFxuICAgIGZ1bmM6IChhcmcxOiBBcmcxVHlwZSwgY2I6IENhbGxCYWNrVHlwZTxSZXN1bHRUeXBlPiApID0+IHZvaWRcbik6IChhcmcxOiBBcmcxVHlwZSkgPT4gUHJvbWlzZTxSZXN1bHRUeXBlPiB7XG5cbiAgICBjb25zdCBwcm9taXNpZmllZEZ1bmMgPSBmdW5jdGlvbiAoYXJnMTogQXJnMVR5cGUpOiBQcm9taXNlPFJlc3VsdFR5cGU+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBCQlByb21pc2U8UmVzdWx0VHlwZT4oKHJlc29sdmU6IChyZXN1bHQ6IFJlc3VsdFR5cGUpID0+IHZvaWQsIHJlamVjdDogKGVycjogYW55KSA9PiB2b2lkKSA9PiB7XG4gICAgICAgICAgICBmdW5jKGFyZzEsIChlcnI6IGFueSwgcmVzdWx0PzogUmVzdWx0VHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJvbWlzaWZpZWRGdW5jO1xuXG59XG5cblxuLyoqXG4gKiBBZGFwdHMgYSBOb2RlLXN0eWxlIGFzeW5jIGZ1bmN0aW9uIHdpdGggdHdvIHBhcmFtZXRlcnMgYW5kIGEgY2FsbGJhY2sgdG8gYSBmdW5jdGlvblxuICogdGhhdCB0YWtlcyB0d28gcGFyYW1ldGVycyBhbmQgcmV0dXJucyBhIFByb21pc2UuICBUaGlzIGZ1bmN0aW9uIGlzIHNpbWlsYXIgdG9cbiAqIHByb21pc2lmeU4oKSwgZXhjZXB0IHRoYXQgaXQgcmV0YWlucyB0eXBlIHNhZmV0eS5cbiAqIEBwYXJhbSBmdW5jIC0gVGhlIE5vZGUtc3R5bGUgZnVuY3Rpb24gdGhhdCB0YWtlcyB0d28gYXJndW1lbnRzIGFuZCBhXG4gKiBOb2RlLXN0eWxlIGNhbGxiYWNrLlxuICogQHJldHVybiBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgdGhlIHR3byBhcmd1bWVudHMgYW5kIHJldHVybnMgYSBQcm9taXNlIGZvciB0aGVcbiAqIHJlc3VsdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb21pc2lmeTI8UmVzdWx0VHlwZSwgQXJnMVR5cGUsIEFyZzJUeXBlPihcbiAgICBmdW5jOiAoYXJnMTogQXJnMVR5cGUsIGFyZzI6IEFyZzJUeXBlLCBjYjogQ2FsbEJhY2tUeXBlPFJlc3VsdFR5cGU+ICkgPT4gdm9pZFxuKTogKGFyZzE6IEFyZzFUeXBlLCBhcmcyOiBBcmcyVHlwZSkgPT4gUHJvbWlzZTxSZXN1bHRUeXBlPiB7XG5cbiAgICBjb25zdCBwcm9taXNpZmllZEZ1bmMgPSBmdW5jdGlvbiAoYXJnMTogQXJnMVR5cGUsIGFyZzI6IEFyZzJUeXBlKTogUHJvbWlzZTxSZXN1bHRUeXBlPiB7XG4gICAgICAgIHJldHVybiBuZXcgQkJQcm9taXNlPFJlc3VsdFR5cGU+KChyZXNvbHZlOiAocmVzdWx0OiBSZXN1bHRUeXBlKSA9PiB2b2lkLCByZWplY3Q6IChlcnI6IGFueSkgPT4gdm9pZCkgPT4ge1xuICAgICAgICAgICAgZnVuYyhhcmcxLCBhcmcyLCAoZXJyOiBhbnksIHJlc3VsdD86IFJlc3VsdFR5cGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0ISk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHByb21pc2lmaWVkRnVuYztcbn1cblxuXG4vKipcbiAqIEFkYXB0cyBhIE5vZGUtc3R5bGUgYXN5bmMgZnVuY3Rpb24gd2l0aCB0aHJlZSBwYXJhbWV0ZXJzIGFuZCBhIGNhbGxiYWNrIHRvIGEgZnVuY3Rpb25cbiAqIHRoYXQgdGFrZXMgdGhyZWUgcGFyYW1ldGVycyBhbmQgcmV0dXJucyBhIFByb21pc2UuICBUaGlzIGZ1bmN0aW9uIGlzIHNpbWlsYXIgdG9cbiAqIHByb21pc2lmeU4oKSwgZXhjZXB0IHRoYXQgaXQgcmV0YWlucyB0eXBlIHNhZmV0eS5cbiAqIEBwYXJhbSBmdW5jIC0gVGhlIE5vZGUtc3R5bGUgZnVuY3Rpb24gdGhhdCB0YWtlcyB0aHJlZSBhcmd1bWVudHMgYW5kIGFcbiAqIE5vZGUtc3R5bGUgY2FsbGJhY2suXG4gKiBAcmV0dXJuIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyB0aGUgdGhyZWUgYXJndW1lbnRzIGFuZCByZXR1cm5zIGEgUHJvbWlzZSBmb3IgdGhlXG4gKiByZXN1bHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9taXNpZnkzPFJlc3VsdFR5cGUsIEFyZzFUeXBlLCBBcmcyVHlwZSwgQXJnM1R5cGU+KFxuICAgIGZ1bmM6IChhcmcxOiBBcmcxVHlwZSwgYXJnMjogQXJnMlR5cGUsIGFyZzM6IEFyZzNUeXBlLCBjYjogQ2FsbEJhY2tUeXBlPFJlc3VsdFR5cGU+ICkgPT4gdm9pZFxuKTogKGFyZzE6IEFyZzFUeXBlLCBhcmcyOiBBcmcyVHlwZSwgYXJnMzogQXJnM1R5cGUpID0+IFByb21pc2U8UmVzdWx0VHlwZT4ge1xuXG4gICAgY29uc3QgcHJvbWlzaWZpZWRGdW5jID0gZnVuY3Rpb24gKGFyZzE6IEFyZzFUeXBlLCBhcmcyOiBBcmcyVHlwZSwgYXJnMzogQXJnM1R5cGUpOiBQcm9taXNlPFJlc3VsdFR5cGU+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBCQlByb21pc2U8UmVzdWx0VHlwZT4oKHJlc29sdmU6IChyZXN1bHQ6IFJlc3VsdFR5cGUpID0+IHZvaWQsIHJlamVjdDogKGVycjogYW55KSA9PiB2b2lkKSA9PiB7XG4gICAgICAgICAgICBmdW5jKGFyZzEsIGFyZzIsIGFyZzMsIChlcnI6IGFueSwgcmVzdWx0PzogUmVzdWx0VHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJvbWlzaWZpZWRGdW5jO1xufVxuXG5cbi8qKlxuICogUnVucyBhIHNlcXVlbmNlIG9mIGZ1bmN0aW9ucyBpbiBvcmRlciB3aXRoIGVhY2ggcmV0dXJuZWQgdmFsdWUgZmVlZGluZyBpbnRvXG4gKiB0aGUgcGFyYW1ldGVyIG9mIHRoZSBuZXh0LlxuICogQHBhcmFtIHRhc2tzIC0gVGhlIGZ1bmN0aW9ucyB0byBleGVjdXRlIGluIHNlcXVlbmNlLiAgRWFjaCBmdW5jdGlvbiB3aWxsXG4gKiByZWNlaXZlIDEgcGFyYW1ldGVyLCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBwcmV2aW91cyBmdW5jdGlvbi4gIEEgZnVuY3Rpb25cbiAqIHNob3VsZCB0aHJvdyBhbiBleGNlcHRpb24gaWYgaXQgd2lzaGVzIHRvIHRlcm1pbmF0ZSB0aGUgc2VxdWVuY2UgYW5kIHJlamVjdFxuICogdGhlIHJldHVybmVkIHByb21pc2UuXG4gKiBAcGFyYW0gaW5pdGlhbFZhbHVlIC0gVGhlIHZhbHVlIHRoYXQgd2lsbCBiZSBwYXNzZWQgaW50byB0aGUgZmlyc3QgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBBIHByb21pc2UgdGhhdCB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhlIHJldHVybiB2YWx1ZVxuICogb2YgdGhlIGxhc3QgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZShcbiAgICB0YXNrczogQXJyYXk8KHByZXZpb3VzVmFsdWU6IGFueSkgPT4gYW55PixcbiAgICBpbml0aWFsVmFsdWU6IGFueVxuKTogUHJvbWlzZTxhbnk+IHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHJldHVybiB0YXNrcy5yZWR1Y2UoXG4gICAgICAgIChhY2N1bXVsYXRvciwgY3VyVGFzaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yLnRoZW4oY3VyVGFzayk7XG4gICAgICAgIH0sXG4gICAgICAgIEJCUHJvbWlzZS5yZXNvbHZlKGluaXRpYWxWYWx1ZSkpO1xufVxuXG5cbi8qKlxuICogQWRhcHRzIGFuIEV2ZW50RW1pdHRlciB0byBhIFByb21pc2UgaW50ZXJmYWNlXG4gKiBAcGFyYW0gZW1pdHRlciAtIFRoZSBldmVudCBlbWl0dGVyIHRvIGxpc3RlbiB0b1xuICogQHBhcmFtIHJlc29sdmVFdmVudE5hbWUgLSBUaGUgZXZlbnQgdGhhdCB3aWxsIGNhdXNlIHRoZSBQcm9taXNlIHRvIHJlc29sdmVcbiAqIEBwYXJhbSByZWplY3RFdmVudE5hbWUgLSBUaGUgZXZlbnQgdGhhdCB3aWxsIGNhdXNlIHRoZSBQcm9taXNlIHRvIHJlamVjdFxuICogQHJldHVybiBBIFByb21pc2UgdGhhdCB3aWxsIHdpbGwgcmVzb2x2ZSBhbmQgcmVqZWN0IGFzIHNwZWNpZmllZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZXZlbnRUb1Byb21pc2U8UmVzb2x2ZVR5cGU+KFxuICAgIGVtaXR0ZXI6IEV2ZW50RW1pdHRlcixcbiAgICByZXNvbHZlRXZlbnROYW1lOiBzdHJpbmcsXG4gICAgcmVqZWN0RXZlbnROYW1lPzogc3RyaW5nXG4pOiBQcm9taXNlPFJlc29sdmVUeXBlPlxue1xuICAgIHJldHVybiBuZXcgQkJQcm9taXNlPFJlc29sdmVUeXBlPihcbiAgICAgICAgKHJlc29sdmU6IChyZXN1bHQ6IFJlc29sdmVUeXBlKSA9PiB2b2lkLCByZWplY3Q6IChlcnI6IGFueSkgPT4gdm9pZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhY2tlciA9IG5ldyBMaXN0ZW5lclRyYWNrZXIoZW1pdHRlcik7XG5cbiAgICAgICAgICAgIHRyYWNrZXIub25jZShyZXNvbHZlRXZlbnROYW1lLCAocmVzdWx0OiBSZXNvbHZlVHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRyYWNrZXIucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChyZWplY3RFdmVudE5hbWUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHJhY2tlci5vbmNlKHJlamVjdEV2ZW50TmFtZSwgKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrZXIucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbn1cblxuXG4vKipcbiAqIEFkYXB0cyBhIHN0cmVhbSB0byBhIFByb21pc2UgaW50ZXJmYWNlLlxuICogQHBhcmFtIHN0cmVhbSAtIFRoZSBzdHJlYW0gdG8gYmUgYWRhcHRlZFxuICogQHJldHVybiBBIFByb21pc2UgdGhhdCB3aWxsIGJlIHJlc29sdmVkIHdoZW4gdGhlIHN0cmVhbSBlbWl0cyB0aGUgXCJmaW5pc2hcIlxuICogZXZlbnQgYW5kIHJlamVjdHMgd2hlbiBpdCBlbWl0cyBhbiBcImVycm9yXCIgZXZlbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJlYW1Ub1Byb21pc2Uoc3RyZWFtOiBXcml0YWJsZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBldmVudFRvUHJvbWlzZShzdHJlYW0sIFwiZmluaXNoXCIsIFwiZXJyb3JcIik7XG59XG4iXX0=
