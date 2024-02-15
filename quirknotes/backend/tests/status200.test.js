const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }); 
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
    // Code here
    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })

    const getAllNotesBody = await getAllNotesRes.json();

    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response.length).toBe(0);
  });
  
  test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    // Code here
    for (i = 0; i < 2; i++) {
        await fetch(`${SERVER_URL}/postNote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: "title",
              content: "content",
            }),
        });
    }

    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })

    const getAllNotesBody = await getAllNotesRes.json();
    
    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response.length).toBe(2);

    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    });
  });
  
  test("/deleteNote - Delete a note", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "title",
          content: "content",
        }),
      });
    
    const postNoteBody = await postNoteRes.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    });

    const deleteNoteBody = await deleteNoteRes.json();

    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
  });
  
  test("/patchNote - Patch with content and title", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "title",
          content: "content",
        }),
      });
      
    const postNoteBody = await postNoteRes.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "new_title",
          content: "new_content",
        }),
      });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`)
    expect(patchNoteRes.status).toBe(200);

    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    });
  });
  
  test("/patchNote - Patch with just title", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "title",
          content: "content",
        }),
      });
      
    const postNoteBody = await postNoteRes.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "new_title",
        }),
      });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`)
    expect(patchNoteRes.status).toBe(200);

    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    });
  });
  
  test("/patchNote - Patch with just content", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "title",
          content: "content",
        }),
      });
      
    const postNoteBody = await postNoteRes.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "new-content"
        }),
      });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`)
    expect(patchNoteRes.status).toBe(200);

    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    });
  });
  
  test("/deleteAllNotes - Delete one note", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "title",
          content: "content",
        }),
      });
      
    const postNoteBody = await postNoteRes.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }); 

    const deleteAllNotesBody = await deleteAllNotesRes.json();

    expect(deleteAllNotesRes.status).toBe(200)
    expect(deleteAllNotesBody.response).toBe(`1 note(s) deleted.`)
  });
  
  test("/deleteAllNotes - Delete three notes", async () => {
    for (i = 0; i < 3; i++) {
        const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: "title",
              content: "content",
            }),
          });
          
        const postNoteBody = await postNoteRes.json();
    
        expect(postNoteRes.status).toBe(200);
        expect(postNoteBody.response).toBe("Note added succesfully.");
    }

    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }); 

    const deleteAllNotesBody = await deleteAllNotesRes.json();

    expect(deleteAllNotesRes.status).toBe(200)
    expect(deleteAllNotesBody.response).toBe(`3 note(s) deleted.`)
  });
  
  test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "title",
          content: "content",
        }),
      });
      
    const postNoteBody = await postNoteRes.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: "#FF0000"
        }),
      });

    const updateNoteColorBody = await updateNoteColorRes.json();

    expect(updateNoteColorRes.status).toBe(200);
    expect(updateNoteColorBody.message).toBe('Note color updated successfully.');

    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }); 

    const deleteAllNotesBody = await deleteAllNotesRes.json();

    expect(deleteAllNotesRes.status).toBe(200)
    expect(deleteAllNotesBody.response).toBe(`1 note(s) deleted.`)
  });