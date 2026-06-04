// client/src/components/notes/NoteModal.jsx

import {
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../../api/axios";

import Modal from "../ui/Modal";

import Button from "../ui/Button";

import {
  PlatformBadge,
} from "../ui/Badge";

const NoteModal = ({
  isOpen,
  onClose,
  contest,
  existingNote,
  onSaved,
}) => {

  // Content State
  const [content, setContent] =
    useState(
      existingNote?.content || ""
    );

  // Loading State
  const [isLoading, setIsLoading] =
    useState(false);

  // Max Characters
  const MAX_CHARS = 2000;

  // Edit Mode
  const isEdit =
    !!existingNote;

  // Character Count
  const charCount =
    content.length;

  // Handle Close
  const handleClose = () => {

    setContent(
      existingNote?.content || ""
    );

    onClose();
  };

  // Handle Content Change
  const handleContentChange = (
    e
  ) => {

    const value =
      e.target.value;

    if (
      value.length <=
      MAX_CHARS
    ) {

      setContent(value);

    }
  };

  // Save Note
  const handleSave = async () => {

    if (!content.trim()) {

      toast.error(
        "Note cannot be empty"
      );

      return;
    }

    setIsLoading(true);

    try {

      let response;

      // Update Existing Note
      if (isEdit) {

        response =
          await API.put(

            `/notes/${existingNote._id}`,

            {
              content,
            }

          );

        toast.success(
          "Note updated"
        );

      } else {

        // Create Note
        response =
          await API.post(
            "/notes",
            {

              contestId:

                contest?.externalId ||

                contest?.contestId,

              platform:
                contest?.platform,

              contestName:

                contest?.name ||

                contest?.contestName,

              content,

            }
          );

        toast.success(
          "Note saved 📝"
        );
      }

      // Update Parent State
      if (onSaved) {

        onSaved(
          response.data.data.note
        );

      }

      // Close Modal
      handleClose();

    } catch (error) {

      console.error(error);

      toast.error(

        error.response?.data
          ?.message ||

        "Failed to save note"

      );

    } finally {

      setIsLoading(false);

    }
  };

  // Contest Name
  const contestName =

    contest?.name ||

    contest?.contestName ||

    "Contest";

  return (

    <Modal
      isOpen={isOpen}

      onClose={handleClose}

      title={
        isEdit
          ? "Edit Note"
          : "Add Note"
      }

      size="md"
    >

      {/* Contest Info */}
      <div
        className="
          mb-4

          rounded-xl

          border border-gray-200
          dark:border-gray-700/50

          bg-gray-50
          dark:bg-dark-200

          p-3
        "
      >

        <div
          className="
            mb-1

            flex items-center gap-2
          "
        >

          {contest?.platform && (

            <PlatformBadge
              platform={
                contest.platform
              }
            />

          )}

        </div>

        <p
          className="
            mt-1

            line-clamp-2

            text-sm font-medium

            text-gray-700
            dark:text-gray-300
          "
        >

          {contestName}

        </p>

      </div>

      {/* Textarea */}
      <div
        className="
          flex flex-col gap-2
        "
      >

        <label
          className="
            text-sm font-medium

            text-gray-700
            dark:text-gray-300
          "
        >

          Your Note

        </label>

        <textarea
          value={content}

          onChange={
            handleContentChange
          }

          rows={6}

          autoFocus

          placeholder={`Write your contest notes here...

• Important topics
• Strategy
• Mistakes
• Revision plan`}

          className="
            w-full

            resize-none

            rounded-xl

            border border-gray-200
            dark:border-gray-700

            bg-white
            dark:bg-dark-200

            px-4 py-3

            text-sm

            text-gray-900
            dark:text-gray-100

            placeholder-gray-400
            dark:placeholder-gray-500

            transition-all

            focus:border-transparent
            focus:outline-none
            focus:ring-2
            focus:ring-primary-500
          "
        />

        {/* Character Count */}
        <div
          className="
            flex justify-end
          "
        >

          <span
            className={`
              text-xs

              ${
                charCount >
                MAX_CHARS * 0.9

                  ? "text-orange-500"

                  : "text-gray-400"
              }
            `}
          >

            {charCount}
            {" / "}
            {MAX_CHARS}

          </span>

        </div>

      </div>

      {/* Buttons */}
      <div
        className="
          mt-5

          flex gap-3
        "
      >

        <Button
          variant="secondary"

          onClick={handleClose}

          fullWidth
        >

          Cancel

        </Button>

        <Button
          onClick={handleSave}

          isLoading={isLoading}

          fullWidth
        >

          {isEdit
            ? "Update Note"
            : "Save Note"}

        </Button>

      </div>

    </Modal>

  );
};

export default NoteModal;

