import React, { useState, useEffect } from 'react';
import styles from './AppStyles.module.css';

const App = () => {
  const [cash, setCash] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [totalSpent, setTotalSpent] = useState(0); 


  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7); 
    setSelectedMonth(currentMonth);

    const savedCash = localStorage.getItem(`cash_${currentMonth}`);
    if (savedCash) {
      setCash(parseFloat(savedCash));
    }

    updateTotalSpent(); 
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      localStorage.setItem(`cash_${selectedMonth}`, String(cash));
      updateTotalSpent(); 
    }
  }, [cash, selectedMonth]);

  const updateTotalSpent = () => {
    let total = 0;
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('cash_')) {
        total += parseFloat(localStorage.getItem(key) || '0');
      }
    });
    setTotalSpent(total);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);

    const savedCash = localStorage.getItem(`cash_${newMonth}`);
    setCash(savedCash ? parseFloat(savedCash) : 0);
  };

  const handleAdd = () => {
    const amount = parseFloat(inputValue);
    if (!isNaN(amount) && amount > 0) {
      setCash(prev => prev + amount);
      setInputValue('');
    }
  };

  const handleReduce = () => {
    const amount = parseFloat(inputValue);
    if (!isNaN(amount) && amount > 0) {
      setCash(prev => prev - amount);
      setInputValue('');
    }
  };

  const handleClear = () => {
    setCash(0);
    setInputValue('');
    localStorage.setItem(`cash_${selectedMonth}`, '0');
    updateTotalSpent();
  };

  return (
    <div className={styles.win}>
      <h2>Траты за месяц</h2>
      <input
        type="month"
        value={selectedMonth}
        onChange={handleMonthChange}
        className={styles.monthPicker}
      />

      <div>
        <p>В выбраном месяце потрачено: <span>{cash} ₽</span></p>
        <p className={styles.totalSpent}>Общая сумма депов: <strong>{totalSpent} ₽</strong></p>

        <input
          className={styles.input}
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите сумму"
        />
        <button className={styles.button} onClick={handleAdd}>+</button>
        <button className={styles.button} onClick={handleReduce}>-</button>
        <button className={styles.buttonNull} onClick={handleClear}>clear</button>
      </div>
    </div>
  );
};

export default App;
