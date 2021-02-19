import React from 'react';

export default ({ color = '#FFD02C' }) => (
    <svg
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: '100%', width: '100%' }}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.5 25C42.5 34.665 34.665 42.5 25 42.5C15.335 42.5 7.5 34.665 7.5 25C7.5 15.335 15.335 7.5 25 7.5C34.665 7.5 42.5 15.335 42.5 25ZM37.592 46.602C33.8941 48.7621 29.5916 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 30.0753 48.4876 34.7973 45.889 38.7401C47.7434 39.7608 49 41.7336 49 44C49 47.3137 46.3137 50 43 50C40.6186 50 38.5612 48.6126 37.592 46.602Z"
            fill={color}
        />
        <circle cx="17.5" cy="24.5" r="5.5" fill={color} />
        <circle cx="32.5" cy="24.5" r="5.5" fill={color} />
    </svg>
);
