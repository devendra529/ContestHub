// client/src/pages/Notes.jsx

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../api/axios";

import Layout from "../components/layout/Layout";

import NoteCard from "../components/notes/NoteCard";
import NoteModal from "../components/notes/NoteModal";

import SkeletonGrid from "../components/ui/Skeleton";

const Notes = () => {

  const [notes, setNotes] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  // Modal State
  const [modal, setModal] =
    useState({

      open: false,

      contest: null,

      existing: null,

    });

  // Fetch Notes
  useEffect(() => {

    let ignore = false;

    const fetchNotes = async () => {

      try {

        const response =
          await API.get("/notes");

        if (!ignore) {

          setNotes(

            response.data.data
              .notes || []
          );
        }

      } catch (error) {

        console.error(
          "Failed to load notes:",
          error
        );

        toast.error(
          "Failed to load notes"
        );

      } finally {

        if (!ignore) {

          setIsLoading(false);

        }
      }
    };

    fetchNotes();

    return () => {

      ignore = true;

    };

  }, []);

  // Save Note
  const handleNoteSaved = (
    savedNote
  ) => {

    setNotes((prev) => {

      const exists = prev.find(

        (note) =>

          note._id ===
          savedNote._id
      );

      // Update Existing
      if (exists) {

        return prev.map((note) =>

          note._id ===
          savedNote._id

            ? savedNote

            : note
        );
      }

      // Add New
      return [

        savedNote,

        ...prev,

      ];
    });
  };

  // Delete Note
  const handleNoteDeleted = (
    noteId
  ) => {

    setNotes((prev) =>

      prev.filter(

        (note) =>
          note._id !== noteId
      )
    );
  };

  // Edit Note
  const handleEditNote = (
    note
  ) => {

    setModal({

      open: true,

      contest: {

        externalId:
          note.contestId,

        platform:
          note.platform,

        name:
          note.contestName,

      },

      existing: note,

    });
  };

  // Close Modal
  const handleCloseModal = () => {

    setModal({

      open: false,

      contest: null,

      existing: null,

    });
  };

  // Loading State
  if (isLoading) {

    return (

      <Layout>

        <div
          className="
            min-h-screen

            bg-gray-50 dark:bg-dark-200

            px-4 py-6
          "
        >

          <div className="max-w-7xl mx-auto">

            <div
              className="
                h-8 w-36

                rounded-lg

                mb-8

                bg-gray-200 dark:bg-gray-700

                animate-pulse
              "
            />

            <SkeletonGrid count={6} />

          </div>

        </div>

      </Layout>
    );
  }

  return (

    <Layout>

      {/* Main Background */}
      <div
        className="
          min-h-screen

          bg-gray-50 dark:bg-dark-200

          px-4 py-6
        "
      >

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">

            <h1
              className="
                text-2xl font-bold

                text-gray-900 dark:text-white
              "
            >

              My Notes

            </h1>

            <p
              className="
                mt-1

                text-sm

                text-gray-500 dark:text-gray-400
              "
            >

              {notes.length}
              {" "}
              note
              {notes.length !== 1
                ? "s"
                : ""}

            </p>

          </div>

          {/* Empty State */}
          {notes.length === 0 && (

            <div
              className="
                flex flex-col
                items-center
                justify-center

                py-24

                text-center
              "
            >

              <span className="text-6xl mb-4">
                📝
              </span>

              <h3
                className="
                  mb-2

                  text-lg font-semibold

                  text-gray-700 dark:text-gray-300
                "
              >

                No notes yet

              </h3>

              <p
                className="
                  max-w-xs

                  text-sm

                  text-gray-400 dark:text-gray-500
                "
              >

                Open any bookmarked contest
                and add notes for your
                preparation strategy.

              </p>

            </div>

          )}

          {/* Notes Grid */}
          {notes.length > 0 && (

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3

                gap-5
              "
            >

              {notes.map((note) => (

                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEditNote}
                  onDeleted={
                    handleNoteDeleted
                  }
                />

              ))}

            </div>

          )}

        </div>

      </div>

      {/* Modal */}
      <NoteModal
        isOpen={modal.open}
        onClose={handleCloseModal}
        contest={modal.contest}
        existingNote={modal.existing}
        onSaved={handleNoteSaved}
      />

    </Layout>
  );
};

export default Notes;

