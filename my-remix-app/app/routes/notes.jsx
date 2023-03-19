import { json, redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "../data/notes";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { Link, useCatch, useLoaderData } from "@remix-run/react";

export default function NotesPage() {
  const { notes } = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader({ request }) {
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes" },
      { status: 404, statusText: "not found" }
    );
  }

  return json({ notes: notes ?? [] });
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  //Validation

  if (noteData.title.trim().length < 5) {
    return {
      message: "Invalid title - must be at least 5 characters long.",
    };
  }

  const existingNotes = await getStoredNotes();

  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);
  storeNotes(updatedNotes);

  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function meta() {
  return {
    title: "All Notes",
    description: "Manage your notes with ease.",
  };
}

export function CatchBoundary() {
  const caughtRes = useCatch();

  const message = caughtRes.data?.message || "Data not found";

  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
}

export function ErrorBoundary() {
  return (
    <main className="error">
      <h1>An notes error occured!</h1>
      <p>
        <Link to="/">Go Back</Link>
      </p>
    </main>
  );
}
