/** 유저 삭제 확인 모달 */
import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

const navy = '#0F3659';

const DeleteConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  userName,
  userId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={isLoading ? null : onHide}
      backdrop={isLoading ? 'static' : true}
      keyboard={!isLoading}
      centered
    >
      <Modal.Header style={{ border: 'none' }}>
        <Modal.Title
          style={{
            color: '#151D48',
            fontFamily: 'Poppins',
            fontSize: `24px`,
            fontWeight: 600,
          }}
        >
          사용자 삭제 확인
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          textAlign: 'center',
          whiteSpace: 'pre-line',
          fontSize: '20px',
          fontWeight: '500',
          width: '100%',
        }}
      >
        <span style={{ fontWeight: 'bold', color: navy }}>'{userName}'</span>의
        계정
        <span style={{ fontWeight: 'bold', color: navy }}> '{userId}'</span>를
        <br />
        삭제하시겠습니까?
        <br />
        <span style={{ fontSize: '16px', fontWeight: '100' }}>
          이 작업은 되돌릴 수 없습니다.
        </span>
      </Modal.Body>
      <Modal.Footer style={{ border: 'none' }}>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button
          onClick={handleConfirm}
          style={{
            background: navy,
          }}
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : '확인'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
