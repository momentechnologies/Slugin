import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export default ({ children, ...props }) => {
    const [contentRef, setContentRef] = useState(null);
    const mountNode = contentRef && contentRef.contentWindow.document.body;

    if (mountNode) {
        contentRef.contentWindow.document.body.style =
            'margin: 0;overflow: hidden;';
        if (
            contentRef.contentWindow.document.head.getElementsByTagName('style')
                .length === 0
        ) {
            if (window.sluginFiles) {
                window.sluginFiles.css.forEach(file => {
                    const s = document.createElement('link');
                    s.setAttribute('href', file);
                    s.setAttribute('rel', 'stylesheet');

                    contentRef.contentWindow.document.head.appendChild(s);
                });
            } else {
                const hs = document.head.getElementsByTagName('style');

                for (let i = 0, max = hs.length; i < max; i++) {
                    contentRef.contentWindow.document.head.appendChild(
                        hs[i].cloneNode(true)
                    );
                }
            }
        }
    }

    return (
        <iframe
            {...props}
            ref={setContentRef}
            frameBorder="0"
            title={props.title}
        >
            {mountNode &&
                createPortal(React.Children.only(children), mountNode)}
        </iframe>
    );
};
