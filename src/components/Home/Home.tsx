/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, SetStateAction } from 'react';
import { Button, Select, Table } from 'antd';
import { Login } from '../Login/Login';

const { Option } = Select;

export const OrderBook = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [symbols, setSymbols] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState('');
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        // Fetch symbols from API when component mounts
        fetchSymbols();
    }, []);

    const fetchSymbols = async () => {
        try {
            const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
            const data = await response.json();
            const symbols = data.symbols.map((symbol: { symbol: any; }) => ({
                symbol: symbol.symbol,
                label: symbol.symbol,
            }));
            setSymbols(symbols);
        } catch (error) {
            console.error('Error fetching symbols:', error);
        }
    };

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        setLoggedIn(false);
    };

    const handleSymbolChange = (value: SetStateAction<string>) => {
        setSelectedSymbol(value);
        fetchPrices(value);
    };

    const fetchPrices = async (symbol: SetStateAction<string>) => {
        try {
            const response = await fetch(`https://api.binance.com/api/v3/trades?symbol=${symbol}`);
            const data = await response.json();
            setPrices(data);
        } catch (error) {
            console.error('Error fetching prices:', error);
        }
    };

    const columns = prices.length > 0 ? Object.keys(prices[0]).map(key => ({
        title: key,
        dataIndex: key,
        key,
    })) : [];

    return (
        <div>
            <h1>Order Book Page</h1>
            {!loggedIn ? (
                <Login onLogin={handleLogin} />
            ) : (
                <div>
                    <Button onClick={handleLogout}>Logout</Button>
                    <Select value={selectedSymbol} onChange={handleSymbolChange} style={{ width: 200, marginBottom: 16 }}>
                        <Option value="">Select Symbol</Option>
                        {symbols.map(symbol => (
                            //@ts-expect-error
                            <Option key={symbol?.symbol} value={symbol?.symbol}>{symbol.label}</Option>
                        ))}
                    </Select>
                    <Table dataSource={prices} columns={columns} />
                </div>
            )}
        </div>
    );
};

export default OrderBook;
