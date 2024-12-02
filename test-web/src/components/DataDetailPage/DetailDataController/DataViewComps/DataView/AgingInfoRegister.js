import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import addDeepAgingRegister from '../../../api/add/addDeepAging';
import DeepInfoCompleteModal from './DeepInfoCompleteModal';
import addSensoryProcessedData from '../../../api/add/addSensoryProcessedData';

const AgingInfoRegister = ({
  handleClose,
  processed_data_seq,
  meatId,
  userId,
  butcheryYmd,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [seqno, setSeqno] = useState('');

  // 도축일자 형식 변환 (YYYYMMDD -> YYYY-MM-DD)
  const formatButcheryDate = (butcheryYmd) => {
    if (!butcheryYmd || typeof butcheryYmd !== 'string') {
      console.error('Invalid butcheryYmd format. Expected format: YYYYMMDD');
      return '';
    }

    try {
      const year = butcheryYmd.substring(0, 4);
      const month = butcheryYmd.substring(4, 6);
      const day = butcheryYmd.substring(6, 8);
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting butcheryYmd:', error);
      return '';
    }
  };

  const handleCompletionModalClose = () => {
    setShowCompletionModal(false);
    handleClose();
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setIsLoading(true);
    try {
      const req = {
        meatId: meatId,
        seqno: seqno,
        deepAging: {
          date: date,
          minute: time,
        },
      };
      const registerResponse = await addDeepAgingRegister(req);
      if (registerResponse.ok) {
        try {
          const processedInput = {
            marbling: null,
            color: null,
            texture: null,
            surfaceMoisture: null,
            overall: null,
          };
          const registerSensoryResponse = await addSensoryProcessedData(
            processedInput,
            seqno,
            meatId,
            userId,
            true,
            false
          );
          if (registerSensoryResponse.ok) {
            console.log('Success to register DeepInfo');
            setShowCompletionModal(true);
          }
        } catch (error) {
          console.error('Error during registration', error);
        }
      }
    } catch (error) {
      console.error('Error during registration', error);
    } finally {
      setIsLoading(false);
    }

    setValidated(true);
  };

  // All possible sequences
  const allSeqs = ['1회', '2회', '3회', '4회'];

  // Filtered nonExistSeq containing values not in processed_data_seq
  const nonExistSeq = allSeqs.filter(
    (seq) => !processed_data_seq.includes(seq)
  );

  return (
    <div>
      <div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Label column>Date</Form.Label>
          <InputGroup className="mb-3" hasValidation>
            <Form.Control
              required
              type="Date"
              id="DateInput"
              min={formatButcheryDate(butcheryYmd)}
              placeholder="날짜를 입력하세요"
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </InputGroup>
          <Form.Group className="mb-3">
            <Form.Label>시간(분)</Form.Label>
            <Form.Control
              required
              type="number"
              min="0"
              placeholder="딥에이징 시간(분)"
              value={time}
              onChange={(event) => {
                let value = event.target.value;

                if (value.includes('-')) {
                  value = value.replace('-', '');
                }

                const validValue = Math.max(0, Number(value));
                setTime(validValue.toString());
              }}
            />
            <Form.Control.Feedback type="invalid">
              0 이상의 숫자를 입력해주세요.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Label column>회차</Form.Label>
          <InputGroup className="mb-3" hasValidation>
            <Form.Select
              required
              id="SelectSeqno"
              onChange={(event) => {
                const selectedSeq = nonExistSeq[event.target.value].replace(
                  '회',
                  ''
                );
                setSeqno(selectedSeq);
              }}
              //value={seqno}
              defaultValue=""
            >
              <option value="" disabled hidden>
                등록할 회차를 선택하세요
              </option>
              {nonExistSeq.map((item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
          {/* <Form.Group className="mb-3">
            <Form.Label column>회차</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="회차"
              onChange={(event) => {
                setSeqno(event.target.value);
              }}
            />
          </Form.Group> */}

          <div className="text-end">
            <Button variant="text" onClick={handleClose}>
              취소
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              style={{
                background: '#0F3659',
                width: '150px',
              }}
              disabled={isLoading || !date || !time || !seqno}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                '회차 등록'
              )}
            </Button>
          </div>
        </Form>
      </div>
      {showCompletionModal && (
        <div
          className="modal-backdrop"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 1040,
          }}
        />
      )}
      <DeepInfoCompleteModal
        show={showCompletionModal}
        onHide={handleCompletionModalClose}
        meatId={meatId}
        seqno={seqno}
        type="add"
      />
    </div>
  );
};
export default AgingInfoRegister;
