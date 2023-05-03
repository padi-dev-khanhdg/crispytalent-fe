import { NextComponentType } from 'next'
import React from 'react'
import { Modal } from 'antd';
import { useRecoilValue } from 'recoil';
import { modalState } from 'src/recoil/commonRecoilState';
import { useModal } from 'src/hooks/useModal';
const ModalHOC: NextComponentType = () => {
  const modalInfo = useRecoilValue(modalState);
  const { closeModal } = useModal();
  const { Component, status } = modalInfo
  return (
    <Modal open={status} closable={false} footer={null} onCancel={closeModal}>
      {Component}
    </Modal>
  )
}
export default ModalHOC
