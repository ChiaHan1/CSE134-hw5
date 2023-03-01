// run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

/**
 * start the program
 */
function init () {
    // get the list of posts from the local storage
    let posts = getPostFromStorage ();

    /**
     * if there were no posts existed, display the message
     */
    const empty_list = document.getElementById ('empty');

    if (posts.length == 0) {
        empty_list.style.display = 'block';
    }
    else {
        empty_list.style.display = 'none';
    }

    // select <main>
    const main = document.querySelector ("main");

    /**
     * add each post to <main>
     */
    for (let i = 0; i < posts.length; i++) {
        // create a <post-card> element for each post in the local storage
        const post_card = document.createElement ("post-card");
        // set the data for the post
        post_card.data = posts[i];
        // get the edit button
        const edit_btn = post_card.shadowRoot.getElementById('edit_btn');
        // event listener for edit button with the <post-card> and data of the post
        edit_btn.addEventListener ('click', () => {
            editPostHandler (post_card, posts[i]);
        });
        // get the delete button
        const delete_btn = post_card.shadowRoot.getElementById('delete_btn');
        // event listener for delete button with the <post-card> and data of the post
        delete_btn.addEventListener ('click', () => {
            deletePostHandler (post_card, posts[i]);
        });

        // add the post card to <main>
        main.appendChild (post_card);
      }
    
    addNewPostHandler ();
}

/**
 * a handler for add new post button
 */
function addNewPostHandler () {
    // get the add new post button
    const add_btn = document.getElementById ('add');

    /**
     * event listener for the add new post button
     */
    add_btn.addEventListener ('click', () => {
        /**
         * create a dialog for adding a new post
         */
        const add_dialog = document.createElement ('dialog');

        const header = document.createElement ('h4');
        header.textContent = 'ADD A NEW POST';
        header.style.textAlign = 'center';
        add_dialog.appendChild (header);

        const label_title = document.createElement ('label');
        label_title.for = 'title';
        label_title.textContent = 'Post Title: ';
        add_dialog.appendChild (label_title);

        const input_title = document.createElement ('input');
        input_title.type = 'text';
        input_title.name = 'title';
        input_title.placeholder = 'Post Title';
        input_title.required = true;
        add_dialog.appendChild (input_title);
        
        add_dialog.append (document.createElement ('hr'));

        const label_date = document.createElement ('label');
        label_date.for = 'date';
        label_date.textContent = 'Post Date: ';
        add_dialog.appendChild (label_date);

        const input_date = document.createElement ('input');
        input_date.name = 'date';
        input_date.type = 'date';
        add_dialog.appendChild (input_date);

        add_dialog.appendChild (document.createElement ('hr'));

        const label_summary = document.createElement ('label');
        label_summary.for = 'summary';
        label_summary.textContent = 'Post Summary: ';
        add_dialog.appendChild (label_summary);

        add_dialog.append (document.createElement ('br'));

        const input_summary = document.createElement ('textarea');
        input_summary.name = 'summary';
        input_summary.placeholder = '1-2 sentences snippet of the post';
        input_summary.cols = '50';
        input_summary.rows = '8';
        add_dialog.appendChild (input_summary);

        add_dialog.appendChild (document.createElement ('br'));

        const buttons = document.createElement ('div');
        buttons.style.textAlign = 'right';

        const cancel_btn = document.createElement ('button');
        cancel_btn.textContent = 'Cancel';
        buttons.appendChild (cancel_btn);

        cancel_btn.style.margin= "0 10px 0 0";

        const save_btn = document.createElement ('button');
        save_btn.textContent = 'Save';
        buttons.appendChild (save_btn);

        add_dialog.appendChild (buttons);

        document.body.appendChild (add_dialog);
        add_dialog.showModal ();

        /**
         * event listener for the cancel button
         */
        cancel_btn.addEventListener ('click', () => {
            // close the dialog for adding a new post
            add_dialog.close ();
            document.body.removeChild (add_dialog);
        });

        /**
         * event listener for the save button
         */
        save_btn.addEventListener ('click', () => {
            /**
             * if the same post already existed
             */
            if (checkDuplicate (input_title.value, input_date.value, input_summary.value)) {
                /**
                 * create a dialog for duplicate post
                 */
                const duplicate_dialog = document.createElement ('dialog');

                const duplicate_p = document.createElement ('p');
                duplicate_p.textContent = 'The same post has already existed';
                duplicate_dialog.appendChild (duplicate_p);

                const ok_btn = document.createElement ('button');
                ok_btn.textContent = 'Ok';
                duplicate_dialog.appendChild (ok_btn);

                document.body.appendChild (duplicate_dialog);
                duplicate_dialog.showModal ();

                /**
                 * event listener for ok button
                 */
                ok_btn.addEventListener ('click', () => {
                    // close the dialog for duplicate post
                    duplicate_dialog.close ();
                    document.body.removeChild (duplicate_dialog);
                });
            }
            else {
                // if the list was empty before adding the post
                const empty_list = document.getElementById ('empty');
                if (empty_list.style.display != 'none') {
                    empty_list.style.display = 'none';
                }

                // create a new object for the new post with title, date, and summary
                let new_post = new Object ();
                new_post['title'] = input_title.value;
                new_post['date'] = input_date.value;
                new_post['summary'] = input_summary.value;

                // create a new <post-card> element
                const post_card = document.createElement ('post-card');
                // add the new_post data to <post-card> using element.data
                post_card.data = new_post;
                
                // get the edit button
                const edit_btn = post_card.shadowRoot.getElementById('edit_btn');
                // event listener for edit button with the <post-card> and data of the post
                edit_btn.addEventListener ('click', () => {
                    editPostHandler (post_card, new_post);
                });

                // get the delete button
                const delete_btn = post_card.shadowRoot.getElementById('delete_btn');
                // event listener for delete button with the <post-card> and data of the post
                delete_btn.addEventListener ('click', () => {
                    deletePostHandler (post_card, new_post);
                });

                //append this new <post-card> to <main>
                const main = document.querySelector ("main");
                main.appendChild (post_card);

                /**
                 * add the new post to the local storage
                 */

                // get the list of posts from the local storage
                const posts = getPostFromStorage ();
                // add the new post to the list of posts
                posts.push (new_post);
                // store all the posts with the new post back to the local storage
                savePostToStorage (posts);

                // close the dialog for adding a new post
                add_dialog.close ();
                document.body.removeChild (add_dialog);
            }
        });
    });
}

