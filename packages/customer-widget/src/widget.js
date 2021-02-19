import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class Slugin {
    doRenderHelper(clientInfo = null) {
        const component = <App clientInfo={clientInfo} />;

        const el = document.createElement('div');
        el.setAttribute('class', 'cleanslate');
        document.body.appendChild(el);
        ReactDOM.render(component, el);
        Slugin.el = el;
    }

    doRender(clientInfo) {
        if (document.readyState === 'complete') {
            this.doRenderHelper(clientInfo);
        } else {
            window.addEventListener('load', () => {
                this.doRenderHelper(clientInfo);
            });
        }
    }

    render() {
        this.doRender();
    }

    setUserInfo(clientInfo) {
        this.doRender(clientInfo);
    }
}

export default new Slugin();
