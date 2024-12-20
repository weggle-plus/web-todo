function DeleteCheckModal({ onConfirmDelete, onCancelDelete }) {
  return (
    <div id="modal_container">
      <div className="modal_wrap">
        <span>정말 삭제하시겠습니까?</span>
        <div>
          <button id="modal_close_true_btn" onClick={() => onConfirmDelete()}>
            확인
          </button>
          <button
            className="btn_modify"
            id="modal_close_false_btn"
            onClick={() => onCancelDelete()}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCheckModal;
