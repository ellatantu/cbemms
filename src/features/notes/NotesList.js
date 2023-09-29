import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";

const NotesList = () => {
  useTitle("techNotes: Notes List");

  const { username, isManager, isAdmin } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />);
    //console.log("table");
    //console.log({ tableContent });
    content = (
      <table className="">
        <thead className="">
          <tr>
            <th scope="col" className="">
              Status
            </th>
            <th scope="col" className="">
              Branch Name
            </th>
            <th scope="col" className="">
              Checked By
            </th>
            <th scope="col" className="">
              Model
            </th>
            <th scope="col" className="">
              Item Type
            </th>
            <th scope="col" className="">
              Serial Number
            </th>
            <th scope="col" className="">
              Problem
            </th>
            <th scope="col" className="">
              Maintened By
            </th>
            <th scope="col" className="">
              Assigned To
            </th>
            <th scope="col" className="">
              Required Equipments
            </th>
            <th scope="col" className="">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default NotesList;
