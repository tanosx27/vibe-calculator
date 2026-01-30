// === 1. Находим все нужные элементы в HTML ===
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');
const numberButtons = document.querySelectorAll('.btn.number');
const operationButtons = document.querySelectorAll('.btn.operation');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('[data-action="clear"]');
const backspaceButton = document.querySelector('[data-action="backspace"]');
const percentageButton = document.querySelector('[data-action="percentage"]');

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
        // Проверяем, чтобы точка не добавлялась больше одного раза
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand += number;
    }
    updateDisplay();
}

// === 6. Выбираем операцию (+, -, ×, ÷) ===
function chooseOperation(op) {
    if (currentOperand === '') return;
    
    // Если уже есть предыдущий операнд и операция, вычисляем сначала
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
    
    // Округляем до 10 знаков после запятой
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

// === 11. Добавляем обработчики событий для цифровых кнопок ===
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.getAttribute('data-number'));
    });
});

// === 12. Добавляем обработчики для операций ===
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
            chooseOperation(action);
        }
    });
});

// === 13. Обработчики для специальных кнопок ===
clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspace);
percentageButton.addEventListener('click', percentage);
equalsButton.addEventListener('click', calculate);

// === 14. Обработка клавиатуры ===
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
        event.preventDefault(); // Блокируем стандартное поведение
        chooseOperation('divide');
    }
    
    // Специальные клавиши
    if (key === 'Enter' || key === '=') calculate();
    if (key === 'Escape') clear();
    if (key === 'Backspace') backspace();
    if (key === '%') percentage();
});

// === 15. Инициализация (первый запуск) ===
updateDisplay();

// === 16. Переключатель темы ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Проверяем сохранённую тему в localStorage
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-theme');
    themeToggle.checked = true;
}

// Обработчик переключения
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        console.log('🌞 Переключено на светлую тему!');
    } else {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        console.log('🌙 Переключено на тёмную тему!');
    }
});

// === 17. Консоль-приветствие ===
console.log(`
╔══════════════════════════════════════╗
║   🎮 Калькулятор полностью готов!    ║
║   🌓 Теперь с переключателем темы!   ║
║   Баг с операциями исправлен ✓       ║
║   Сохранение темы в браузере ✓       ║
║                                       ║
║   Попробуйте: 123 + 456 =            ║
║   И переключите тему! →              ║
╚══════════════════════════════════════╝
`);