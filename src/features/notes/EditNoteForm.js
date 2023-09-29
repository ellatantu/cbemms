import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

/* const initialState = {
  Branch_Name: "",
  Item_Type: "",
  Model: "",
  Serial_Number: "",
  Problem: "",
  Required_Equipments: "",
}; */

const EditNoteForm = ({ note, users }) => {
  const { isManager, isAdmin } = useAuth();

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [values, setValues] = useState(note);
  /* const [text, setText] = useState(note.text); */
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.Checked_By);
  const [userId1, setUserId1] = useState(note.Mantained_By);
  const [userId2, setUserId2] = useState(note.Assigned_To);
 // console.log({userId,userId1,userId2})
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setValues({});
      /* setText(""); */
      
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handelChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  /* const onTextChanged = (e) => setText(e.target.value); */
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);
  const onUserIdChanged1 = (e) => { setUserId1(e.target.value)};
  const onUserIdChanged2 = (e) => setUserId2(e.target.value);

  const canSave = [values.Branch_Name, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await updateNote({
        id: note.id,
        
        ...values,
        completed,
        Checked_By: userId,
        Mantained_By: userId1,
        Assigned_To: userId2,
      });
    }
  };
  //console.log({note})

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id });
  };

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });
  /* console.log({ options }); */

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !values.Branch_Name ? "form__input--incomplete" : "";
  //const validTextClass = !text ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="icon-button"
        title="Delete"
        onClick={onDeleteNoteClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Computer`s info #{note.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
        </div>
        <label className="form__label" htmlFor="note-title">
          Branch Name:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="Branch_Name"
          type="text"
          autoComplete="off"
          value={values.Branch_Name}
          onChange={handelChange}
        />
        <label className="form__label" htmlFor="note-title">
          Item Type:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="Item_Type"
          type="text"
          autoComplete="off"
          value={values.Item_Type}
          onChange={handelChange}
        />
        <label className="form__label" htmlFor="note-title">
          Model:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="Model"
          type="text"
          autoComplete="off"
          value={values.Model}
          onChange={handelChange}
        />
        <label className="form__label" htmlFor="note-title">
          Serial No:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="Serial_Number"
          type="text"
          autoComplete="off"
          value={values.Serial_Number}
          onChange={handelChange}
        />
        <label className="form__label" htmlFor="note-title">
          Problem:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="Problem"
          type="text"
          autoComplete="off"
          value={values.Problem}
          onChange={handelChange}
        />

        <label className="form__label" htmlFor="text">
          Required Equipments:
        </label>
        <textarea
          className={`form__input form__input--text {validTextClass}`}
          id="text"
          name="Required_Equipments"
          value={values.Required_Equipments}
          onChange={handelChange}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          checked By:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          Mantained By:
        </label>
        <select
          id="username"
          name="Maintaned_By"
          className="form__select"
          value={userId1}
          onChange={onUserIdChanged1}
        >
          {options}
        </select>

        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="note-completed"
            >
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>

            <label
              className="form__label form__checkbox-container"
              htmlFor="note-username"
            >
              ASSIGNED TO:
            </label>
            <select
              id="note-username"
              name="Assigned_To"
              className="form__select"
              value={userId2}
              onChange={onUserIdChanged2}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditNoteForm;
