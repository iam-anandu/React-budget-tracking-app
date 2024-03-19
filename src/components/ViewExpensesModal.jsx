import { Button, Modal, ModalBody, ModalHeader, ModalTitle, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {

    const { budgets, getBudgetExpenses, deleteBudget, deleteExpense } = useBudgets();

    const expenses = getBudgetExpenses(budgetId)

    const budget = (UNCATEGORIZED_BUDGET_ID === budgetId)
        ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
        : budgets.find(b => b.id === budgetId)


    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button onClick={() => {
                                deleteBudget(budget);
                                handleClose();
                            }} variant="outline-danger">
                                Delete
                            </Button>
                        )}
                    </Stack>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Stack direction="vertical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">
                                {expense.description}
                            </div>
                            <div className="fs-5">
                                {currencyFormatter.format(expense.amount)}
                            </div>
                            <Button variant="outline-danger" size="sm" onClick={() => deleteExpense(expense)}>
                                &times;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </ModalBody>
        </Modal>
    )
}