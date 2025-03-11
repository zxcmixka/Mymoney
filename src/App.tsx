import React, { useState, useEffect } from 'react';
import styles from './AppStyles.module.css';


const App = () => {
  const [cash, setCash] = useState(0);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedCash = localStorage.getItem('cash');
    if (savedCash) {
      setCash(parseFloat(savedCash));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cash', String(cash));
  }, [cash]);
  

  const handleAdd = () => {
    const amount = parseFloat(inputValue);
    if (!isNaN(amount) && amount > 0) {
      setCash(prev => prev + amount);
      setInputValue('');
    }
  };

  return (
    <div className={styles.win}>
      <h2>Траты за месяц</h2>
      <p>Всего потрачено: <span>{cash} ₽</span></p>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите сумму"
        />
        <button 
          onClick={handleAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default App; 
