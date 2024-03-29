import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";

import Modal from "~/components/util/Modal";
import { updateExpense, deleteExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function UpdateExpensePage() {
  const navigate = useNavigate();

  const handleModalClose = () => {
    navigate("/expenses");
  };

  return (
    <Modal onClose={handleModalClose}>
      <ExpenseForm />
    </Modal>
  );
}

export async function action({ params, request }) {
  const expenseId = params.id;

  if (request.method === "PATCH") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    } catch (err) {
      return err;
    }

    await updateExpense(expenseId, expenseData);
    return redirect("/expenses");
  } else if (request.method === "DELETE") {
    await deleteExpense(expenseId);
    return { deletedId: expenseId };
  }
}
