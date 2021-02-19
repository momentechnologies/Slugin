import React from 'react';

import PaginatedTable from './PaginatedTable';

class PaginatedTableContainer extends React.Component {
    state = { page: 0, limit: 10 };

    render() {
        return (
            <div className="mt-3">
                <PaginatedTable
                    selector={this.props.selector}
                    metaSelector={this.props.metaSelector}
                    countSelector={this.props.countSelector}
                    fetcher={this.props.fetcher}
                    limit={this.state.limit}
                    offset={this.state.limit * this.state.page}
                    page={this.state.page}
                    children={this.props.children}
                    onPageChange={page => this.setState({ page })}
                />
            </div>
        );
    }
}

export default PaginatedTableContainer;
