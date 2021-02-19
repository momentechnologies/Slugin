import React from 'react';
import ConversationModal from './components/ConversationModal';
import Badge from './components/Badge';
import NewMessageModal from './components/NewMessageModal';

export default class Root extends React.Component {
    state = {
        isMobile: window.innerWidth <= 500,
        windowHasFocus: true,
    };
    currentPath = window.location.pathname;

    getTheme = () => {
        const defaultTheme = {
            color: 'orange',
        };

        if (!this.props.organization) {
            return defaultTheme;
        }

        const themeColorSetting = this.props.organization.settings.find(
            setting => setting.name === 'themeColor'
        );

        if (!themeColorSetting) {
            return defaultTheme;
        }

        return {
            color: themeColorSetting.value,
        };
    };

    onVisibiltyChange = windowHasFocus => {
        this.setState({
            windowHasFocus,
        });
    };

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                isMobile: window.innerWidth <= 500,
            });
        });

        this.props.newPageView(this.currentPath);

        setInterval(() => {
            if (this.currentPath !== window.location.pathname) {
                this.currentPath = window.location.pathname;
                this.props.newPageView(this.currentPath);
            }
        }, 1000);

        let hidden = 'hidden';

        // Standards:
        if (hidden in document)
            document.addEventListener('visibilitychange', onchange);
        else if ((hidden = 'mozHidden') in document)
            document.addEventListener('mozvisibilitychange', onchange);
        else if ((hidden = 'webkitHidden') in document)
            document.addEventListener('webkitvisibilitychange', onchange);
        else if ((hidden = 'msHidden') in document)
            document.addEventListener('msvisibilitychange', onchange);

        const onVisibiltyChange = this.onVisibiltyChange;
        function onchange(evt) {
            var v = 'visible',
                h = 'hidden',
                evtMap = {
                    focus: v,
                    focusin: v,
                    pageshow: v,
                    blur: h,
                    focusout: h,
                    pagehide: h,
                };

            evt = evt || window.event;
            let visibile;
            if (evt.type in evtMap) {
                visibile = evtMap[evt.type] === 'visible';
            } else {
                visibile = !this[hidden];
            }

            onVisibiltyChange(visibile);
        }

        // set the initial state (but only if browser supports the Page Visibility API)
        if (document[hidden] !== undefined) {
            onchange({ type: document[hidden] ? 'blur' : 'focus' });
        }
    }

    render() {
        return (
            <div>
                {this.props.isModalOpen ? (
                    <ConversationModal
                        organization={this.props.organization}
                        clientInfo={this.props.clientInfo}
                        theme={this.getTheme()}
                        organizationKey={
                            this.props.organization.organizationKey
                        }
                        fullWindow={this.state.isMobile}
                        onClose={() => {
                            this.props.setIsModalOpen(false);
                            this.props.closeMessage();
                        }}
                        token={this.props.token}
                        onNewUserInfo={this.props.onNewUserInfo}
                        windowHasFocus={this.state.windowHasFocus}
                    />
                ) : this.props.newMessage ? (
                    <NewMessageModal
                        message={this.props.newMessage}
                        onClose={this.props.closeMessage}
                    />
                ) : null}
                <Badge
                    theme={this.getTheme()}
                    onClick={() => {
                        this.props.setIsModalOpen(!this.props.isModalOpen);
                        this.props.closeMessage();
                    }}
                    isOpen={this.props.isModalOpen}
                    fullWindow={this.state.isMobile}
                    currentHeight={this.state.currentHeight}
                />
            </div>
        );
    }
}
