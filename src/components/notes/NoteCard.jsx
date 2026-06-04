// client/src/components/notes/NoteCard.jsx

import { useState } from "react";

import toast from "react-hot-toast";

import API from "../../api/axios";

import { PlatformBadge } from "../ui/Badge";

import { formatDate } from "../../utils/formatDate";

const NoteCard = ({
  note,
  onEdit,
  onDeleted,
}) => {

  const [isDeleting, setIsDeleting] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  // Delete Note
  const handleDelete = async () => {

    setIsDeleting(true);

    try {

      await API.delete(`/notes/${note._id}`);

      toast.success("Note deleted successfully");

      onDeleted(note._id);

    } catch (error) {

      console.error("Delete note error:", error);

      toast.error("Failed to delete note");

    } finally {

      setIsDeleting(false);

      setShowConfirm(false);

    }
  };

  return (

    <div
      className="
        flex flex-col gap-4

        rounded-2xl
        p-5

        bg-white dark:bg-dark-100

        border border-gray-200 dark:border-gray-700/50

        hover:border-primary-500/30

        transition-all duration-200

        animate-fade-in
      "
    >

      {/* Top Row */}
      <div className="flex items-start justify-between gap-3">

        {/* Platform Badge */}
        <PlatformBadge platform={note.platform} />

        {/* Actions */}
        <div className="flex items-center gap-1">

          {/* Edit Button */}
          <button
            onClick={() => onEdit(note)}
            title="Edit note"
            className="
              p-2

              rounded-lg

              text-gray-400

              hover:text-primary-500

              hover:bg-primary-500/10

              transition-colors
            "
          >

            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />

            </svg>

          </button>

          {/* Delete Button */}
          <button
            onClick={() => setShowConfirm(true)}
            title="Delete note"
            className="
              p-2

              rounded-lg

              text-gray-400

              hover:text-red-500

              hover:bg-red-500/10

              transition-colors
            "
          >

            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />

            </svg>

          </button>

        </div>

      </div>

      {/* Contest Name */}
      <div>

        <h3
          className="
            text-sm
            font-semibold

            text-gray-900 dark:text-gray-100

            line-clamp-1
          "
        >

          {note.contestName || "Unnamed Contest"}

        </h3>

      </div>

      {/* Note Content */}
      <p
        className="
          text-sm
          leading-relaxed

          text-gray-600 dark:text-gray-400

          whitespace-pre-wrap

          line-clamp-4
        "
      >

        {note.content}

      </p>

      {/* Timestamp */}
      <p
        className="
          mt-auto

          text-xs

          text-gray-400 dark:text-gray-500
        "
      >

        Last updated {formatDate(note.updatedAt)}

      </p>

      {/* Delete Confirmation */}
      {showConfirm && (

        <div
          className="
            mt-2

            rounded-xl

            p-3

            bg-red-50 dark:bg-red-500/10

            border border-red-200 dark:border-red-500/20
          "
        >

          <p
            className="
              mb-3

              text-sm font-medium

              text-red-600 dark:text-red-400
            "
          >

            Delete this note?

          </p>

          {/* Buttons */}
          <div className="flex gap-2">

            {/* Cancel */}
            <button
              onClick={() => setShowConfirm(false)}
              className="
                flex-1

                px-3 py-2

                rounded-lg

                text-sm

                bg-gray-100 dark:bg-dark-200

                text-gray-700 dark:text-gray-300

                hover:bg-gray-200 dark:hover:bg-dark-300

                transition-colors
              "
            >

              Cancel

            </button>

            {/* Delete */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="
                flex-1

                px-3 py-2

                rounded-lg

                text-sm

                bg-red-500
                text-white

                hover:bg-red-600

                disabled:opacity-50

                transition-colors
              "
            >

              {isDeleting
                ? "Deleting..."
                : "Delete"}

            </button>

          </div>

        </div>

      )}

    </div>

  );
};

export default NoteCard;

