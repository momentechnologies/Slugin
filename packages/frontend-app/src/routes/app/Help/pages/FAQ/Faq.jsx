import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

const faqs = [
    {
        question: 'How much does your service cost?',
        answer: 'It is completely free!',
    },
    {
        question: 'What is your service?',
        answer: (
            <React.Fragment>
                <p>
                    We deliver live chat for your website. Have you ever seen
                    the icon in the bottom right corner of a website? This is
                    what we deliver. We want to make it affordable to have a
                    chat service for your website.
                </p>
                <p>
                    You add an html snippet to your index.html file your website
                    visitors will be able to communicate with you.
                </p>
            </React.Fragment>
        ),
    },
];

export default () => (
    <React.Fragment>
        {faqs.map((faq, index) => (
            <Card key={index} className="mb-2">
                <CardHeader>{faq.question}</CardHeader>
                <CardBody>{faq.answer}</CardBody>
            </Card>
        ))}
    </React.Fragment>
);
