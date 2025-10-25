import React from 'react';

export default function EmailDetail(
    { selectedEmail,
    deselectEmail,
    editMode,
    setEditMode,
    subject,
    setSubject,
    body,
    setBody,
    editEmail,
    deleteEmail,
    createEmail }) {

    // Buttons
    const editModeEditBtn = () => {
        setEditMode(true);
        setSubject(selectedEmail.subject);
        setBody(selectedEmail.body);
    };

    const editModeCancelBtn = () => {
        setEditMode(false);
        setSubject('');
        setBody('');
    };

    const createEmailBtn = async () => {
        await createEmail(subject.trim(), body.trim());
    };

    return (
        <div className="w-full bg-gray-50 flex flex-col">
            <div className="p-4 border-b bg-white">
                <div className="flex justify-between items-center">
                    {/* lines 38 & 39 I got From generative AI as a part of the ternery operator prompt referenced below*/}
                    <h2 className="text-xl font-bold">{selectedEmail ? (editMode ? 'Edit Email' : 'View Email') : 'Compose Email'}</h2>
                    {selectedEmail && (
                        <button
                            className="bg-green-300 text-white font-bold px-4 rounded-xl hover:bg-green-500"
                            onClick={deselectEmail}>
                            Go Back
                        </button>
                    )}
                </div>
            </div>
            <div className="p-4">
                <h5 className="text-lg font-bold">Subject</h5>
                <input
                    type="text"
                    value={selectedEmail && !editMode ? selectedEmail.subject : subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={selectedEmail && !editMode}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter subject here..."
                />
            </div>
            <div className="p-4">
                <h5 className="text-lg font-bold">Body</h5>
                <textarea
                    value={selectedEmail && !editMode ? selectedEmail.body : body}
                    onChange={(e) => setBody(e.target.value)}
                    disabled={selectedEmail && !editMode}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter body here..."
                />
            </div>
            <div className="p-4"></div>
            <div className="flex justify-end p-4">
                {/* Ai snippet to create a ternery operator I created the buttons and constants I only used Ai to create the ternery syntax */}
                {/*prompt "make an editing mode when you select edit that switches the buttons from edit and delete to save email and cancel (code)" Grok 3, version 15th July. 2025,*/}
                {/* https://grok.com/share/bGVnYWN5_f3c92eea-b63e-41e1-a72d-f9d823dbbe93 */}
                {/* Start of Ai ternery operator */}
                {selectedEmail ? (
                    editMode ? (
                        <>
                            <button
                                onClick={() => editEmail(subject, body)}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={subject.trim() === '' || body.trim() === ''}>
                                Save Email
                            </button>
                            <div className="p-2"></div>
                            <button
                                onClick={editModeCancelBtn}
                                className="bg-red-300 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-500">
                                Cancel
                            </button> </>
                    ) : (
                        <>
                            <button
                                onClick={editModeEditBtn}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-600">
                                Edit Email
                            </button>
                            <div className="p-2"></div>
                            <button
                                onClick={() => deleteEmail(selectedEmail.id)}
                                className="bg-red-300 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-500"
                                id="delete-btn">
                                Delete Email
                            </button> </>
                    )
                    /* End of Ai ternery operator */
                    ) : (
                    <button
                        onClick={createEmailBtn}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={subject.trim() === '' || body.trim() === ''}>
                        Send Email
                    </button>
                )}
            </div>
        </div>
    )
}