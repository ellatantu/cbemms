import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const initialState = {
  Branch_Name: "",
  Item_Type: "",
  Model: "",
  Serial_Number: "",
  Problem: "",
  Required_Equipments: "",
};

const NewNoteForm = ({ users }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);
  //const [text, setText] = useState({});
  const [userId, setUserId] = useState(users[0].id);
  const [userId1, setUserId1] = useState(users[0].id);
  const [userId2, setUserId2] = useState(users[0].id);
  //console.log({ userId1 });

  useEffect(() => {
    if (isSuccess) {
      setValues({});
      //setText({});
    
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const handelChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  //const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);
  const onUserIdChanged1 = (e) => setUserId1(e.target.value);
  const onUserIdChanged2 = (e) => setUserId2(e.target.value);

  const canSave = [values.Branch_Name, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({
        Checked_By: userId,
        Mantained_By: userId1,
        Assigned_To: userId2,
        ...values,
      });
    }
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !values.Branch_Name ? "form__input--incomplete" : "";
  //const validTextClass = !text ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
          <h2>New Computer</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Branch Name:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="Branch_Name"
          type="text"
          autoComplete="off"
          value={values.Branch_Name}
          onChange={handelChange}
        />
        <label className="form__label" htmlFor="title">
          Item Type:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="Item_Type"
          type="text"
          autoComplete="off"
          value={values.Item_Type}
          onChange={handelChange}
        />
        <label className="form__label" htmlFor="title">
          Model:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="Model"
          type="text"
          autoComplete="off"
          value={values.Model}
          onChange={handelChange}
        />
        <label className="form__label" htmlFor="title">
          Serial No:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="Serial_Number"
          type="text"
          autoComplete="off"
          value={values.Serial_Number}
          onChange={handelChange}
        />
        <label className="form__label" htmlFor="title">
          Problem:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
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
        {/* 
        <label className="form__label" htmlFor="title">
          Mantained By:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="Mantained_By"
          type="text"
          autoComplete="off"
          value={values.Mantained_By}
          onChange={handelChange}
        /> */}

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          Mantained By:
        </label>
        <select
          id="username"
          name="Mantained_By"
          className="form__select"
          value={userId1}
          onChange={onUserIdChanged1}
        >
          {options}
        </select>

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={userId2}
          onChange={onUserIdChanged2}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};

export default NewNoteForm;
