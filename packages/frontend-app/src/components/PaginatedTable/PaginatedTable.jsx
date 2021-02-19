import React from 'react';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Loader from '../Loader';

class PaginatedTable extends React.Component {
    componentDidMount() {
        this.props.dispatch(
            this.props.fetcher({
                limit: this.props.limit,
                offset: this.props.offset,
            })
        );
    }

    componentDidUpdate() {
        this.props.dispatch(
            this.props.fetcher({
                limit: this.props.limit,
                offset: this.props.offset,
            })
        );
    }

    getContent() {
        if (this.props.meta.loading) {
            return <Loader />;
        }

        if (this.props.meta.error) {
            return <span>error</span>;
        }

        return this.props.children(this.props.entities);
    }

    getPageCount() {
        if (this.props.count === null || this.props.count === 0) {
            return 1;
        }

        return Math.ceil(this.props.count / this.props.limit);
    }

    render() {
        if (this.props.meta && this.props.meta.error) {
            return <span>error</span>;
        }

        if (this.props.count === null) {
            return <Loader />;
        }

        return (
            <div>
                {this.getContent()}
                <div>
                    <Pagination aria-label="Page navigation example">
                        <PaginationItem disabled={this.props.page === 0}>
                            <PaginationLink
                                previous
                                onClick={() =>
                                    this.props.onPageChange(this.props.page - 1)
                                }
                            />
                        </PaginationItem>
                        {[...Array(this.getPageCount())].map((y, index) => (
                            <PaginationItem
                                active={this.props.page === index}
                                key={index}
                            >
                                <PaginationLink
                                    onClick={() =>
                                        this.props.onPageChange(index)
                                    }
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem
                            disabled={
                                this.props.page + 1 === this.getPageCount()
                            }
                        >
                            <PaginationLink
                                next
                                onClick={() =>
                                    this.props.onPageChange(this.props.page + 1)
                                }
                            />
                        </PaginationItem>
                    </Pagination>
                </div>
            </div>
        );
    }
}

export default connect((state, ownProps) => ({
    entities: ownProps.selector(state, {
        limit: ownProps.limit,
        offset: ownProps.offset,
    }),
    meta: ownProps.metaSelector(state, {
        limit: ownProps.limit,
        offset: ownProps.offset,
    }),
    count: ownProps.countSelector(state, {
        limit: ownProps.limit,
        offset: ownProps.offset,
    }),
}))(PaginatedTable);
