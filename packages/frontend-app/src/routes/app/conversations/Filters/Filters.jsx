import React from 'react';
import Button from './Button';

import styles from './filters.module.scss';

export default ({ filters, onFilterChange }) => (
    <div className={styles.filtersContainer}>
        <div className={styles.title}>Filter</div>
        <div className={styles.filters}>
            <Button
                color={'white'}
                selected={filters.ongoing}
                onClick={() =>
                    onFilterChange({
                        ongoing: true,
                        new: false,
                        done: false,
                    })
                }
            >
                Ongoing
            </Button>
            <Button
                color={'yellow'}
                selected={filters.new}
                onClick={() =>
                    onFilterChange({
                        ongoing: false,
                        new: true,
                        done: false,
                    })
                }
            >
                New
            </Button>
            <Button
                color={'red'}
                selected={filters.done}
                onClick={() =>
                    onFilterChange({
                        ongoing: false,
                        new: false,
                        done: true,
                    })
                }
            >
                Done
            </Button>
        </div>
    </div>
);
