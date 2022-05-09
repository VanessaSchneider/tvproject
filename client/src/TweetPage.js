import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentContainer from './CommentContainer'

function TweetPage ({ handleDeletePost, setCommentForm, commentForm }) {
  const [post, setPost] = useState('')
  const [user, setUser] = useState('')
  const [comments, setComments] = useState('')
  const [allComments, setAllComments] = useState("")
  const history = useHistory()
  const { id } = useParams()
  const postData = {
    id: id
  }

  function handleGetForm () {
    setCommentForm(commentForm => !commentForm)
  }

  useEffect(() => {
    fetch('/me').then(response => {
      if (response.ok) {
        response.json().then(data => setUser(data))
      }
    })
  }, [])

  useEffect(() => {
    fetch('/getpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(r => r.json())
      .then(post => setPost(post))
  }, [])


  useEffect(() => {
    fetch('/comments')
      .then(res => res.json())
      .then(data => setAllComments(data))
  }, [])


  let filteredComments =[]
  if (allComments && allComments.length !==0){
 filteredComments = allComments.filter((comment)=>comment.post_id === parseInt(id))}

  function handleDelete () {
    fetch(`/posts/${post.id}`, {
      method: 'DELETE'
    }).then(() => console.log('deleted!'))
    handleDeletePost(post.id)
    toDelete(post.id)

    alert('You have deleted the post')
  }

  console.log('comments', comments)

  const handleReroute = () => {
    console.log('Reroute!')
    history.push('/')
  }

  function toDelete (id) {
    setPost(null)
    handleReroute()
  }

  function handleAddComment(comment) {
    setAllComments([comment, ...allComments])
  }

  return (
    <div>
      {post ? (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <div className='post-container'>
            <img className='tweetimage' src={post.user.photo}></img>{' '}
          </div>
          <div className='post-container'>
            <Link to={`/users/${post.username}`}>{post.username}</Link>
          </div>
          <div className='post-container'>{post.content}</div>
          {post.username === user.username ? (
            <button onClick={handleDelete} className='delete-post'>
              Delete Post
            </button>
          ) : null}
          <div className='side-nav'>
            <button onClick={handleGetForm}>
              {commentForm ? "Don't Make a Comment" : 'Make a Comment'}
            </button>
          </div>
          <br></br>
          {commentForm ? (
            <div className='submit-forms'>
              {' '}
              <br></br> <br></br>{' '}
              <CommentForm
                setCommentForm={setCommentForm}
                commentForm={commentForm}
                postData={postData}
                user={user}
                handleAddComment = {handleAddComment}
              />{' '}
            </div>
          ) : null}
          {commentForm ? null : (
            <div>
              <h3 className='comments-headline'>Comments</h3>
              <CommentContainer post={post} comments={filteredComments} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h3> Post was deleted!</h3>
        </div>
      )}
    </div>
  )
}

export default TweetPage
