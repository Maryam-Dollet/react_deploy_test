import React from 'react';
import {useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import {format} from 'date-fns';
import {useNavigate} from 'react-router-dom';

import {useStoreState, useStoreActions} from 'easy-peasy';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // const posts = useStoreState((state) => state.posts);
    const editTitle= useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);

    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);

    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);

    const handleEdit =(id) =>{
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {id, title: editTitle, datetime, body: editBody};
        editPost(updatedPost);
        navigate(`/post/${id}`);
    }
    
    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    return (
    <main className='NewPost'>
        {editTitle && 
        <>
            <h1>Edit Post</h1>
            <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="postTitle">Title</label>
                <input 
                id="postTitle"
                type="text" 
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea 
                id="postBody" 
                required
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                />
                <button type='button' onClick={() => handleEdit(post.id)}>Submit</button>
            </form>
        </>
        }
        {!editTitle &&
            <>
                <h2>Post not found</h2>
                <p>Well, that's disappointing</p>
                <p>
                    <Link to="/" >Visit our Homepage</Link>
                </p>
            </>
        }
    </main>
  )
}

export default EditPost
