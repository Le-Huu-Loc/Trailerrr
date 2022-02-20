import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string,
};

function Modal(props) {

    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(props.active)
    }, [props.active])

    return (
        <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
            {props.children}
        </div>
    );
}

export const ModalContent = props => {

    ModalContent.propTypes = {
        onClose: PropTypes.func
    }

    const contentRef = useRef(null)
    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active')
        if (props.onClose) {
            return props.onClose()
        }
    }
    return (
        <div ref={contentRef} className="modal__content">
            {props.children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className="bx bx-x">X</i>
            </div>
        </div>
    )
}

export default Modal;