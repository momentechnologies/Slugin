import React from 'react';

import LogoSvg from './LogoSvg';

const Logo = ({ color, size = '100%' }) => {
    return (
        <div style={{ height: size }}>
            <LogoSvg color={color} />
        </div>
    );
};

export default Logo;
