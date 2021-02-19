import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../Loader/index';

import { get } from '../../stores/product/actions';
import {
    selectProducts,
    selectProductsMeta,
} from '../../stores/product/selectors';
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Col,
} from 'reactstrap';

class Products extends React.Component {
    componentDidMount() {
        this.props.get();
    }

    render() {
        if (this.props.meta.loading) {
            return <Loader />;
        }

        return (
            <React.Fragment>
                {this.props.products.map(p => (
                    <Col key={p.id} md={4}>
                        <Card>
                            <CardImg
                                top
                                width="100%"
                                src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                                alt="Card image cap"
                            />
                            <CardBody>
                                <CardTitle>{p.name}</CardTitle>
                                <CardText>{p.description}</CardText>
                                <Button tag={Link} to={`/products/${p.id}`}>
                                    Les mer
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </React.Fragment>
        );
    }
}

export default connect(
    state => ({
        products: selectProducts(state),
        meta: selectProductsMeta(state),
    }),
    { get }
)(Products);
