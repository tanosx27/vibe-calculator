// === 1. Находим все нужные элементы в HTML ===
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');
const numberButtons = document.querySelectorAll('.btn.number');
const operationButtons = document.querySelectorAll('.btn.operation');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('[data-action="clear"]');
const backspaceButton = document.querySelector('[data-action="backspace"]');
const percentageButton = document.querySelector('[data-action="percentage"]');
const engineeringButtons = document.querySelectorAll('.btn.eng');

// === 2. Переменные для хранения данных ===
let currentOperand = '0';
let previousOperand = '';
let operation = null;
let shouldResetCurrentOperand = false;

// === 3. Обновляем отображение на экране ===
function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    previousOperandElement.textContent = 
        previousOperand + (operation ? ` ${getOperationSymbol(operation)}` : '');
}

// === 4. Функция для получения символа операции ===
function getOperationSymbol(op) {
    switch(op) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '×';
        case 'divide': return '÷';
        default: return '';
    }
}

// === 5. Добавляем цифру или точку ===
function appendNumber(number) {
    if (currentOperand === '0' || shouldResetCurrentOperand) {
        currentOperand = number;
        shouldResetCurrentOperand = false;
    } else {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand += number;
    }
    updateDisplay();
}

// === 6. Выбираем операцию (+, -, ×, ÷) ===
function chooseOperation(op) {
    if (currentOperand === '') return;
    
    if (previousOperand !== '' && operation && !shouldResetCurrentOperand) {
        calculate();
    }
    
    operation = op;
    previousOperand = currentOperand;
    shouldResetCurrentOperand = true;
    updateDisplay();
}

// === 7. Выполняем вычисление ===
function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch(operation) {
        case 'add':
            computation = prev + current;
            break;
        case 'subtract':
            computation = prev - current;
            break;
        case 'multiply':
            computation = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                alert('Ошибка: деление на ноль!');
                clear();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentOperand = Math.round(computation * 10000000000) / 10000000000;
    operation = null;
    previousOperand = '';
    shouldResetCurrentOperand = true;
    updateDisplay();
}

// === 8. Очистка калькулятора (кнопка C) ===
function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