/**
 * find the list of posts in the local storage
 * @returns the parsed list of posts
 */
function getPostFromStorage () {
    if (window.localStorage.getItem ('posts') == null) {
        return [];
      }
      return JSON.parse (window.localStorage.getItem ('posts'));    
}

/**
 * store the list of posts to the local storage
 * @param {*} posts the list of posts
 */
function savePostToStorage (posts) {
    localStorage.setItem ('posts', JSON.stringify (posts));
}

/**
 * a handler for edit button
 * @param {*} post_card the <post-card> element of the post
 * @param {*} edited_post the post being edited
 */
function editPostHandler (post_card, edited_post) {
    /**
     * create a dialog for editing the post
     */
    const edit_dialog = document.createElement ('dialog');

    const header = document.createElement ('h4');
    header.textContent = 'EDIT POST';
    header.style.textAlign = 'center';
    edit_dialog.appendChild (header);

    const label_title = document.createElement ('label');
    label_title.for = 'title';
    label_title.textContent = 'Post Title: ';
    edit_dialog.appendChild (label_title);

    const input_title = document.createElement ('input');
    input_title.type = 'text';
    input_title.name = 'title';
    input_title.value = edited_post['title'];
    edit_dialog.appendChild (input_title);
    
    edit_dialog.append (document.createElement ('hr'));

    const label_date = document.createElement ('label');
    label_date.for = 'date';
    label_date.textContent = 'Post Date: ';
    edit_dialog.appendChild (label_date);

    const input_date = document.createElement ('input');
    input_date.name = 'date';
    input_date.type = 'date';
    input_date.value = edited_post['date'];
    edit_dialog.appendChild (input_date);

    edit_dialog.appendChild (document.createElement ('hr'));

    const label_summary = document.createElement ('label');
    label_summary.for = 'summary';
    label_summary.textContent = 'Post Summary: ';
    edit_dialog.appendChild (label_summary);

    edit_dialog.append (document.createElement ('br'));

    const input_summary = document.createElement ('textarea');
    input_summary.name = 'summary';
    input_summary.value = edited_post['summary'];
    input_summary.cols = '50';
    input_summary.rows = '8';
    edit_dialog.appendChild (input_summary);

    edit_dialog.appendChild (document.createElement ('br'));

    const buttons = document.createElement ('div');
    buttons.style.textAlign = 'right';

    const cancel_btn = document.createElement ('button');
    cancel_btn.textContent = 'Cancel';
    buttons.appendChild (cancel_btn);

    cancel_btn.style.margin= "0 10px 0 0";

    const save_btn = document.createElement ('button');
    save_btn.textContent = 'Save';
    buttons.appendChild (save_btn);

    edit_dialog.appendChild (buttons);

    document.body.appendChild (edit_dialog);
    edit_dialog.showModal ();

    /**
     * event listener for cancel button
     */
    cancel_btn.addEventListener ('click', () => {
        // close the dialog for editing the post
        edit_dialog.close ();
        document.body.removeChild (edit_dialog);
    });

    /**
     * event listener for save button
     */
    save_btn.addEventListener ('click', () => {
        /**
         * if nothing was changed
         */
        if (edited_post['title'] === input_title.value 
                    && edited_post['date'] === input_date.value 
                    && edited_post['summary'] === input_summary.value) {
            // close the dialog for editing the post
            edit_dialog.close ();
            document.body.removeChild (edit_dialog);
        }
        /**
         * if the same post already existed
         */
        else if (checkDuplicate (input_title.value, input_date.value, input_summary.value)) {
            /**
             * create a dialog for duplicate post
             */
            const duplicate_dialog = document.createElement ('dialog');

            const duplicate_p = document.createElement ('p');
            duplicate_p.textContent = 'The same post has already existed';
            duplicate_dialog.appendChild (duplicate_p);

            const ok_btn = document.createElement ('button');
            ok_btn.textContent = 'Ok';
            duplicate_dialog.appendChild (ok_btn);

            document.body.appendChild (duplicate_dialog);
            duplicate_dialog.showModal ();

            /**
             * event listener for ok button
             */
            ok_btn.addEventListener ('click', () => {
                // close the dialog for duplicate post
                duplicate_dialog.close ();
                document.body.removeChild (duplicate_dialog);
            });
        }
        else {
            // get the list of posts from the local storage
            const posts = getPostFromStorage ();

            /**
             * find the index of the post being deleted in the list of post
             */
            let index = -1;
            for (let i = 0; i < posts.length; i++) {
                if (JSON.stringify (posts[i]) === JSON.stringify (edited_post)) {
                    index = i;
                    break;
                }
            }

            /**
             * update the post in the local storage
             */
            posts[index]['title'] = input_title.value;
            posts[index]['date'] = input_date.value;
            posts[index]['summary'] = input_summary.value;

            // store all the posts with the new post back to the local storage
            savePostToStorage (posts);

            /**
             * update the reference
             */
            edited_post['title'] = input_title.value;
            edited_post['date'] = input_date.value;
            edited_post['summary'] = input_summary.value;

            /**
             * update the <post-card> element of the post
             */
            post_card.shadowRoot.querySelector ('h2').textContent = input_title.value;
            post_card.shadowRoot.querySelector ('span').textContent = input_date.value;
            post_card.shadowRoot.querySelector ('p').textContent = input_summary.value;

            /**
             * close the dialog for editing the post
             */
            edit_dialog.close ();
            document.body.removeChild (edit_dialog);

        }
    });
}

