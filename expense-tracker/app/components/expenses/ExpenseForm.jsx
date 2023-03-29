import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const validationErrors = useActionData();
  const { id } = useParams();
  const matches = useMatches();
  const expenseData = matches
    .find((match) => match.id === "routes/__app/expenses")
    ?.data?.find((expense) => expense.id === id);
  console.log(matches, "matches");

  const navigation = useNavigation();

  const isSubmitting = navigation.state !== "idle";
  // const submit = useSubmit();

  // function submitHandler(event) {
  //   event.preventDefault();

  //   submit(event.target, {
  //     method: "post",
  //   });
  // }

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date ? expenseData.date.slice(0, 10) : "",
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  return (
    <Form
      method={expenseData ? "patch" : "post"}
      className="form"
      id="expense-form"
      // onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="1"
            step="0.01"
            defaultValue={defaultValues.amount}
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={defaultValues.date}
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="/expenses">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
