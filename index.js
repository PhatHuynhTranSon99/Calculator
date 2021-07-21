//UI elements
const rows = document.querySelectorAll(".row");
const display = document.querySelector(".display");

//Events
rows.forEach(function (row) {
    row.addEventListener("click", function(event) {
        const key = event.target.id;
        calculatorModel.onInput(key);
    });
});

//UI functions
function displayNumber(number) {
    display.innerHTML = String(number);
}

function clearScreen() {
    display.innerHTML = "";
}

//Model
const calculatorModel = {
    firstOperand: 0,
    secondOperand: 0,
    operator: null,
    hasOperatorBeenSelected: false,
    isOperatorKey(key) {
        return ["divide", "minus", "mul", "add"].includes(key);
    },
    isNumericKey(key) {
        return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(key);
    },
    isDeleteAllKey(key) {
        return key === "delete-all";
    },
    isBackArrowKey(key) {
        return key === "left-arrow";
    },
    isEqualKey(key) {
        return key === "equal";
    },
    onInput(key) {
        if (this.isNumericKey(key)) {
            this.handleNumeric(key);
        } else if (this.isOperatorKey(key)) {
            this.handleOperator(key);
        } else if (this.isDeleteAllKey(key)) {
            this.handleDeleteAll();
        } else if (this.isBackArrowKey(key)) {
            this.handleBackArrow();
        } else if (this.isEqualKey(key)) {
            this.handleEqual();
        }
    },
    handleNumeric(number) {
        if (!this.hasOperatorBeenSelected) {
            this.firstOperand = this.firstOperand * 10 + parseInt(number);
            displayNumber(this.firstOperand);
        } else {
            this.secondOperand = this.secondOperand * 10 + parseInt(number);
            displayNumber(this.secondOperand);
        }
    },
    handleOperator(operator) {
        this.operator = operator;
        this.hasOperatorBeenSelected = true;
        displayNumber(this.secondOperand);
    },
    handleDeleteAll() {
        this.reset(0);
    },
    handleBackArrow() {
        if (!this.hasOperatorBeenSelected) {
            //Modify first operand
            this.firstOperand = this.performBackArrow(this.firstOperand);
            displayNumber(this.firstOperand);
        } else {
            //Modify second operand
            this.secondOperand = this.performBackArrow(this.secondOperand);
            displayNumber(this.secondOperand);
        }
    },
    performBackArrow(value) {
        return (value >= 0 && value <= 9) ? 0 : Math.floor(value / 10);
    },
    handleEqual() {
        //Check if operator has been chosen
        if (this.hasOperatorBeenSelected) {
            const result = this.calculate();
            this.reset(result);
        }
    },
    calculate() {
        switch (this.operator) {
            case "add":
                return this.firstOperand + this.secondOperand;
            case "minus":
                return this.firstOperand - this.secondOperand;
            case "mul":
                return this.firstOperand * this.secondOperand;
            case "divide":
                return this.firstOperand / this.secondOperand;
        }
    },
    reset(firstOperand) {
        this.firstOperand = firstOperand;
        displayNumber(this.firstOperand);
        this.secondOperand = 0;
        this.operator = null;
        this.hasOperatorBeenSelected = false;
    }
}


