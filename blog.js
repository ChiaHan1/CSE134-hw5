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
        empty_list.style.display = 'inline-block';
    }

    // get the list of posts from the document
    const list = document.getElementById ('list');

    /**
     * add each post in the list to the document
     */
    for (let i = 0; i < posts.length; i++) {

        const single_post = posts[i];
        
        // create a <li> element and add it to the list
        const post_li = document.createElement ('li');
        list.appendChild (post_li);

        // add <p> to <li> with title, date, and summary of the new post
        const post_p = document.createElement ('p');
        post_p.innerHTML = `${single_post['title']} (${single_post['date']}) - ${single_post['summary']} &emsp;`;
        post_p.style.display = 'inline-block';
        post_li.appendChild (post_p);

        // add a edit button to <li> 
        const edit_btn = document.createElement ('button');
        edit_btn.textContent = 'Edit';
        post_li.appendChild (edit_btn);

        edit_btn.style.margin= "0 10px 0 0";

        // add a delete button to <li> 
        const delete_btn = document.createElement ('button');
        delete_btn.textContent = 'Delete';
        post_li.appendChild (delete_btn);

        // event listener for edit button with the post and <p> element in <li> of the post
        edit_btn.addEventListener ('click', () => {
            editPostHandler (single_post, post_p);
        });

        // event listener for delete button with the post and <li> of the post
        delete_btn.addEventListener ('click', () => {
            deletePostHandler (single_post, post_li);
        });
    }
    addNewPostHandler ();
}

/**
 * a handler for add new post button
 */
