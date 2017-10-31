/**
 * LocalStorage for storing string values
 */
export function LocalStorage(
    target: Object, // The prototype of the class
    decoratedPropertyName: string // The name of the property
) {

    // get and set methods
    Object.defineProperty(target, decoratedPropertyName, {
        get: function () {
            return localStorage.getItem(decoratedPropertyName) || '';
        },
        set: function (newValue) {
            localStorage.setItem(decoratedPropertyName, newValue);
        }
    });
}

/**
 * LocalStorage for storing string values
 */
export function JsonLocalStorage(
    target: Object, // The prototype of the class
    decoratedPropertyName: string // The name of the property
) {

    // get and set methods
    Object.defineProperty(target, decoratedPropertyName, {
        get: function () {
            return JSON.parse(localStorage.getItem(decoratedPropertyName)) || '';
        },
        set: function (newValue) {
            localStorage.setItem(decoratedPropertyName, JSON.stringify(newValue));
        }
    });
}


/**
 * SessionStorage for storing string values
 */
export function SessionStorage(
    target: Object, // The prototype of the class
    decoratedPropertyName: string // The name of the property
) {

    // get and set methods
    Object.defineProperty(target, decoratedPropertyName, {
        get: function () {
            return sessionStorage.getItem(decoratedPropertyName) || '';
        },
        set: function (newValue) {
            sessionStorage.setItem(decoratedPropertyName, newValue);
        }
    });
}