/**
 * a handler for delete button
 * @param {*} deleted_post 
 */
function deletePostHandler (post_card, deleted_post) {
    /**
     * create a dialog for deleting the post
     */
    const delete_dialog = document.createElement ('dialog');

    const delete_dialog_p = document.createElement ('p');
    delete_dialog_p.textContent = 'Do you want to delete this post?';
    delete_dialog.appendChild (delete_dialog_p);

    delete_dialog.appendChild (document.createElement ('br'));

    const buttons = document.createElement ('div');
    buttons.style.textAlign = 'right';

    const cancel_btn = document.createElement ('button');
    cancel_btn.textContent = 'Cancel';
    buttons.appendChild (cancel_btn);

    cancel_btn.style.margin= "0 10px 0 0";

    const yes_btn = document.createElement ('button');
    yes_btn.textContent = 'Yes';
    buttons.appendChild (yes_btn);

    delete_dialog.appendChild (buttons);

    document.body.appendChild (delete_dialog);
    delete_dialog.showModal ();

    /**
     * event listener for cancel button
     */
    cancel_btn.addEventListener ('click', () => {
        // close the dialog for deleting the post
        delete_dialog.close ();
        document.body.removeChild (delete_dialog);
    });

    /**
     * event listener for save button
     */
    yes_btn.addEventListener ('click', () => {
        // get the list of posts from the local storage
        const posts = getPostFromStorage ();

        /**
         * find the index of the post being deleted
         */
        let index = -1;
        for (let i = 0; i < posts.length; i++) {
            if (JSON.stringify (posts[i]) === JSON.stringify (deleted_post)) {
                index = i;
                break;
            }
        }
    
        /**
         * delete the post from the local storage
         */

        // delete the post from the list of posts
        posts.splice(index, 1);
        // save the list of posts back to the local storage
        savePostToStorage (posts);

        /**
         * delete the post in from the document 
         */

        //delete this new <post-card> to <main>
        const main = document.querySelector ("main");
        main.removeChild (post_card);
        
        // close the dialog for deleting the post
        delete_dialog.close ();
        document.body.removeChild (delete_dialog);

        /**
         * if no posts left in the list, display the message
         */
        const empty_list = document.getElementById ('empty');
        if (posts.length == 0) {
            empty_list.style.display = 'block';
        }
    });
}

/**
 * check if the same post has already exist in the list
 * @param {*} title the title of the new post
 * @param {*} date the date of the new post
 * @param {*} summary the summary of the new post
 * @returns true if the same post already exist
 */
function checkDuplicate (title, date, summary) {
    const posts = getPostFromStorage ();
    const new_post = {
        'title': title,
        'date': date,
        'summary': summary
    }

    for (let i = 0; i < posts.length; i++) {
        if (JSON.stringify (posts[i]) === JSON.stringify (new_post)) {
            return true;
        }
    }

    return false;
}