function addNewPostHandler () {
    /**
     * get the add new post button
     */
    const add_btn = document.getElementById ('add');

    /**
     * event listener for the add new post button
     */
    add_btn.addEventListener ('click', () => {
        /**
         * create a dialog for adding a new post
         */
        const add_dialog = document.createElement ('dialog');

        const label_title = document.createElement ('label');
        label_title.for = 'title';
        label_title.textContent = 'Post Title: ';
        add_dialog.appendChild (label_title);

        const input_title = document.createElement ('input');
        input_title.type = 'text';
        input_title.name = 'title';
        input_title.placeholder = 'Post Title';
        add_dialog.appendChild (input_title);
        
        add_dialog.append (document.createElement ('br'));

        const label_date = document.createElement ('label');
        label_date.for = 'date';
        label_date.textContent = 'Post Date: ';
        add_dialog.appendChild (label_date);

        const input_date = document.createElement ('input');
        input_date.name = 'date';
        input_date.type = 'date';
        add_dialog.appendChild (input_date);

        add_dialog.appendChild (document.createElement ('br'));

        const label_summary = document.createElement ('label');
        label_summary.for = 'summary';
        label_summary.textContent = 'Post Summary: ';
        add_dialog.appendChild (label_summary);

        add_dialog.append (document.createElement ('br'));

        const input_summary = document.createElement ('textarea');
        input_summary.name = 'summary';
        input_summary.placeholder = '1-2 sentences snippet of the post';
        input_summary.cols = '50';
        add_dialog.appendChild (input_summary);

        add_dialog.appendChild (document.createElement ('br'));

        const cancel_btn = document.createElement ('button');
        cancel_btn.textContent = 'Cancel';
        add_dialog.appendChild (cancel_btn);

        cancel_btn.style.margin= "0 10px 0 0";

        const save_btn = document.createElement ('button');
        save_btn.textContent = 'Save';
        add_dialog.appendChild (save_btn);

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
                // create a new object for the new post with title, date, and summary
                let new_post = new Object ();
                new_post['title'] = input_title.value;
                new_post['date'] = input_date.value;
                new_post['summary'] = input_summary.value;
            
                // add the new post to the local storage and add it to the document
                addNewPost (new_post);

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
 * add a new post to the local storage and the document
 * @param {*} new_post the array of the new post being added
 */
function addNewPost (new_post) {
    /**
     * add the new post to the local storage
     */

    // get the list of posts from the local storage
    const posts = getPostFromStorage ();
    // add the new post to the list of posts
    posts.push (new_post);
    // store all the posts with the new post back to the local storage
    savePostToStorage (posts);

    // if the list was empty before adding the post
    const empty_list = document.getElementById ('empty');
    if (empty_list.style.display != 'none') {
        empty_list.style.display = 'none';
    }

    /**
     * add the new post to the document
     */

    // get the list of posts from the document
    const list = document.getElementById ('list');
    // create a <li> element and add it to the list
    const post_li = document.createElement ('li');
    list.appendChild (post_li);

    // add <p> to <li> with title, date, and summary of the new post
    const post_p = document.createElement ('p');
    post_p.innerHTML = `${new_post['title']} (${new_post['date']}) - ${new_post['summary']} &emsp;`;
    post_p.style.display = 'inline-block';
    post_li.appendChild (post_p);

    // add a edit button to <li> 
    const edit_btn = document.createElement ('button');
    edit_btn.textContent = 'Edit';
    post_li.appendChild (edit_btn);

    edit_btn.style.margin= "0 10px 0 0";

    // add a delete button to <li> 
    const delete_btn = document.createElement ('button');
    delete_btn.textContent = 'Delete';
    post_li.appendChild (delete_btn);

    // event listener for edit button with the post and <p> element in <li> of the post
    edit_btn.addEventListener ('click', () => {
        editPostHandler (new_post, post_p);
    });

    // event listener for delete button with the post and <li> of the post
    delete_btn.addEventListener ('click', () => {
        deletePostHandler (new_post, post_li);
    });
}

/**
 * a handler for edit button
 * @param {*} edited_post the post being edited
 * @param {*} edited_post_p the <p> element in <li> of the post being edited
 */
function editPostHandler (edited_post, edited_post_p) {
    /**
     * create a dialog for editing the post
     */
    const edit_dialog = document.createElement ('dialog');

    const label_title = document.createElement ('label');
    label_title.for = 'title';
    label_title.textContent = 'Post Title: ';
    edit_dialog.appendChild (label_title);

    const input_title = document.createElement ('input');
    input_title.type = 'text';
    input_title.name = 'title';
    input_title.value = edited_post['title'];
    edit_dialog.appendChild (input_title);
    
    edit_dialog.append (document.createElement ('br'));

    const label_date = document.createElement ('label');
    label_date.for = 'date';
    label_date.textContent = 'Post Date: ';
    edit_dialog.appendChild (label_date);

    const input_date = document.createElement ('input');
    input_date.name = 'date';
    input_date.type = 'date';
    input_date.value = edited_post['date'];
    edit_dialog.appendChild (input_date);

    edit_dialog.appendChild (document.createElement ('br'));

    const label_summary = document.createElement ('label');
    label_summary.for = 'summary';
    label_summary.textContent = 'Post Summary: ';
    edit_dialog.appendChild (label_summary);

    edit_dialog.append (document.createElement ('br'));

    const input_summary = document.createElement ('textarea');
    input_summary.name = 'summary';
    input_summary.value = edited_post['summary'];
    input_summary.cols = '50';
    edit_dialog.appendChild (input_summary);

    edit_dialog.appendChild (document.createElement ('br'));

    const cancel_btn = document.createElement ('button');
    cancel_btn.textContent = 'Cancel';
    edit_dialog.appendChild (cancel_btn);

    cancel_btn.style.margin= "0 10px 0 0";

    const save_btn = document.createElement ('button');
    save_btn.textContent = 'Save';
    edit_dialog.appendChild (save_btn);

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
             * update the post in the document
             */

            // update the <p> element in <li> of the post
            edited_post_p.innerHTML = `${input_title.value} (${input_date.value}) - ${input_summary.value} &emsp;`;

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
 * @param {*} deleted_post_li the <li> of the post being deleted
 */
function deletePostHandler (deleted_post, deleted_post_li) {
    /**
     * create a dialog for deleting the post
     */
    const delete_dialog = document.createElement ('dialog');

    const delete_dialog_p = document.createElement ('p');
    delete_dialog_p.textContent = 'Do you want to delete this post?';
    delete_dialog.appendChild (delete_dialog_p);

    delete_dialog.appendChild (document.createElement ('br'));

    const cancel_btn = document.createElement ('button');
    cancel_btn.textContent = 'Cancel';
    delete_dialog.appendChild (cancel_btn);

    cancel_btn.style.margin= "0 10px 0 0";

    const yes_btn = document.createElement ('button');
    yes_btn.textContent = 'Yes';
    delete_dialog.appendChild (yes_btn);

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

        // get the list of posts from the document
        const list = document.getElementById ('list');
        // remove the <li> of the post
        list.removeChild (deleted_post_li);

        // close the dialog for deleting the post
        delete_dialog.close ();
        document.body.removeChild (delete_dialog);

        /**
         * if no posts left in the list, display the message
         */
        const empty_list = document.getElementById ('empty');
        console.log (posts.length);
        if (posts.length == 0) {
            empty_list.style.display = 'inline-block';
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