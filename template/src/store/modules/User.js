import * as applicationSettings from "tns-core-modules/application-settings";

export default {
    namespaced: true,
    state: {
        apiToken: applicationSettings.getString('apiToken'),
    },
    mutations: {
        updateToken(state) {
            state.apiToken = applicationSettings.getString('apiToken');
        },
    },
    actions: {
        saveToken(context, apiToken) {
            applicationSettings.setString('apiToken', apiToken);
            context.commit('updateToken');
        },
        logout(context) {
            applicationSettings.setString('apiToken', '');

            context.commit('updateToken');
        }
    },
    getters: {
        isLoggedIn(state) {
            if (applicationSettings.hasKey('apiToken')) {
                if (state.apiToken.length > 0) {
                    return true;
                }
            }

            return false;
        },
        getApiToken(state) {
            return state.apiToken;
        },
        getApiHeaders(state, getters) {
            var headers = {
                "Content-Type": "application/json",
            };

            if (getters.isLoggedIn) {
                headers['APITOKEN'] = getters.getApiToken;
            }

            return headers;
        }
    }
}