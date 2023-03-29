import { prisma } from "./database.server";

export async function addExpense(data) {
  try {
    return await prisma.expense.create({
      data: {
        title: data.title,
        amount: +data.amount,
        date: new Date(data.date),
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add expenses");
  }
}

export async function getExpenses() {
  try {
    return await prisma.expense.findMany({ orderBy: { date: "desc" } });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get expenses");
  }
}

export async function getExpense(id) {
  try {
    return await prisma.expense.findFirst({ where: { id } });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get expense");
  }
}

export async function updateExpense(id, expenseData) {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update expense");
  }
}

export async function deleteExpense(id) {
  try {
    return await prisma.expense.delete({
      where: { id },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete expense");
  }
}
