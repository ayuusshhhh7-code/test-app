import React, { useState, useEffect } from 'react';
import './Counter.css';
import WalletService from './WalletService';
import WalletController from './WalletController';

// Wiring the Backend
const service = new WalletService();
const controller = new WalletController(service);

const Counter = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialization: Get initial balance
    const fetchBalance = async () => {
      setLoading(true);
      const initialBalance = await service.getBalance();
      setBalance(initialBalance);
      setLoading(false);
    };
    fetchBalance();
  }, []);

  const handleTransaction = async (type) => {
    setLoading(true);
    setError(''); // Reset error

    try {
      let result;
      if (type === 'deposit') {
        result = await controller.deposit(balance, 1);
      } else if (type === 'withdraw') {
        result = await controller.withdraw(balance, 1);
      }
      
      if (result && result.success) {
        setBalance(result.newBalance);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="counter-container">
      <div className="counter-card">
        <h1 className="counter-title">Wallet</h1>
        
        {loading ? (
          <div className="counter-display loading">Loading...</div>
        ) : (
          <div className="counter-display">${balance}</div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="counter-controls">
          <button 
            className="btn decrease" 
            onClick={() => handleTransaction('withdraw')}
            disabled={loading}
          >
            -1
          </button>
          <button 
            className="btn increase" 
            onClick={() => handleTransaction('deposit')}
            disabled={loading}
          >
            +1
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
