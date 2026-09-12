Calculator.jsx


import { useState } from 'react'

function Calculator() {
  // 保存する値は空文字。入力の先頭に不要な0が残るのを防ぎます。
  const [display, setDisplay] = useState('')

  function handleClick(btn) {
    if (btn === 'C') {
      setDisplay('')
    } else if (btn === '=') {
      try {
        // 次の入力を文字として連結できるよう、結果を文字列に戻します。
        setDisplay(String(calculate(display)))
      } 
      catch {
        setDisplay('エラー')
      }
    } else {
      setDisplay((previousDisplay) => previousDisplay + btn)
    }
  }

  function calculate(expression) {
    // 数字のまとまり・演算子・数字のまとまり、の3つに分けます。
    const validExpression = /^(\d+)([+\-*/])(\d+)$/
    const match = expression.match(validExpression)

    if (!match) {
      throw new Error('無効な式です。')
    } 
    const num1 = Number(match[1])
    const operator = match[2]
    const num2 = Number(match[3])
    if (!Number.isSafeInteger(num1) || !Number.isSafeInteger(num2)) {
      throw new Error('数値が大きすぎます。')
    }
    let result
    switch (operator) {
      case '+':
        result = num1 + num2
        break
      case '-':
        result = num1 - num2
        break
      case '*':
        result = num1 * num2
        break
      case '/':
        if (num2 === 0) {
          throw new Error('0では割れません。')
        }
        result = num1 / num2
        break
      default:
        throw new Error('無効な演算子です。')
    }

    if (!Number.isFinite(result) || Math.abs(result) > Number.MAX_SAFE_INTEGER) {
      throw new Error('計算結果が大きすぎます。')
    }

    return result
  }


  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', 'C', '=', '+',
  ]

  return (
    <main className="calculator" aria-labelledby="calculator-title">
      <p className="eyebrow">REACT PRACTICE</p>
      <h2 id="calculator-title">電卓アプリ</h2>

      <div
        className={`calculator-container${display === 'エラー' ? ' is-error' : ''}`}
        role="status"
        aria-label="入力内容と計算結果"
        aria-live="polite"
        aria-atomic="true"
      >
        {display || '0'}
      </div>

      <div className="button-grid">
        {buttons.map((btn) => (
          <button
            key={btn}
            type="button"
            className={btn === '=' ? 'equals' : btn === 'C' ? 'clear' : '+-*/'.includes(btn) ? 'operator' : ''}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </main>
  )
}

export default Calculator