// === 9. Удаление последнего символа (Backspace) ===
function backspace() {
    if (currentOperand.length === 1 || currentOperand === '0') {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

// === 10. Процент (кнопка %) ===
function percentage() {
    if (currentOperand === '0') return;
    currentOperand = (parseFloat(currentOperand) / 100).toString();
    updateDisplay();
}

// === 11. ИНЖЕНЕРНЫЕ ФУНКЦИИ ===

// Синус (в радианах)
function sine() {
    if (currentOperand === '0') return;
    currentOperand = Math.sin(parseFloat(currentOperand)).toString();
    updateDisplay();
}

// Косинус (в радианах)
function cosine() {
    if (currentOperand === '0') return;
    currentOperand = Math.cos(parseFloat(currentOperand)).toString();
    updateDisplay();
}

// Тангенс (в радианах)
function tangent() {
    if (currentOperand === '0') return;
    currentOperand = Math.tan(parseFloat(currentOperand)).toString();
    updateDisplay();
}

// Десятичный логарифм
function logarithm() {
    if (currentOperand === '0' || parseFloat(currentOperand) <= 0) {
        alert('Ошибка: логарифм от неположительного числа!');
        return;
    }
    currentOperand = Math.log10(parseFloat(currentOperand)).toString();
    updateDisplay();
}

// Натуральный логарифм
function naturalLog() {
    if (currentOperand === '0' || parseFloat(currentOperand) <= 0) {
        alert('Ошибка: логарифм от неположительного числа!');
        return;
    }
    currentOperand = Math.log(parseFloat(currentOperand)).toString();
    updateDisplay();
}

// Квадратный корень
function squareRoot() {
    if (currentOperand === '0' || parseFloat(currentOperand) < 0) {
        alert('Ошибка: корень из отрицательного числа!');
        return;
    }
    currentOperand = Math.sqrt(parseFloat(currentOperand)).toString();
    updateDisplay();
}

// Квадрат числа
function square() {
    if (currentOperand === '0') return;
    const num = parseFloat(currentOperand);
    currentOperand = (num * num).toString();
    updateDisplay();
}

// Число Пи
function pi() {
    currentOperand = Math.PI.toString();
    updateDisplay();
}

// Число e
function euler() {
    currentOperand = Math.E.toString();
    updateDisplay();
}

// Смена знака
function plusMinus() {
    if (currentOperand === '0') return;
    currentOperand = (parseFloat(currentOperand) * -1).toString();
    updateDisplay();
}

// Обратное число
function reciprocal() {
    if (currentOperand === '0') {
        alert('Ошибка: деление на ноль!');
        return;
    }
    currentOperand = (1 / parseFloat(currentOperand)).toString();
    updateDisplay();
}

// Факториал (упрощённая версия)
function factorial() {
    if (currentOperand === '0') {
        currentOperand = '1';
        updateDisplay();
        return;
    }
    
    const num = parseInt(parseFloat(currentOperand));
    if (num < 0 || num > 100) {
        alert('Факториал определён для целых чисел от 0 до 100');
        return;
    }
    
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    currentOperand = result.toString();
    updateDisplay();
}

// === 12. Обработка инженерных кнопок ===
function handleEngineeringAction(action) {
    switch(action) {
        case 'sin': sine(); break;
        case 'cos': cosine(); break;
        case 'tan': tangent(); break;
        case 'log': logarithm(); break;
        case 'ln': naturalLog(); break;
        case 'sqrt': squareRoot(); break;
        case 'square': square(); break;
        case 'power': 
            // Для xʸ нужно сохранить текущее число и запросить степень
            previousOperand = currentOperand;
            operation = 'power';
            shouldResetCurrentOperand = true;
            updateDisplay();
            break;
        case 'pi': pi(); break;
        case 'e': euler(); break;
        case 'plusminus': plusMinus(); break;
        case 'open-paren': appendNumber('('); break;
        case 'close-paren': appendNumber(')'); break;
        case 'factorial': factorial(); break;
        case 'reciprocal': reciprocal(); break;
    }
}

// === 13. ИНЖЕНЕРНЫЙ ПЕРЕКЛЮЧАТЕЛЬ ===
const engineeringToggle = document.getElementById('engineering-toggle');
const calculatorElement = document.querySelector('.calculator');

if (engineeringToggle) {
    engineeringToggle.addEventListener('change', function() {
        if (this.checked) {
            calculatorElement.classList.add('engineering-mode');
            console.log('🔬 Включён инженерный режим');
        } else {
            calculatorElement.classList.remove('engineering-mode');
            console.log('🧮 Включён обычный режим');
        }
    });
}

// === 14. Добавляем обработчики событий ===

// Цифровые кнопки
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.getAttribute('data-number'));
    });
});

// Операции
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
            chooseOperation(action);
        }
    });
});

// Инженерные кнопки
engineeringButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        handleEngineeringAction(action);
    });
});

// Специальные кнопки
clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspace);
percentageButton.addEventListener('click', percentage);
equalsButton.addEventListener('click', calculate);

// === 15. Обработка клавиатуры ===
document.addEventListener('keydown', event => {
    const key = event.key;
    
    // Цифры и точка
    if ((key >= '0' && key <= '9') || key === '.') {
        appendNumber(key);
    }
    
    // Операции
    if (key === '+') chooseOperation('add');
    if (key === '-') chooseOperation('subtract');
    if (key === '*') chooseOperation('multiply');
    if (key === '/') {
        event.preventDefault();
        chooseOperation('divide');
    }
    
    // Специальные клавиши
    if (key === 'Enter' || key === '=') calculate();
    if (key === 'Escape') clear();
    if (key === 'Backspace') backspace();
    if (key === '%') percentage();
    
    // Инженерные функции (частичная поддержка)
    if (key === 's' || key === 'S') sine();
    if (key === 'c' || key === 'C') cosine();
    if (key === 't' || key === 'T') tangent();
    if (key === 'q' || key === 'Q') squareRoot();
});

// === 16. Инициализация ===
updateDisplay();

// === 17. Консоль-приветствие ===
console.log(`
╔══════════════════════════════════════════════╗
║       🎮 ИНЖЕНЕРНЫЙ КАЛЬКУЛЯТОР АКТИВИРОВАН! ║
║   🌓 Режимы: Обычный ↔ Инженерный            ║
║   🧮 Основные операции: +, -, ×, ÷           ║
║   🔬 Инженерные: sin, cos, tan, log, √, x²  ║
║   📅 Версия: 2026                            ║
║                                              ║
║   Попробуйте: Включите инженерный режим →    ║
║   π × 2 = или sin(0.5) =                     ║
╚══════════════════════════════════════════════╝
`);
