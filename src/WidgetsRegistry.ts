import { ComponentClass, FunctionComponent } from 'react';
import forOwn from 'lodash/forOwn';
import { Subscription } from './store/api/types';

const hasOwn = Object.prototype.hasOwnProperty;

interface GetApiRequest {
    getApiRequest: (params: any) => Subscription;
}

// eslint-disable-next-line max-len
type RegistryPureComponent = FunctionComponent<any> & GetApiRequest | ComponentClass<any> & GetApiRequest;

export interface Registry {
    [key: string]: {
        [key: string]: RegistryPureComponent;
    };
}

export interface WidgetsRegistryType {
    addExtensions: (
        extensions: string,
    ) => WidgetsRegistryType;
    addExtension: (
        extension: string,
        components: {
            [key: string]: RegistryPureComponent;
        },
    ) => WidgetsRegistryType;
    add: (
        extension: string,
        widget: string,
        component: RegistryPureComponent,
    ) => WidgetsRegistryType;
    has: (
        extension: string,
        widget: string,
    ) => boolean;
    getComponent: (
        extension: string,
        widget: string,
    ) => RegistryPureComponent;
    widgetsCount: () => number;
    list: () => Registry;
}

const registry: Registry = {};

const WidgetsRegistry = {
    /**
     * Register multiple extensions components.
     *
     * @param {Object} extensions
     */
    addExtensions(extensions: any) {
        forOwn(extensions, (components, extensionId) => {
            WidgetsRegistry.addExtension(extensionId, components);
        });

        return WidgetsRegistry;
    },

    /**
     * Register an extension components.
     *
     * @param {String} extension
     * @param {Object} components
     * @returns {WidgetsRegistry}
     */
    addExtension(extension: string, components: { [key: string]: RegistryPureComponent }) {
        forOwn(components, (component: RegistryPureComponent, widget: string): void => {
            WidgetsRegistry.add(extension, widget, component);
        });

        return WidgetsRegistry;
    },

    /**
     *
     * @param {string}   extension
     * @param {string}   widget
     * @param {Function} component
     * @returns {WidgetsRegistry}
     */
    add(extension: string, widget: string, component: RegistryPureComponent) {
        if (!hasOwn.call(registry, extension)) {
            registry[extension] = {};
        }
        registry[extension][widget] = component;

        return WidgetsRegistry;
    },

    /**
     *
     * @param {string} extension
     * @param {string} widget
     * @return {boolean}
     */
    has(extension: string, widget: string) {
        return hasOwn.call(registry, extension) && hasOwn.call(registry[extension], widget);
    },

    /**
     * @param {string} extension
     * @param {string} widget
     * @return {Function}
     */
    getComponent(extension: string, widget: string): RegistryPureComponent {
        if (!WidgetsRegistry.has(extension, widget)) {
            throw new Error(`No widget "${widget}" defined for extension "${extension}"`);
        }

        return registry[extension][widget];
    },

    widgetsCount() {
        let count = 0;
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const ext in registry) {
            count += Object.keys(registry[ext]).length;
        }

        return count;
    },

    /**
     * @return {Object}
     */
    list() {
        return registry;
    },
};

export default WidgetsRegistry;
