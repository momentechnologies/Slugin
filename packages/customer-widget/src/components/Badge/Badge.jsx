import React from 'react';
import cn from 'classnames';
import Logo from './Logo';
import IFrame from '../IFrame';
import styles from './badget.module.css';

export default ({ onClick, theme, isOpen, fullWindow }) => {
    const fontColor = 'white';
    return (
        <IFrame
            title="badge"
            style={{
                position: 'fixed',
                zIndex: 2147483000,
                ...(fullWindow && isOpen
                    ? {
                          display: 'none',
                      }
                    : {
                          bottom: '15px',
                          right: '15px',
                          width: '60px',
                          height: '60px',
                      }),
            }}
        >
            <div
                className={cn(styles.badge, {
                    [styles.hide]: fullWindow && isOpen,
                })}
                style={{ backgroundColor: theme.color }}
                onClick={onClick}
            >
                {isOpen ? (
                    <span className={styles.close} style={{ color: fontColor }}>
                        &times;
                    </span>
                ) : (
                    <div className={styles.logo}>
                        {isOpen ? (
                            <span
                                className={styles.close}
                                style={{ color: fontColor }}
                            >
                                &times;
                            </span>
                        ) : (
                            <Logo color={fontColor} />
                        )}
                    </div>
                )}
            </div>
        </IFrame>
    );
};
