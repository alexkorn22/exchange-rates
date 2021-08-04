import React, {useEffect, useState} from 'react';
import {Form, Col, Row} from 'react-bootstrap';

const FormExchange = () => {
    const [uah, setUah] = useState(0);
    const [usd, setUsd] = useState(0);
    const [courseSale, setCourseSale] = useState(25);
    const [courseBuy, setCourseBuy] = useState(30);

    useEffect(() => {
        fetch('https://api.monobank.ua/bank/currency')
            .catch(res => console.log('Error fetch'))
            .then(res => res.json())
            .then(res => {
                const data = res.find(item => item.currencyCodeA === 840 && item.currencyCodeB === 980);
                setCourseSale(data.rateBuy);
                setCourseBuy(data.rateSell);
            });

    }, []);

    const onChangeUah = (e) => {
        if (!e.currentTarget.value) {
            setUsd(0);
            setUah(0);
            return;
        }
        let value = +e.currentTarget.value;
        setUah(value);
        setUsd((value / courseBuy).toFixed(2));
    }
    const onChangeUsd = (e) => {
        if (!e.currentTarget.value) {
            setUsd(0);
            setUah(0);
            return;
        }
        let value = +e.currentTarget.value;
        setUsd(value);
        setUah((value * courseSale).toFixed(2));
    }
    return <>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1">
                UAH
            </Form.Label>
            <Col sm="3">
                <Form.Control type="text" placeholder="UAH" value={uah} onChange={onChangeUah}/>
            </Col>
            <Form.Label column sm="1">
                USD
            </Form.Label>
            <Col sm="3">
                <Form.Control type="text" placeholder="USD" value={usd} onChange={onChangeUsd}/>
            </Col>
        </Form.Group>
    </>;
}

export default FormExchange;