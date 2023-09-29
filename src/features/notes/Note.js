import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import { memo } from "react";

const Note = ({ noteId }) => {
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });
  console.log({ note });
  const navigate = useNavigate();

  if (note) {
    /* const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    }); */

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        {/* <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td> */}

        <td className="table__cell note__branchName">{note.Branch_Name}</td>
        <td className="table__cell note__problem">{note.Checked_By_name}</td>
        <td className="table__cell note__model">{note.Model}</td>
        <td className="table__cell note__itemType">{note.Item_Type}</td>
        <td className="table__cell note__serialNumber">{note.Serial_Number}</td>
        <td className="table__cell note__problem">{note.Problem}</td>
        <td className="table__cell note__problem">{note.Mantained_By_name}</td>
        <td className="table__cell note__problem">{note.Assigned_To_name}</td>
        <td className="table__cell note__problem">
          {note.Required_Equipments}
        </td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedNote = memo(Note);

export default memoizedNote;
