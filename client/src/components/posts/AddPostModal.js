import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  //contexts
  const { setShowAddPostModal, showAddPostModal, addPost, setShowToast } =
    useContext(PostContext);

  //State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPostModal();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddPostModal = () => {
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddPostModal(false);
  };

  const closeDialog = () => {
    resetAddPostModal();
  };

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPostForm}
            />
            <Form.Text id="title-help" muted className="mb-3">
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              className="mb-3"
              value={description}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube tutorial URL"
              name="url"
              className="mb-3"
              value={url}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
