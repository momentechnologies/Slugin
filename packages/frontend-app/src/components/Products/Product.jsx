import React from 'react';
import { connect } from 'react-redux';
import {
    Col,
    Container,
    Row,
    Alert,
    Card,
    CardTitle,
    Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import Loader from '../Loader';

import { getOneIfNeeded } from '../../stores/product/actions';
import {
    selectProductById,
    selectProductByIdMeta,
} from '../../stores/product/selectors';

class Products extends React.Component {
    componentDidMount() {
        this.props.getOneIfNeeded(this.props.productId);
    }

    componentDidUpdate() {
        this.props.getOneIfNeeded(this.props.productId);
    }

    render() {
        if (!this.props.product) {
            if (this.props.meta.loading) {
                return <Loader />;
            }

            if (this.props.meta.error) {
                return <Alert color="danger">Noe skjedde</Alert>;
            }
        }

        return (
            <Container>
                <Row>
                    <Col md={{ size: 8, offset: 2 }}>
                        <img
                            src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                            alt={this.props.product.name}
                            style={{ width: '100%' }}
                        />
                        <h2 className="mt-4 text-center">
                            {this.props.product.name}
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Card body>
                            <CardTitle>Leverandørinformasjon</CardTitle>
                            <div className="mb-3">
                                <strong>Navn: </strong>
                                {this.props.product.supplier.name}
                            </div>
                            <Button
                                tag={Link}
                                to={`/suppliers/${
                                    this.props.product.supplier.id
                                }`}
                            >
                                Les mer
                            </Button>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <p className="mt-4">{this.props.product.description}</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        product: selectProductById(state, ownProps.productId),
        meta: selectProductByIdMeta(state, ownProps.productId),
    }),
    { getOneIfNeeded }
)(Products);
