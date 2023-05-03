import React from "react";
import { useRecoilState } from "recoil"
import { modalState } from "src/recoil/commonRecoilState"
type ModalInfo = (
    Component: React.ReactNode ,
) => void
export const useModal = () => {
    const [modalInfo, setModalInfo] = useRecoilState(modalState);
    const setting: ModalInfo = (Component) => {
        setModalInfo({ ...modalInfo, Component,status:true})
    }
    const openModal = () => {
        setModalInfo({ ...modalInfo, status: true })
    }
    const closeModal = () => {
        setModalInfo({ ...modalInfo,status:false})
    }
 
    return {
        setting,
        openModal,
        closeModal,
        
    };
}